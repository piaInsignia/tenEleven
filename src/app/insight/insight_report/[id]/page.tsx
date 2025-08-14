"use client";

import Select from "@/app/component/SelectInput";
import TextInput from "@/app/component/TextInput";
import { images } from "@/lib/image";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

export default function InsighReport() {
  const router = useRouter();
  const params = useParams();
  const [article, setArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


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
            <div className="mt-5 sm:mt-10 flex flex-col gap-5">
              <TextInput label="Full Name" placeholder="Input name" />
              <TextInput label="Company" placeholder="Input company" />{" "}
              <Select
                options={[
                  {
                    value: "Specific Solution",
                    label: "Specific Solution",
                  },
                ]}
                label="Industry Type"
                placeholder="Choose Industry"
              />
              <TextInput label="Job Title" placeholder="Input job title" />{" "}
              <TextInput label="Work Email" placeholder="Input email" />{" "}
              <TextInput label="Phone Number" placeholder="Input number" />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#F05125] hover:bg-orange-600 text-white px-10 py-2 text-center rounded-full w-full sm:w-fit "
                >
                  Send
                </button>
              </div>
            </div>
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
              <h4 className=" text-4xl font-medium w-[80%] leading-[120%]">
                {article.title}
              </h4>
              {renderContentBlocks(article.content)}
              <div className="text-[18px] font-medium flex gap-3 mt-4">
                <p>Created  {article.date ? new Date(article.date).toLocaleDateString() : ""}</p>
                <p className="text-[#D8DBE1]">|</p>
                <p>12 Pages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className="border-[#9FA6B466]" />
        <div className="px-5 sm:px-20 py-5 sm:py-20 flex flex-col gap-5 sm:gap-10">
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-10">
            <h1 className="text-4xl sm:text-6xl font-medium leading-[120%] sm:w-full w-[90%]">
              Looking for More Reports? It’s All Here
            </h1>
            <div className="text-[15px] sm:text-[18px] text-[#7D7D9D] w-full sm:w-[80%] sm:pl-15">
              <p>
                Explore key trends redefining the future of data, AI, cloud, and
                enterprise innovation.
              </p>
            </div>
          </div>
          <div className="-mx-2 grid  sm:grid-cols-[repeat(auto-fit,_minmax(372px,_1fr))] gap-4">
            <div className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-5 h-[380px] w-full max-w-[408px]">
              <div className="relative h-48 w-full">
                <Image
                  src="/assets/dumi.jpg"
                  alt="News Cover"
                  fill
                  className="object-cover rounded-2xl"
                />
                <span className="absolute top-3 left-3 bg-white/80 text-[#F05125] text-xs px-3 py-1 rounded-full font-medium">
                  News
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-[18px] font-medium truncate">
                  Understanding AI Agents and Why They Are Gaining So Much
                  Attention
                </h6>
                <p className="text-[16px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">
                  With Microsoft Azure technology, 1011 enables cloud
                  transformation that’s scalable and cost-aware. Built for
                  long-term performance.
                </p>
              </div>
              <div className="w-full flex mt-5">
                <Link
                  href="/contact"
                  className="bg-[#F05125] hover:bg-orange-600 text-white text-center font-[500] px-6 py-2 w-full rounded-full "
                >
                  Download Whitepapper
                </Link>
              </div>
            </div>{" "}
            <div className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-5 h-[380px] w-full max-w-[408px]">
              <div className="relative h-48 w-full">
                <Image
                  src="/assets/dumi.jpg"
                  alt="News Cover"
                  fill
                  className="object-cover rounded-2xl"
                />
                <span className="absolute top-3 left-3 bg-white/80 text-[#F05125] text-xs px-3 py-1 rounded-full font-medium">
                  News
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-[18px] font-medium truncate">
                  Understanding AI Agents and Why They Are Gaining So Much
                  Attention
                </h6>
                <p className="text-[16px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">
                  With Microsoft Azure technology, 1011 enables cloud
                  transformation that’s scalable and cost-aware. Built for
                  long-term performance.
                </p>
              </div>
              <div className="w-full flex mt-5">
                <Link
                  href="/contact"
                  className="bg-[#F05125] hover:bg-orange-600 text-white text-center font-[500] px-6 py-2 w-full rounded-full "
                >
                  Download Whitepapper
                </Link>
              </div>
            </div>{" "}
            <div className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-5 h-[380px] w-full max-w-[408px]">
              <div className="relative h-48 w-full">
                <Image
                  src="/assets/dumi.jpg"
                  alt="News Cover"
                  fill
                  className="object-cover rounded-2xl"
                />
                <span className="absolute top-3 left-3 bg-white/80 text-[#F05125] text-xs px-3 py-1 rounded-full font-medium">
                  News
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-[18px] font-medium truncate">
                  Understanding AI Agents and Why They Are Gaining So Much
                  Attention
                </h6>
                <p className="text-[16px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">
                  With Microsoft Azure technology, 1011 enables cloud
                  transformation that’s scalable and cost-aware. Built for
                  long-term performance.
                </p>
              </div>
              <div className="w-full flex mt-5">
                <Link
                  href="/contact"
                  className="bg-[#F05125] hover:bg-orange-600 text-white text-center font-[500] px-6 py-2 w-full rounded-full "
                >
                  Download Whitepapper
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
