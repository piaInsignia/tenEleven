"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Search from "../component/Search";
import ScheduleSession from "../component/ScheduleSession";
import { useEffect, useState } from "react";

type whitePaperItem = {
  id: number;
  documentId: string;
  title: string;
  description: string;
  publishedDate: string;
  category: string;
  thumbnail: string;
};

function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

/** safe getter for nested props */
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

export default function Insight() {
  const [whitepaperData, setWhitePaperData] = useState<whitePaperItem[]>([]);
  const navigate = useRouter();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1337";

    fetch(
      `${baseUrl}/api/articles?filters[type][$eq]=whitepapers&populate[categories]=true&populate[thumbnail]=true`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data?.data || !Array.isArray(data.data)) {
          console.error("data.data undefined or not an array!");
          return;
        }

        const items: whitePaperItem[] = (Array.isArray(data.data) ? data.data : []).map((raw: unknown) => {
  // raw may be Strapi entity { id, attributes } or plain object
  let attrs: Record<string, unknown> = {};
  let id = 0;

  if (isObject(raw) && "id" in raw) {
    const rawRec = raw as Record<string, unknown>;
    id = Number(rawRec.id) || 0;
    const maybeAttrs = rawRec.attributes;
    if (isObject(maybeAttrs)) attrs = maybeAttrs as Record<string, unknown>;
    else attrs = rawRec;
  } else if (isObject(raw)) {
    attrs = raw as Record<string, unknown>;
    id = Number(attrs.id as unknown as number) || 0;
  }


          const title =
            (typeof attrs.title === "string" && attrs.title) ??
            (typeof attrs.name === "string" ? attrs.name : "");

          // documentId: try several fields
          const documentId =
            (typeof attrs.documentId === "string" && attrs.documentId) ??
            (typeof attrs.slug === "string" && attrs.slug) ??
            String(id);

          // description: try content[0].children[0].text or contentBlocks etc.
          const descFromContent = getIn(attrs, ["content", 0, "children", 0, "text"]);
          const descFromSections = getIn(attrs, ["sections", 0, "children", 0, "text"]);
          const descFromContentBlocks = getIn(attrs, ["contentBlocks", 0, "children", 0, "text"]);
          const description =
            typeof descFromContent === "string"
              ? descFromContent
              : typeof descFromSections === "string"
              ? descFromSections
              : typeof descFromContentBlocks === "string"
              ? descFromContentBlocks
              : "";

          // published date pick
          const publishedDateRaw =
            (typeof attrs.publishedAt === "string" && attrs.publishedAt) ??
            (typeof attrs.date === "string" && attrs.date) ??
            (typeof attrs.createdAt === "string" && attrs.createdAt) ??
            null;
          const publishedDate = publishedDateRaw ? new Date(publishedDateRaw).toLocaleDateString() : "";

          // category
          const category =
            getStr(attrs, ["category", "data", "attributes", "name"]) ??
            (typeof attrs.category === "string" ? attrs.category : "-");

          // thumbnail: try nested fields
          const thumbDataUrl = getStr(attrs, ["thumbnail", "data", "attributes", "url"]);
          const thumbFormatsSmall =
            getStr(attrs, ["thumbnail", "formats", "thumbnail", "url"]) ??
            getStr(attrs, ["thumbnail", "formats", "small", "url"]);
          const thumbUrlDirect = getStr(attrs, ["thumbnail", "url"]);
          const rawThumb = thumbDataUrl ?? thumbFormatsSmall ?? thumbUrlDirect ?? null;
          const thumbnail =
            typeof rawThumb === "string" ? (rawThumb.startsWith("http") ? rawThumb : `${baseUrl}${rawThumb}`) : "/placeholder.png";

          return {
            id,
            documentId,
            title,
            description,
            publishedDate,
            category: category ?? "-",
            thumbnail,
          } as whitePaperItem;
        });

        setWhitePaperData(items);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-white font-inter">
      <div className="relative bg-[url('/assets/bg_mobile_insight.png')]  sm:bg-[url('/assets/bg_insight.png')] bg-no-repeat w-[100%] sm:h-[465px] object-contain mt-15 sm:mt-0 mb-10 bg-top-right">
        <div className="text-black flex flex-col gap-6 sm:gap-10 justify-center items-start pl-5 pr-5 sm:pr-0 sm:pl-20 w-full sm:w-[52%] ">
          <div className="flex flex-col font-[500] mt-7 sm:mt-40">
            <h1 className="text-3xl sm:text-6xl">Dig Deeper on</h1>
            <h1 className="text-3xl sm:text-6xl ">Exclusive Reports</h1>
          </div>

          <div className="flex gap-2 sm:gap-5 items-center text-[18px] w-full">
            <div className="w-[100%]">
              <Search placeholder="Search news" />
            </div>
            <button
              type="button"
              className="bg-[#F05125] hover:bg-orange-600 text-white text-[15px] sm:text-[18px] px-6 py-2 sm:py-3 rounded-full cursor-pointer"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="h-full px-5 sm:px-20">
        <div className="-mx-2 grid  sm:grid-cols-[repeat(auto-fit,_minmax(372px,_1fr))] gap-4">
          {whitepaperData.map((item) => (
            <div
              className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-5 h-[380px] w-full max-w-[408px]"
              key={item.documentId || item.id}
              onClick={() => navigate.push(`insight/insight_report/${item.documentId}`)}
            >
              <div className="relative h-48 w-full">
                <Image src={item.thumbnail} alt="News Cover" fill className="object-cover rounded-2xl" />
                <span className="absolute top-3 left-3 bg-white/80 text-[#F05125] text-xs px-3 py-1 rounded-full font-medium">
                  Whitepaper
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-[18px] font-medium truncate">{item.title}</h6>
                <p className="text-[16px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">{item.description}</p>
              </div>
              <div className="w-full flex mt-5">
                <Link href="/contact" className="bg-[#F05125] hover:bg-orange-600 text-white text-center font-[500] px-6 py-2 w-full rounded-full ">
                  Download Whitepapper
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="w-ful flex justify-center mt-10">
          <Link href="/contact" className="border-1 border-[#F05125] hover:bg-orange-600 text-[#F05125] hover:text-white text-center font-[500] px-6 py-2 w-full sm:w-fit rounded-full ">
            Explore More News
          </Link>
        </div>
      </div>
      <ScheduleSession />
    </div>
  );
}
