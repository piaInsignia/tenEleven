"use client";

import { images } from "@/lib/image";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

type ContentChild = {
  text?: string;
  bold?: boolean;
  [k: string]: unknown;
};
type ContentBlock = {
  type?: string;
  children?: ContentChild[];
  [k: string]: unknown;
};

type ArticleShape = {
  id?: string | number;
  title?: string;
  date?: string | null;
  categoryName?: string | null;
  thumbnailUrl?: string | null;
  content?: ContentBlock[];
  rawAttrs?: Record<string, unknown> | null;
};

type RelatedRaw = unknown;

/* ---------- helpers ---------- */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

/** safe nested getter; returns unknown */
function getIn(obj: unknown, path: Array<string | number>): unknown {
  let cur: unknown = obj;
  for (const key of path) {
    if (cur === undefined || cur === null) return undefined;
    if (typeof key === "number") {
      if (!Array.isArray(cur)) return undefined;
      cur = cur[key];
    } else {
      if (!isObject(cur)) return undefined;
      cur = (cur as Record<string, unknown>)[key];
    }
  }
  return cur;
}

function getStr(obj: unknown, path: Array<string | number>): string | undefined {
  const v = getIn(obj, path);
  return typeof v === "string" ? v : undefined;
}

/** Normalize unknown -> id-like (string|number|undefined) */
function getIdLike(x: unknown): string | number | undefined {
  if (typeof x === "string" || typeof x === "number") return x;
  if (isObject(x) && "id" in x) {
    const v = (x as Record<string, unknown>).id;
    if (typeof v === "string" || typeof v === "number") return v;
  }
  return undefined;
}

/** Normalize unknown -> date-like string | undefined */
function getDateLike(x: unknown): string | undefined {
  if (typeof x === "string") return x;
  return undefined;
}

/* ---------- render helpers ---------- */
function renderContentBlocks(blocks: ContentBlock[] | undefined | null) {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((block, idx) => {
    const type = typeof block.type === "string" ? block.type : "";
    if (type === "paragraph") {
      const children = Array.isArray(block.children)
        ? block.children.map((ch: ContentChild, i: number) => {
            const text = typeof ch?.text === "string" ? ch.text : "";
            if (ch?.bold) return <strong key={i}>{text}</strong>;
            return <span key={i}>{text}</span>;
          })
        : null;

      return (
        <p key={idx} className="text-[#7D7D9D] leading-relaxed">
          {children}
        </p>
      );
    }

    if (type === "heading") {
      const text =
        Array.isArray(block.children) && block.children.every((c) => typeof c.text === "string")
          ? (block.children as ContentChild[]).map((c) => c.text).join("")
          : JSON.stringify(block);
      return (
        <h3 key={idx} className="font-semibold text-lg text-[#333]">
          {text}
        </h3>
      );
    }

    // fallback
    return (
      <div key={idx} className="text-[#7D7D9D]">
        {JSON.stringify(block)}
      </div>
    );
  });
}

