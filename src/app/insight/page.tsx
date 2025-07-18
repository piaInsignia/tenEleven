"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Search from "../component/Search";
import ScheduleSession from "../component/ScheduleSession";

export default function Insight() {
  const navigate = useRouter();

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
          <div
            className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-5 h-[380px] w-full max-w-[408px]"
            onClick={() => navigate.push("insight/insight_report")}
          >
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
        <div className="w-ful flex justify-center mt-10">
          <Link
            href="/contact"
            className="border-1 border-[#F05125] hover:bg-orange-600 text-[#F05125] hover:text-white text-center font-[500] px-6 py-2 w-full sm:w-fit rounded-full "
          >
            Explore More News
          </Link>
        </div>
      </div>
      <ScheduleSession />
    </div>
  );
}
