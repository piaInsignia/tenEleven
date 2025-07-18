"use client";

import Select from "@/app/component/SelectInput";
import TextInput from "@/app/component/TextInput";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InsighReport() {
  const navigate = useRouter();

  return (
    <div className="relative min-h-screen bg-white pt sm:pt-23 font-inter">
      <div className="px-5 sm:px-20 h-full py-8">
        <div
          className="text-[#F05125] flex items-center gap-2 text-[16px] font-medium cursor-pointer mb-10 sm:mb-0"
          onClick={() => navigate.back()}
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
                src="/assets/dumi.jpg"
                alt="News Cover"
                fill
                className="object-cover rounded-sm sm:rounded-2xl"
              />
            </div>
            <div className="hidden sm:flex flex-col gap-5">
              <h4 className=" text-4xl font-medium w-[80%] leading-[120%]">
                Understanding AI Agents and Why They Are Gaining So Much
                Attention
              </h4>
              <p className="text-[16px] font-normal text-[#7D7D9D]">
                As a Microsoft partner, 1011 empowers businesses harnessing data
                and AI to drive impactful transformation. The ability to
                innovate and stay ahead of the competition in today’s
                fast-paced.
              </p>
              <hr className="border-[#D8DBE1]" />
              <p className="text-[16px] font-normal text-[#7D7D9D]">
                As a Microsoft partner, 1011 empowers businesses harnessing data
                and AI to drive impactful transformation. The ability to
                innovate and stay ahead of the competition in today’s
                fast-paced. As a Microsoft partner, 1011 empowers businesses
                harnessing data and AI to drive impactful transformation.
              </p>
              <div className="text-[18px] font-medium flex gap-3 mt-4">
                <p>Created 30 April 2025</p>
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