/* ---------- component ---------- */
export default function NewsDetailsClient() {
  const router = useRouter();
  const params = useParams();
  const idParam = params?.id as string | undefined;

  // main state
  const [article, setArticle] = useState<ArticleShape | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // related news
  const [relatedNews, setRelatedNews] = useState<RelatedRaw[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const rawId = idParam;
        if (!rawId) throw new Error("Missing article id in route parameters.");

        const base = API_BASE.replace(/\/$/, "");
        const url = `${base}/api/articles/${encodeURIComponent(rawId)}?populate[thumbnail]=true&populate[categories]=true`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Fetch failed: ${res.status} ${res.statusText} ${text}`);
        }

        const json = await res.json();
        const data = json?.data;
        if (!data) throw new Error("Article not found (no data)");

        // attrs may be data.attributes or data itself
        const attrs: unknown =
          isObject(data) && "attributes" in (data as object) ? (data as { attributes: unknown }).attributes : data;

        // category extraction
        const categoryName =
          getStr(attrs, ["category", "data", "attributes", "name"]) ??
          (typeof getIn(attrs, ["category"]) === "string" ? (getIn(attrs, ["category"]) as string) : null) ??
          (typeof getIn(attrs, ["type"]) === "string" ? (getIn(attrs, ["type"]) as string) : null);

        // thumbnail resolution
        const rawThumb =
          getIn(attrs, ["thumbnail", "data", "attributes", "url"]) ??
          getIn(attrs, ["thumbnail", "formats", "small", "url"]) ??
          getIn(attrs, ["thumbnail", "url"]) ??
          getIn(attrs, ["thumbnail"]) ??
          null;
        const thumbnailUrl =
          typeof rawThumb === "string" ? (rawThumb.startsWith("http") ? rawThumb : `${base}${rawThumb}`) : null;

        // normalize content (stringified JSON or array)
        let contentCandidate: unknown = getIn(attrs, ["content"]) ?? getIn(attrs, ["sections"]) ?? getIn(attrs, ["body"]) ?? null;
        if (typeof contentCandidate === "string" && contentCandidate.trim()) {
          try {
            const parsed = JSON.parse(contentCandidate);
            if (Array.isArray(parsed)) contentCandidate = parsed;
          } catch {
            // leave as-is
          }
        }
        if ((!contentCandidate || (Array.isArray(contentCandidate) && contentCandidate.length === 0)) && getIn(attrs, ["contentBlocks"])) {
          contentCandidate = getIn(attrs, ["contentBlocks"]);
        }
        const contentNormalized: ContentBlock[] = Array.isArray(contentCandidate) ? (contentCandidate as ContentBlock[]) : [];

        // normalize id/date using helpers to satisfy TS types
        const rawIdCandidate = getIn(data, ["id"]) ?? getIn(attrs, ["id"]);
        const safeId = getIdLike(rawIdCandidate);

        const rawDateCandidate =
          getIn(attrs, ["publishedAt"]) ?? getIn(attrs, ["date"]) ?? getIn(attrs, ["createdAt"]);
        const safeDate = getDateLike(rawDateCandidate);

        const built: ArticleShape = {
          id: safeId,
          title: (getStr(attrs, ["title"]) ?? getStr(attrs, ["name"])) ?? "",
          date: safeDate ?? null,
          categoryName: categoryName ?? null,
          thumbnailUrl,
          content: contentNormalized,
          rawAttrs: isObject(attrs) ? (attrs as Record<string, unknown>) : null,
        };

        if (!mounted) return;
        setArticle(built);
      } catch (e: unknown) {
        console.error("Error fetching article:", e);
        if (mounted) setError((e as Error)?.message ?? "Unexpected error");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArticle();
    return () => {
      mounted = false;
    };
  }, [idParam]);

  useEffect(() => {
    if (!article?.categoryName) return;

    let mounted = true;
    setLoadingRelated(true);

    const fetchRelated = async () => {
      try {
        const url = `${API_BASE}/api/articles?filters[category][name][$eq]=${encodeURIComponent(
          article.categoryName || ""
        )}&filters[id][$ne]=${article.id ?? ""}&populate[thumbnail]=true&pagination[limit]=3`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) {
          console.warn(`Failed fetching related news: ${res.status} ${res.statusText}`);
          if (mounted) {
            setRelatedNews([]);
            setLoadingRelated(false);
          }
          return;
        }

        const json = await res.json();
        if (!mounted) return;

        const data = json?.data ?? [];
        setRelatedNews(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error fetching related news:", e);
        if (mounted) setRelatedNews([]);
      } finally {
        if (mounted) setLoadingRelated(false);
      }
    };

    fetchRelated();
    return () => {
      mounted = false;
    };
  }, [article]);

  if (loading) return <div className="p-6">Loading...</div>;

  if (error)
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
        <button className="mt-4 underline" onClick={() => router.back()}>
          Go back
        </button>
      </div>
    );

  if (!article) return <div className="p-6">Article not found</div>;

  return (
    <div className="relative min-h-screen bg-white pt-12 sm:pt-23 font-inter">
      <div className="px-5 sm:px-20 h-full py-8">
        <div
          className="text-[#F05125] flex items-center gap-2 text-[16px] font-medium cursor-pointer mb-10 sm:mb-0"
          onClick={() => router.back()}
        >
          <MoveLeft color="#F05125" /> Back Page
        </div>

        <div className="flex flex-col gap-5 mt-5">
          <h1 className="text-3xl sm:text-6xl font-medium">{article.title}</h1>
          <span className="flex">
            <span>{article.categoryName}</span>
            <span className="relative before:content-['•'] before:mx-3">
              {article.date ? new Date(article.date).toLocaleDateString() : ""}
            </span>
          </span>

          <div className="relative h-[162px] sm:h-[550px] w-full ">
            <Image
              src={article.thumbnailUrl || "/assets/dumi.jpg"}
              alt={article.title || "News Cover"}
              fill
              className="object-cover rounded-sm sm:rounded-2xl"
            />
          </div>

          <p className="text-[16px] sm:text-[18px] text-[#696A9C]">Reference: everyday.ai</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_320px] gap-10 mt-5 sm:mt-15">
          <div className="flex flex-col gap-7 text-[16px] sm:text-[18px]">
            {renderContentBlocks(article.content)}
            <div className="flex flex-col mt-5 gap-3">
              <span className="text-[20px] font-semibold">Share this news</span>
              <div className="flex gap-3">
                <Image src={images.IMG_SM_FACEBOOK} alt="facebook" height={42} width={42} className="object-contain" />
                <Image src={images.IMG_SM_X} alt="x" height={42} width={42} className="object-contain" />
                <Image src={images.IMG_SM_WHATSAPP} alt="whatsapp" height={42} width={42} className="object-contain" />
                <Image src={images.IMG_SM_TELEGRAM} alt="telegram" height={42} width={42} className="object-contain" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 sm:sticky sm:top-8">
            {loadingRelated ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-[#F3F3F3] animate-pulse rounded-2xl flex flex-col gap-4 p-3 h-[300px] w-full"
                >
                  <div className="h-[127px] w-full bg-gray-300 rounded-2xl" />
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                    <div className="h-3 w-full bg-gray-200 rounded"></div>
                    <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
            ) : relatedNews.length > 0 ? (
              relatedNews.map((itemRaw) => {
                const attrs = getIn(itemRaw, ["attributes"]);
                const id = getIn(itemRaw, ["id"]) ?? getIn(attrs, ["id"]) ?? "";
                const title = getStr(attrs, ["title"]) ?? getStr(attrs, ["name"]) ?? "";
                const summary = getStr(attrs, ["summary"]) ?? "";
                const rawThumb =
                  getIn(attrs, ["thumbnail", "data", "attributes", "url"]) ??
                  getIn(attrs, ["thumbnail", "formats", "small", "url"]) ??
                  getIn(attrs, ["thumbnail", "url"]) ??
                  getIn(attrs, ["thumbnail"]) ??
                  null;
                const thumbnailUrl =
                  typeof rawThumb === "string" ? (rawThumb.startsWith("http") ? rawThumb : `${API_BASE}${rawThumb}`) : "/assets/dumi.jpg";
                const publishedAt = getStr(attrs, ["publishedAt"]) ?? "";
                const rawPages = getIn(attrs, ["pages"]);
                const pagesText =
                  typeof rawPages === "number" || typeof rawPages === "string"
                  ? String(rawPages)
                  : "–";


                return (
                  <div
                    key={String(id)}
                    onClick={() => router.push(`/news/details/${String(id)}`)}
                    className="cursor-pointer bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-3 h-[300px] w-full hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-[127px] w-full">
                      <Image src={thumbnailUrl} alt={title} fill className="object-cover rounded-2xl" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h6 className="text-[16px] font-medium truncate">{title}</h6>
                      <p className="text-[14px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">
                        {summary}
                      </p>
                    </div>
                    <div className="w-full flex mt-3 mb-1">
                      <div className="text-[12px] font-medium flex gap-3">
                        <p>{publishedAt ? new Date(publishedAt).toLocaleDateString() : ""}</p>
                        <p className="text-[#D8DBE1]">|</p>
                        <p>{pagesText} Pages</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-[#7D7D9D]">No related news found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
