"use client";

import { images } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ScheduleSession from "../component/ScheduleSession";

export default function HomePage() {
  const navigate = useRouter();

  return (
    <div className="relative min-h-screen bg-white pt-23 font-inter">
      <div className="relative lg:bg-[url('/assets/bg_section_one.png')] bg-no-repeat w-[100%] h-[86%]  bg-right">
        <div className="hidden md:absolute bottom-0 right-0 w-3/5 h-80 bg-gradient-to-t from-white/90 to-transparent"></div>

        <div className="text-black h-50 sm:h-110 xl:h-150 flex flex-col gap-5 sm:gap-10 justify-center items-start px-5 md:px-10 xl:px-30 ">
          <div className="flex flex-col font-[500]">
            <h1 className="text-3xl sm:text-6xl">Run on AI.</h1>
            <h1 className="text-3xl sm:text-6xl ">Real Impacts</h1>
          </div>

          <p className="tracking-[.01em] w-[100%] sm:w-[500px] text-sm sm:text-lg font-[300]">
            With Microsoft technology, we redefine digitalization by merging
            data and AI
          </p>

          <div className="flex gap-10 items-center justify-center w-full sm:justify-start sm:mt-10 text-[14px] sm:text-[18px]">
            <Link
              href="/schedule"
              className="bg-[#F05125] hover:bg-orange-600 text-white px-8 sm:px-6 py-2 sm:py-3 rounded-full "
            >
              Get In Touch
            </Link>
            <Link href="/studyCase">See Case Study → </Link>
          </div>
        </div>
      </div>
      <div className="relative w-full aspect-[12/10] lg:hidden">
        <Image
          src={images.IMG_HOME_SECTION_ONE}
          alt="img-schedule"
          fill
          className="object-contain object-center"
        />
      </div>
      {/* home section 2 */}
      <div className="relative w-full py-5 sm:py-[20px] sm:mt-20">
        <div className="flex flex-col justify-center items-center gap-3 sm:gap-8">
          <h1 className="flex sm:flex-row flex-col items-center text-[24px] sm:text-5xl font-medium">
            <span className="inline">Build Once.</span>
            <span className="inline"> Scale Forever with AI</span>
          </h1>
          <p className="font-[300] text-[#7D7D9D] text-[16px] text-center sm:text-[18px]">
            We engineer robust architecture that accelerates growth and improves
            efficiency
          </p>
        </div>

        <div className=" grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-15 sm:gap-4 px-5 sm:px-25 pt-15 sm:pt-30">
          <div
            className="group relative hover:bg-[#F24E1E] rounded-2xl hover:text-white w-full max-w-sm pb-10"
            onClick={() => navigate.push("/our_service?keyword=data")}
          >
            <div className="relative w-full h-[120px] sm:h-[160px]">
              <div className="absolute top-4 right-4 ">
                <Image
                  src={images.IMG_AI_TOGGLE}
                  alt="Example"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div>

              <div className="absolute -top-10  left-1/2 -translate-x-1/2  w-35 h-35 sm:w-45 sm:h-45">
                <Image
                  src={images.IMG_AI_DATA}
                  alt="Example"
                  fill
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className=" flex flex-col items-center gap-2 sm:gap-5 ">
              <h6 className="text-[20px] sm:text-2xl text-center font-medium">
                Data Integration
              </h6>
              <p className="font-[300] text-[#7D7D9D] text-center text-[16px] sm:text-[18px] w-[340px] group-hover:font-[300] group-hover:text-white">
                Own intelligent data platforms that power real-time insights to
                make visionary decisions.
              </p>
            </div>
          </div>

          <div
            className="group relative hover:bg-[#F24E1E] rounded-2xl hover:text-white w-full max-w-sm pb-10"
            onClick={() => navigate.push("/our_service?keyword=ai")}
          >
            <div className="relative w-full h-[120px] sm:h-[160px]">
              <div className="absolute top-4 right-4 ">
                <Image
                  src={images.IMG_AI_TOGGLE}
                  alt="Example"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div>
              <div className="absolute -top-10  left-1/2 -translate-x-1/2  w-35 h-35 sm:w-45 sm:h-45">
                <Image
                  src={images.IMG_AI_ICON}
                  alt="Example"
                  fill
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className=" flex flex-col items-center gap-2 sm:gap-5 ">
              <h6 className="text-[20px] sm:text-2xl text-center font-medium">
                Artificial Intelligence
              </h6>
              <p className="font-[300] text-[#7D7D9D] text-center text-[16px] sm:text-[18px] w-[340px] group-hover:font-[300] group-hover:text-white">
                Equip your entire operations with AI to streamline complexity,
                increase speed, and optimize returns.
              </p>
            </div>
          </div>
          <div
            className=" group relative hover:bg-[#F24E1E] rounded-2xl hover:text-white w-full max-w-sm pb-10"
            onClick={() => navigate.push("/our_service?keyword=cloud")}
          >
            <div className="relative w-full h-[120px] sm:h-[160px]">
              <div className="absolute top-4 right-4 ">
                <Image
                  src={images.IMG_AI_TOGGLE}
                  alt="Example"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div>
              <div className="absolute -top-10  left-1/2 -translate-x-1/2  w-35 h-35 sm:w-45 sm:h-45">
                <Image
                  src={images.IMG_AI_CLOUD}
                  alt="Example"
                  fill
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className=" flex flex-col items-center gap-2 sm:gap-5 ">
              <h6 className="text-[20px] sm:text-2xl text-center font-medium">
                Cloud Acceleration
              </h6>
              <p className="font-[300] text-[#7D7D9D] text-center text-[16px] sm:text-[18px] w-[340px] group-hover:font-[300] group-hover:text-white">
                With Microsoft Azure technology, 1011 enables cloud
                transformation that’s scalable and cost-aware. Built for
                long-term performance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* home section 3 */}
      <div className="px-5 sm:px-30 py-5 sm:py-20 ">
        <div className="flex flex-col items-center gap-5">
          <h1 className="text-[24px] sm:text-5xl text-center w-[90%] sm:w-full font-medium">
            AI Executes Smarter at Every Stage
          </h1>
          <p className="font-[300] text-[#7D7D9D] w-[100%] sm:w-[74%] text-center text-[16px] sm:text-[18px]">
            See our full-cycle solutions come alive. Fueled by data and executed
            flawlessly by AI, from audience targeting, campaign delivery, to
            detailed performance reporting.
          </p>
        </div>
        <div className="relative w-full aspect-[20/12] sm:aspect-[20/9]">
          <Image
            src={images.IMG_BANNER_STUDY_CASE}
            alt="Example"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex justify-center mt-5">
          <Link
            href="/studyCase"
            className="bg-[#F05125] hover:bg-orange-600 text-white px-6 py-3 rounded-full "
          >
            See Detail Our Study Cases
          </Link>
        </div>
      </div>
      {/* section 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-10 px-5 sm:px-20">
        <div className="text-[24px] sm:text-5xl text-left font-medium">
          <h1>Curated Enterprise Insights to Navigate the Future</h1>
        </div>
        <div className="text-[16px] sm:text-[20px] font-[300] text-[#7D7D9D] text-left sm:text-right sm:ml-15 leading-[130%]">
          <p>
            Explore key trends redefining the future of data, AI, cloud, and
            enterprise innovation.
          </p>
        </div>
      </div>
      <div className="py-5 sm:py-20 px-5 sm:px-20">
        <div className="-mx-2 grid grid-cols-[repeat(auto-fit,_minmax(380px,_1fr))] gap-4">
          <div
            className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-5 h-[380px] w-full max-w-[408px]"
            onClick={() => navigate.push("insight/insight_report")}
          >
            <div className="relative h-48 w-full ">
              <Image
                src="/assets/dumi.jpg"
                alt="News Cover"
                fill
                className="object-cover rounded-2xl"
              />
              <span className="absolute top-3 left-3 bg-white/80 text-[#F05125] text-xs px-3 py-1 rounded-full font-medium">
                Whitepapper
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <h6 className="text-[18px] font-medium truncate">
                Understanding AI Agents and Why They Are Gaining So Much
                Attention
              </h6>
              <p className="text-[14px] sm:text-[16px] font-light line-clamp-2 leading-[130%]">
                With Microsoft Azure technology, 1011 enables cloud
                transformation that’s scalable and cost-aware. Built for
                long-term performance.
              </p>
            </div>
            <div className="text-[14px] sm:text-[18px] w-full flex">
              <Link
                href="/contact"
                className="bg-[#F05125] hover:bg-orange-600 text-white text-center font-[500] px-6 py-2 w-full rounded-full "
              >
                Download Whitepapper
              </Link>
            </div>
          </div>

          <div
            className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-5 h-[380px] w-full max-w-[408px]"
            onClick={() => navigate.push("news/details")}
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
            <div className="flex flex-col gap-4">
              <h6 className="text-[18px] font-medium truncate">
                Understanding AI Agents and Why They Are Gaining So Much
                Attention
              </h6>
              <p className="text-[14px] sm:text-[16px] font-light line-clamp-2 leading-[130%]">
                With Microsoft Azure technology, 1011 enables cloud
                transformation that’s scalable and cost-aware. Built for
                long-term performance.
              </p>
            </div>
            <div className="text-[14px] sm:text-[16px] font-medium flex gap-3">
              <p>Published 30 April 2025</p>
              <p className="font-light">|</p>
              <p>Category News</p>
            </div>
          </div>

          <div
            className="bg-[#FFFAF8] rounded-2xl overflow-hidden flex flex-col gap-4 p-5 h-[380px] w-full max-w-[408px]"
            onClick={() => navigate.push("news/details")}
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
            <div className="flex flex-col gap-4">
              <h6 className="text-[18px] font-medium truncate">
                Understanding AI Agents and Why They Are Gaining So Much
                Attention
              </h6>
              <p className="text-[14px] sm:text-[16px] font-light line-clamp-2 leading-[130%]">
                With Microsoft Azure technology, 1011 enables cloud
                transformation that’s scalable and cost-aware. Built for
                long-term performance.
              </p>
            </div>
            <div className="text-[14px] sm:text-[16px] font-medium flex gap-3">
              <p>Published 30 April 2025</p>
              <p className="font-light">|</p>
              <p>Category News</p>
            </div>
          </div>
        </div>
      </div>

      {/* section 5 */}
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-5 sm:gap-10 px-5 sm:px-20">
        <div className="text-[20px] font-[300] text-[#7D7D9D] text-right ml-[1.5] leading-[130%] flex gap-5">
          <div className="relative w-full sm:w-[328px] h-[80px] px-5 sm:h-[214px] bg-[#FEF8F6] rounded-2xl flex items-center justify-center">
            <Image
              src={images.IMG_GRUP_MITSUBISHI}
              alt="News Cover"
              width={226}
              height={45}
              className="object-contain"
            />
          </div>

          <div className="relative w-full sm:w-[328px] h-[80px] px-5 sm:h-[214px] bg-[#FEF8F6] rounded-2xl flex items-center justify-center">
            <Image
              src={images.IMG_GRUP_BINUS}
              alt="News Cover"
              width={226}
              height={45}
              className="object-contain "
            />
          </div>
        </div>
        <div className="flex flex-col  sm:items-end gap-2 sm:gap-10">
          <h1 className="text-[24px] sm:text-5xl text-left sm:text-right font-medium">
            Trusted by Leading Companies
          </h1>
          <p className="font-[300] text-[16px] sm:text-[18px] w-full sm:w-[50%] text-left sm:text-right text-[#7D7D9D]">
            Partner with us to engineer real results that deliver timeless
            value.
          </p>
        </div>
      </div>

      <ScheduleSession />
    </div>
  );
}
