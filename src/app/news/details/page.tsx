"use client";

import { images } from "@/lib/image";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NewsDetails() {
  const navigate = useRouter();

  return (
    <div className="relative min-h-screen bg-white pt-12 sm:pt-23 font-inter">
      <div className="px-5 sm:px-20 h-full py-8">
        <div
          className="text-[#F05125] flex items-center gap-2 text-[16px] font-medium cursor-pointer mb-10 sm:mb-0"
          onClick={() => navigate.back()}
        >
          <MoveLeft color="#F05125" /> Back Page
        </div>
        <div className=" flex flex-col gap-5 mt-5">
          <h1 className="text-3xl sm:text-6xl font-medium">
            Understanding AI Agents and Why They Are Gaining So Much Attention
          </h1>
          <span className="flex">
            <span>Category News</span>
            <span className="relative before:content-['•'] before:mx-3">
              28 Oktober 2024
            </span>
          </span>
          <div className="relative h-[162px] sm:h-[550px] w-full ">
            <Image
              src="/assets/dumi.jpg"
              alt="News Cover"
              fill
              className="object-cover rounded-sm sm:rounded-2xl"
            />
          </div>

          <p className="text-[16px] sm:text-[18px] text-[#696A9C]">
            Reference: everyday.ai
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_320px] gap-10 mt-5 sm:mt-15">
          <div className=" flex flex-col gap-7 text-[16px] sm:text-[18px]">
            <p className="text-left text-[#7D7D9D]">
              The ability to innovate and stay ahead of the competition in
              today’s fast-paced digital landscape is crucial for startups and
              small businesses. The adoption of AI for startups has become a key
              driver in helping these companies not only survive but thrive in
              increasingly competitive markets. From gaining access to
              enterprise-level tools to improving efficiency and enhancing
              business strategies, AI for business is transforming how startups
              and small enterprises operate.
            </p>
            <div className="text-left flex flex-col gap-7">
              <h5 className="text-[18px] sm:text-[20px] font-semibold">
                How AI Gives Startups Access to Enterprise-Level Tools
              </h5>
              <p className="text-[#7D7D9D]">
                One of the most significant advantages of AI for startups is the
                access it provides to technology that was once reserved for
                large enterprises. Historically, small businesses and startups
                struggled to compete with bigger organizations due to limited
                resources and technology. However, AI is leveling the playing
                field, allowing even the smallest of companies to utilize
                powerful tools that boost productivity and decision-making. With
                AI-driven solutions like predictive analytics, customer service
                automation, and data-driven insights, startups can now perform
                on par with industry giants, using the same advanced technology
                to scale and grow.
              </p>
            </div>
            <div className="text-left flex flex-col gap-7">
              <h5 className="text-[18px] sm:text-[20px] font-semibold">
                Boosting Efficiency and Saving Time with AI for Small Businesses
              </h5>
              <p className="text-[#7D7D9D]">
                Beyond just providing access to high-level tools, AI is becoming
                an indispensable part of everyday operations for small
                businesses. One of the most appealing benefits is how AI for
                startups helps boost efficiency and save time. For entrepreneurs
                managing everything from product development to customer
                service, time is a valuable asset. AI automates time-consuming
                tasks, such as answering customer inquiries, organizing data,
                and managing supply chains. This automation allows small
                business owners to focus on more strategic activities, such as
                innovation and growth, without getting bogged down by repetitive
                tasks. The time saved by incorporating AI into operations means
                increased productivity and the ability to meet deadlines more
                effectively, contributing to overall business success.
              </p>
            </div>
            <div className="text-left flex flex-col gap-7">
              <h5 className="text-[18px] sm:text-[20px] font-semibold">
                Practical AI Solutions for Business Planning and Marketing
                Growth
              </h5>
              <p className="text-[#7D7D9D]">
                Another key area where AI for startups is making an impact is in
                business planning and marketing growth. AI is no longer just a
                tool for streamlining operations; it’s becoming a critical asset
                in crafting strategies that drive business expansion. For
                startups, having a strong business plan and effective marketing
                strategy is essential to gaining a foothold in the market.
              </p>
            </div>
            <div className="flex flex-col mt-5 gap-3">
              <span className="text-[20px] font-semibold">Share this news</span>
              <div className="flex gap-3">
                <Image
                  src={images.IMG_SM_FACEBOOK}
                  alt="social-media"
                  height={42}
                  width={42}
                  className="object-contain"
                />
                <Image
                  src={images.IMG_SM_X}
                  alt="social-media"
                  height={42}
                  width={42}
                  className="object-contain"
                />
                <Image
                  src={images.IMG_SM_WHATSAPP}
                  alt="social-media"
                  height={42}
                  width={42}
                  className="object-contain"
                />
                <Image
                  src={images.IMG_SM_TELEGRAM}
                  alt="social-media"
                  height={42}
                  width={42}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-3  h-[300px] w-full sm:max-w-[320px]">
              <div className="relative h-[127px] w-full">
                <Image
                  src="/assets/dumi.jpg"
                  alt="News Cover"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-[16px] font-medium truncate">
                  Understanding AI Agents and Why They Are Gaining So Much
                  Attention
                </h6>
                <p className="text-[14px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">
                  With Microsoft Azure technology, 1011 enables cloud
                  transformation that’s scalable and cost-aware. Built for
                  long-term performance.
                </p>
              </div>
              <div className="w-full flex mt-3 mb-1">
                <div className="text-[12px] font-medium flex gap-3">
                  <p>Created 30 April 2025</p>
                  <p className="text-[#D8DBE1]">|</p>
                  <p>12 Pages</p>
                </div>
              </div>
            </div>
            <div className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-3 h-[300px] w-full sm:max-w-[320px]">
              <div className="relative h-[127px] w-full">
                <Image
                  src="/assets/dumi.jpg"
                  alt="News Cover"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-[16px] font-medium truncate">
                  Understanding AI Agents and Why They Are Gaining So Much
                  Attention
                </h6>
                <p className="text-[14px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">
                  With Microsoft Azure technology, 1011 enables cloud
                  transformation that’s scalable and cost-aware. Built for
                  long-term performance.
                </p>
              </div>
              <div className="w-full flex mt-3 mb-1">
                <div className="text-[12px] font-medium flex gap-3">
                  <p>Created 30 April 2025</p>
                  <p className="text-[#D8DBE1]">|</p>
                  <p>12 Pages</p>
                </div>
              </div>
            </div>{" "}
            <div className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-3  h-[300px] w-full sm:max-w-[320px]">
              <div className="relative h-[127px] w-full">
                <Image
                  src="/assets/dumi.jpg"
                  alt="News Cover"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="flex flex-col gap-2">
                <h6 className="text-[16px] font-medium truncate">
                  Understanding AI Agents and Why They Are Gaining So Much
                  Attention
                </h6>
                <p className="text-[14px] text-[#7D7D9D] font-light line-clamp-2 leading-[130%]">
                  With Microsoft Azure technology, 1011 enables cloud
                  transformation that’s scalable and cost-aware. Built for
                  long-term performance.
                </p>
              </div>
              <div className="w-full flex mt-3 mb-1">
                <div className="text-[12px] font-medium flex gap-3">
                  <p>Created 30 April 2025</p>
                  <p className="text-[#D8DBE1]">|</p>
                  <p>12 Pages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
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
      </div> */}
    </div>
  );
}
