"use client";

import Select from "@/app/component/SelectInput";
import TextInput from "@/app/component/TextInput";
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

type ArticleState = {
  id?: string | number;
  title?: string;
  date?: string | null;
  categoryName?: string | null;
  thumbnailUrl?: string | null;
  content?: ContentBlock[];
  rawAttrs?: Record<string, unknown> | null;
};

function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function isStrapiEntity(x: unknown): x is { id: number | string; attributes: Record<string, unknown> } {
  return isObject(x) && "id" in x && "attributes" in x;
}

function normalizeContent(candidate: unknown): ContentBlock[] {
  if (Array.isArray(candidate)) return candidate as ContentBlock[];
  if (typeof candidate === "string" && candidate.trim()) {
    try {
      const parsed = JSON.parse(candidate);
      if (Array.isArray(parsed)) return parsed as ContentBlock[];
    } catch {
      // ignore
    }
  }
  return [];
}

/** safe getter for nested properties without using `any` */
function getIn(obj: unknown, path: Array<string | number>): unknown {
  let cur: unknown = obj;
  for (const key of path) {
    if (!isObject(cur) && !Array.isArray(cur)) return undefined;
    if (typeof key === "number") {
      if (!Array.isArray(cur)) return undefined;
      cur = cur[key];
    } else {
      cur = (cur as Record<string, unknown>)[key];
    }
    if (cur === undefined) return undefined;
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
  return undefined;
}

/** Normalize unknown -> date-like string | undefined */
function getDateLike(x: unknown): string | undefined {
  if (typeof x === "string") return x;
  return undefined;
}

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

export default function InsightReport() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [article, setArticle] = useState<ArticleState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    industryType: "",
    jobTitle: "",
    workEmail: "",
    phoneNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch article detail
  useEffect(() => {
    let mounted = true;

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!id) throw new Error("Missing article id in route parameters.");

        const base = API_BASE.replace(/\/$/, "");
        const url = `${base}/api/articles/${id}?populate[thumbnail]=true&populate[categories]=true`;

        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);

        const json = await res.json();
        const data = json?.data;
        if (!data) throw new Error("Article not found (no data)");

        // unwrap strapi style { id, attributes }
        const attrs = isStrapiEntity(data) ? (data.attributes ?? {}) : (isObject(data) ? (data as Record<string, unknown>) : {});

        // category extraction (safe)
        const categoryName =
          getStr(attrs, ["category", "data", "attributes", "name"]) ??
          (typeof getIn(attrs, ["category"]) === "string" ? (getIn(attrs, ["category"]) as string) : null) ??
          (typeof getIn(attrs, ["type"]) === "string" ? (getIn(attrs, ["type"]) as string) : null);

        // thumbnail extraction (safe)
        const rawThumb =
          getIn(attrs, ["thumbnail", "data", "attributes", "url"]) ??
          getIn(attrs, ["thumbnail", "formats", "small", "url"]) ??
          getIn(attrs, ["thumbnail", "url"]) ??
          getIn(attrs, ["thumbnail"]) ??
          null;

        const thumbnailUrl =
          typeof rawThumb === "string"
            ? rawThumb.startsWith("http")
              ? rawThumb
              : `${base}${rawThumb}`
            : null;

        // content normalization
        const contentCandidate: unknown =
          getIn(attrs, ["content"]) ?? getIn(attrs, ["sections"]) ?? getIn(attrs, ["body"]) ?? null;

        const contentNormalized = normalizeContent(contentCandidate).length
          ? normalizeContent(contentCandidate)
          : Array.isArray(getIn(attrs, ["contentBlocks"]))
          ? (getIn(attrs, ["contentBlocks"]) as ContentBlock[])
          : [];

        if (!mounted) return;

        // --- SAFE NORMALIZATION FOR id/date ---
        const rawIdCandidate = getIn(data, ["id"]) ?? getIn(attrs, ["id"]);
        const safeId = getIdLike(rawIdCandidate);

        const rawDateCandidate = getIn(attrs, ["publishedAt"]) ?? getIn(attrs, ["date"]) ?? getIn(attrs, ["createdAt"]);
        const safeDate = getDateLike(rawDateCandidate);

        const built: ArticleState = {
          id: safeId,
          title: getStr(attrs, ["title"]) ?? getStr(attrs, ["name"]) ?? "",
          date: safeDate ?? null,
          categoryName,
          thumbnailUrl,
          content: Array.isArray(contentNormalized) ? contentNormalized : [],
          rawAttrs: isObject(attrs) ? (attrs as Record<string, unknown>) : null,
        };

        setArticle(built);
      } catch (e: unknown) {
        if (mounted) setError((e as Error)?.message ?? "Unexpected error");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArticle();
    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`${API_BASE}/api/user-downloads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            fullName: formData.fullName,
            companyName: formData.companyName,
            industryType: formData.industryType,
            jobTitle: formData.jobTitle,
            workEmail: formData.workEmail,
            phoneNumber: formData.phoneNumber,
            article: id,
          },
        }),
      });

      const resText = await res.text();
      console.log("Response Strapi:", resText);

      if (!res.ok) throw new Error(`Failed: ${res.status} - ${resText}`);

      setShowSuccessModal(true);
      setFormData({
        fullName: "",
        companyName: "",
        industryType: "",
        jobTitle: "",
        workEmail: "",
        phoneNumber: "",
      });
    } catch (err) {
      console.error("Submit error:", err);
      // optionally set UI error state
    } finally {
      setSubmitting(false);
    }
  };

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
    <div className="relative min-h-screen bg-white pt sm:pt-23 font-inter">
      <div className="px-5 sm:px-20 h-full py-8">
        <div
          className="text-[#F05125] flex items-center gap-2 text-[16px] font-medium cursor-pointer mb-10 sm:mb-0"
          onClick={() => router.back()}
        >
          <MoveLeft color="#F05125" /> Back Page
        </div>

        <div className=" flex flex-col-reverse sm:grid sm:grid-cols-2 gap-5 sm:gap-10 mt-5 sm:mt-10">
          <div className="w-full h-full mt-2 sm:mt-10">
            <div className="flex flex-col gap-5">
              <h5 className="text-3xl sm:text-5xl font-medium leading-[120%] sm:flex sm:flex-col">
                <span className="inline">One Last Step to</span>
                <span className="inline"> Own the Report</span>
              </h5>
              <p className="text-15px sm:text-[18px] text-[#7D7D9D] sm:w-full w-[90%]">
                Please fill in the form below to unlock full access.
              </p>
            </div>

            {/* FORM */}
            <form className="mt-5 sm:mt-10 flex flex-col gap-5" onSubmit={handleSubmit}>
              <TextInput
                label="Full Name"
                placeholder="Input name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <TextInput
                label="Company"
                placeholder="Input company"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              />
              <Select
                options={[{ value: "Specific Solution", label: "Specific Solution" }]}
                label="Industry Type"
                placeholder="Choose Industry"
                value={formData.industryType}
                onChange={(val: string) => setFormData({ ...formData, industryType: val })}
              />
              <TextInput
                label="Job Title"
                placeholder="Input job title"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
              />
              <TextInput
                label="Work Email"
                placeholder="Input email"
                value={formData.workEmail}
                onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
              />
              <TextInput
                label="Phone Number"
                placeholder="Input number"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`bg-[#F05125] hover:bg-orange-600 text-white px-10 py-2 rounded-full ${
                    submitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {submitting ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-5">
            <div className="relative h-[160px] sm:h-[280px] w-full transition-opacity duration-500 ease-in-out opacity-100 hover:opacity-75">
              <Image
                src={article.thumbnailUrl || "/assets/dumi.jpg"}
                alt={article.title || "News Cover"}
                fill
                className="object-cover rounded-sm sm:rounded-2xl"
              />
            </div>
            <div className="hidden sm:flex flex-col gap-5">
              <h4 className=" text-4xl font-medium w-[80%] leading-[120%]">{article.title}</h4>
              {renderContentBlocks(article.content)}
              <div className="text-[18px] font-medium flex gap-3 mt-4">
                <p>Created {article.date ? new Date(article.date).toLocaleDateString() : ""}</p>
                <p className="text-[#D8DBE1]">|</p>
                <p>12 Pages</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal sukses */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl p-8 w-[90%] max-w-md text-center relative">
            <h2 className="text-2xl font-semibold mb-4">Form Terkirim!</h2>
            <p className="mb-6">Terima kasih, silakan cek email Anda untuk laporan.</p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="bg-[#F05125] text-white px-6 py-2 rounded-full hover:bg-orange-600"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
