"use client";

import Select from "@/app/component/SelectInput";
import TextInput from "@/app/component/TextInput";
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

export default function InsightReport() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [article, setArticle] = useState<any | null>(null);
  const [articleId, setArticleId] = useState<string | null>(null);
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

        const attrs = data.attributes ?? data;
        const categoryName =
          attrs.category?.data?.attributes?.name ??
          (typeof attrs.category === "string" ? attrs.category : null) ??
          (attrs.type ? attrs.type : null);

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

        let contentCandidate: any = attrs.content ?? attrs.sections ?? attrs.body ?? null;
        if (typeof contentCandidate === "string" && contentCandidate.trim()) {
          try {
            const parsed = JSON.parse(contentCandidate);
            if (Array.isArray(parsed)) contentCandidate = parsed;
          } catch {}
        }
        if (!contentCandidate && attrs.contentBlocks) contentCandidate = attrs.contentBlocks;
        const contentNormalized = Array.isArray(contentCandidate) ? contentCandidate : [];

        if (!mounted) return;

        setArticle({
          id: data.id ?? attrs.id,
          title: attrs.title ?? attrs.name ?? "",
          date: attrs.publishedAt ?? attrs.date ?? attrs.createdAt ?? null,
          categoryName,
          thumbnailUrl,
          content: contentNormalized,
          rawAttrs: attrs,
        });
      } catch (e: any) {
        if (mounted) setError(e.message ?? "Unexpected error");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchArticle();
    return () => {
      mounted = false;
    };
  }, [id]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // if (!articleId) {
    //   console.error("articleId belum tersedia!");
    //   setSubmitting(false);
    //   return;
    // }

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
            article: id 
          }
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
