"use client";

import { images } from "@/lib/image";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

function renderContentBlocks(blocks: any[]) {
  if (!Array.isArray(blocks)) return null;
  return blocks.map((block, idx) => {
    if (block.type === "paragraph") {
      const children = (block.children || []).map((ch: any, i: number) => {
        const text = ch?.text ?? "";
        if (ch?.bold) return <strong key={i}>{text}</strong>;
        return <span key={i}>{text}</span>;
      });
      return (
        <p key={idx} className="text-[#7D7D9D] leading-relaxed">
          {children}
        </p>
      );
    }
    if (block.type === "heading") {
      return (
        <h3 key={idx} className="font-semibold text-lg text-[#333]">
          {block.children?.map((c: any) => c.text ?? "").join("")}
        </h3>
      );
    }
    return (
      <div key={idx} className="text-[#7D7D9D]">
        {JSON.stringify(block)}
      </div>
    );
  });
}

export default function NewsDetailsClient() {
  const router = useRouter();
  const params = useParams();

  // state utama
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // state related news
  const [relatedNews, setRelatedNews] = useState<any[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);


  useEffect(() => {
    let mounted = true;

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const rawId = (params as any)?.id;
        if (!rawId) {
          throw new Error("Missing article id in route parameters.");
        }

        const base = API_BASE.replace(/\/$/, "");
        const url = `${base}/api/articles/${encodeURIComponent(rawId)}?populate[thumbnail]=true&populate[categories]=true`;

        console.log("Fetching article URL:", url, "params.id:", rawId);
        const res = await fetch(url, { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`Fetch failed: ${res.status} ${res.statusText} ${text}`);
        }

        const json = await res.json();
        let data = json?.data;
        if (!data) throw new Error("Article not found (no data)");

        // unwrap attributes if present
        const attrs = data.attributes ? data.attributes : data;

        // build category name
        const categoryName =
          attrs.category?.data?.attributes?.name ??
          (typeof attrs.category === "string" ? attrs.category : null) ??
          (attrs.type ? attrs.type : null);

        // thumbnail resolution
        const rawThumb =
          attrs.thumbnail?.data?.attributes?.url ??
          attrs.thumbnail?.formats?.small?.url ??
          attrs.thumbnail?.url ??
          attrs.thumbnail ??
          null;
        const thumbnailUrl =
          rawThumb && typeof rawThumb === "string"
            ? rawThumb.startsWith("http")
              ? rawThumb
              : `${base}${rawThumb}`
            : null;

        // normalize content
        let contentCandidate: any = attrs.content ?? attrs.sections ?? attrs.body ?? null;
        if (typeof contentCandidate === "string" && contentCandidate.trim()) {
          try {
            const parsed = JSON.parse(contentCandidate);
            if (Array.isArray(parsed)) contentCandidate = parsed;
          } catch {
            // leave as-is
          }
        }
        if (!contentCandidate && attrs.contentBlocks) contentCandidate = attrs.contentBlocks;
        const contentNormalized = Array.isArray(contentCandidate) ? contentCandidate : [];

        const built = {
          id: data.id ?? attrs.id,
          title: attrs.title ?? attrs.name ?? "",
          date: attrs.publishedAt ?? attrs.date ?? attrs.createdAt ?? null,
          categoryName,
          thumbnailUrl,
          content: contentNormalized,
          rawAttrs: attrs,
        };

        console.log("Normalized article (for rendering):", built);
        if (!mounted) return;
        setArticle(built);
      } catch (e: any) {
        console.error("Error fetching article:", e);
        if (mounted) setError(e.message ?? "Unexpected error");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArticle();
    return () => {
      mounted = false;
    };
  }, [params]);

  useEffect(() => {
  if (!article?.categoryName) return;

  let mounted = true;
  setLoadingRelated(true);

  const fetchRelated = async () => {
    try {
      const url = `${API_BASE}/api/articles?filters[category][name][$eq]=${encodeURIComponent(
        article.categoryName
      )}&filters[id][$ne]=${article.id}&populate[thumbnail]=true&pagination[limit]=3`;

      console.log("Fetching related news URL:", url);

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        console.warn(`Failed fetching related news: ${res.status} ${res.statusText}`);
        setRelatedNews([]);
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
            {loadingRelated
              ? Array.from({ length: 3 }).map((_, i) => (
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
    : relatedNews.length > 0
    ? relatedNews.map((item: any) => {
        const attrs = item.attributes;
        const rawThumb =
          attrs.thumbnail?.data?.attributes?.url ??
          attrs.thumbnail?.formats?.small?.url ??
          attrs.thumbnail?.url ??
          attrs.thumbnail ??
          null;
        const thumbnailUrl = rawThumb?.startsWith("http") ? rawThumb : `${API_BASE}${rawThumb}`;

        return (
          <div
            key={item.id}
            onClick={() => router.push(`/news/details/${item.id}`)}
            className="cursor-pointer bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-3 h-[300px] w-full hover:shadow-lg transition-shadow"
          >
            <div className="relative h-[127px] w-full">
              <Image
                src={thumbnailUrl || "/assets/dumi.jpg"}
                alt={attrs.title}
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h6 className="text-[16px] font-medium truncate">{attrs.title}</h6>
              <p className="text-[14px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">
                {attrs.summary ?? ""}
              </p>
            </div>
            <div className="w-full flex mt-3 mb-1">
              <div className="text-[12px] font-medium flex gap-3">
                <p>{attrs.publishedAt ? new Date(attrs.publishedAt).toLocaleDateString() : ""}</p>
                <p className="text-[#D8DBE1]">|</p>
                <p>{attrs.pages ?? "–"} Pages</p>
              </div>
            </div>
          </div>
        );
      })
    : <p className="text-[#7D7D9D]">No related news found.</p>}
</div>

        </div>
      </div>
    </div>
  );
}