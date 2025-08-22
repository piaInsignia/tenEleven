"use client";

import ScheduleSession from "@/app/component/ScheduleSession";
import { images } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";

export default function OurServiceData() {
  return (
    <section className="relative min-h-screen bg-white font-inter">
      <div className="relative w-screen h-[70vh] md:h-[80vh] lg:h-[105vh] sm:bg-[url('/assets/our_data.png')] bg-[url('/assets/our_data_mobile.png')] bg-no-repeat bg-center bg-cover sm:bg-cover">
        <div className="  text-black flex flex-col gap-4 sm:gap-10 justify-center items-start px-4 md:px-10 lg:px-25 pt-22 md:pt-40 lg:pt-50">
          <div className="flex flex-col  sm:gap-2 font-medium">
            <h1 className="inline text-3xl sm:text-6xl">Everything Starts</h1>
            <h1 className="inline text-3xl sm:text-6xl ">with Data</h1>
          </div>
          <p className="tracking-[.01em] w-full sm:w-[600px] text-[15px] sm:text-lg font-[300]">
            Maximize the full potential by owning reliable and intelligent data
            systems. With seamless orchestration, every component works in sync
            to provide valuable insights.
          </p>

          <div className="flex mt-4 sm:m-0 items-center text-[18px]">
            <Link
              href="/schedule"
              className="bg-[#F05125] hover:bg-orange-600 text-white text-sm sm:text-lg py-2 px-4 sm:px-6 sm:py-3 rounded-full "
            >
              Schedule Session
            </Link>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-full flex flex-col gap-10 sm:gap-20">
        <div className="flex flex-col-reverse  lg:grid lg:grid-cols-2 px-4 md:px-10 lg:px-25">
          <div className="flex flex-col gap-1 pt-5 lg-pt-0 lg:gap-2 items-start">
            <p className="text-[#F05125] text-[16px] sm:text-18px font-medium">
              Data Transformation
            </p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[70%] font-medium leading-[130%]">
              Transform raw data into high-quality assets for accurate reporting
            </h2>
            <p className="text-[#7D7D9D] mt-2 sm:mt-3 w-full lg:w-[80%] text-[16px] sm:text-[18px]">
              Obtain structured and secure foundations that turn data into
              direction, ensuring every decision leads to real outcomes.{" "}
            </p>
          </div>
          <div className="relative w-full h-[237px] sm:h-[300px] md:h-[400px] ">
            <Image
              src={images.IMG_OUR_DATA_1}
              alt="cloud-1"
              fill
              className="object-contain rounded-1xl" // atau contain
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-10 lg:px-25">
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] ">
            <Image
              src={images.IMG_OUR_DATA_3}
              alt="cloud-1"
              fill
              className="object-contain rounded-1xl" // atau contain
            />
          </div>
          <div className="flex flex-col gap-2 items-start pt-5 lg:pl-20 ">
            <p className="text-[#F05125] text-[16px] sm:text-18px font-medium">
              Data Pipeline
            </p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[80%] font-medium leading-[130%]">
              Reduce manual work and ensure reliable access
            </h2>
            <p className="text-[#7D7D9D] mt-2 sm:mt-3 w-full lg:w-[85%] text-[16px] sm:text-[18px]">
              Own automated data pipelines to ensure smooth data movement across
              systems, and gain real-time access to high-quality data.
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 px-4 md:px-10 lg:px-25">
          <div className="flex flex-col gap-1 pt-5 lg:gap-2 items-start">
            <p className="text-[#F05125] text-[16px] sm:text-18px font-medium">
              Customer Data Platform (CDP)
            </p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[70%] font-medium leading-[130%]">
              Build accurate profiles and run targeted campaigns
            </h2>
            <p className="text-[#7D7D9D] mt-2 sm:mt-3 w-full lg:w-[80%] text-[16px] sm:text-[18px]">
              With Microsoft technology, get the clarity you need with
              cross-channel customer data that reveals real preferences and
              behaviors.
            </p>
          </div>
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] ">
            <Image
              src={images.IMG_OUR_DATA_2}
              alt="cloud-1"
              fill
              className="object-contain rounded-1xl" // atau contain
            />
          </div>
        </div>
      </div>
      {/* <div className="px-4  md:px-10 lg:px-25 pt-10 lg:pt-20">
        <div className="bg-[#F6F7FB] rounded-2xl p-5 sm:p-10 flex flex-col lg:flex-row lg:gap-10">
          <div className="relative w-[70px] sm:w-[115px] h-[60px] sm:h-[100px]">
            <Image
              src={images.IMG_OUR_AI_4}
              alt="cloud-1"
              fill
              className="object-contain rounded-1xl object-left" // atau contain
            />
          </div>
        </div>
      </div> */}
      <ScheduleSession />
    </section>
  );
}
