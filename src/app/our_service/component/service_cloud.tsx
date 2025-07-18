"use client";

import ScheduleSession from "@/app/component/ScheduleSession";
import { images } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";

export default function OurServiceCloud() {
  return (
    <section className="relative min-h-screen bg-white font-inter">
      <div className="relative w-screen h-[70vh] md:h-[80vh] lg:h-[105vh] sm:bg-[url('/assets/our_cloud.png')] bg-[url('/assets/our_cloud_mobile.png')] bg-no-repeat bg-center bg-cover sm:bg-cover">
        <div className="  text-black flex flex-col gap-4 sm:gap-10 justify-center items-start px-4 md:px-10 lg:px-25 pt-22 md:pt-40 lg:pt-50">
          <div className="flex flex-col sm:gap-2 font-medium">
            <h1 className="inline text-3xl sm:text-6xl">Cloud that Grows</h1>
            <h1 className="inline text-3xl sm:text-6xl "> with You</h1>
          </div>
          <p className="tracking-[.01em] w-full sm:w-[600px] text-[15px] sm:text-lg font-[300]">
            Advance your operations with a cloud that evolves with every stage
            of your business
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
              Cloud Transformation
            </p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[70%] font-medium leading-[130%]">
              Migrate smarter, scale faster, and future-proof your
              infrastructure
            </h2>
            <p className="text-[#7D7D9D] mt-2 sm:mt-3 w-full lg:w-[80%] text-[16px] sm:text-[18px]">
              Modernize your systems into cloud-native environments tailored for
              speed and flexibility. Engineered to drive continuous growth
            </p>
          </div>
          <div className="relative w-full h-[237px] sm:h-[300px] md:h-[400px] ">
            <Image
              src={images.IMG_OUR_CLOUD_1}
              alt="cloud-1"
              fill
              className="object-contain rounded-1xl" // atau contain
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 px-4 md:px-10 lg:px-25">
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] ">
            <Image
              src={images.IMG_OUR_CLOUD_2}
              alt="cloud-1"
              fill
              className="object-contain rounded-1xl" // atau contain
            />
          </div>
          <div className="flex flex-col gap-2 items-start pt-5 lg:pl-20 ">
            <p className="text-[#F05125] text-[16px] sm:text-18px font-medium">
              Cloud Optimization{" "}
            </p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[80%] font-medium leading-[130%]">
              Maximize performance while reducing cloud waste, costs, and
              complexity
            </h2>
            <p className="text-[#7D7D9D] mt-2 sm:mt-3 w-full lg:w-[85%] text-[16px] sm:text-[18px]">
              Fine-tune your cloud usage to eliminate waste and maximize ROI.
              The result is a leaner, faster, and more responsive infrastructure
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 px-4 md:px-10 lg:px-25">
          <div className="flex flex-col gap-1 pt-5 lg:gap-2 items-start">
            <p className="text-[#F05125] text-[16px] sm:text-18px font-medium">
              Cloud Managed Services
            </p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[70%] font-medium leading-[130%]">
              Gain continuous cloud stability with proactive monitoring and
              hands-off operations
            </h2>
            <p className="text-[#7D7D9D] mt-2 sm:mt-3 w-full lg:w-[80%] text-[16px] sm:text-[18px]">
              Keep your business running at peak performance with a cloud that
              is monitored, secured, and optimized around the clock
            </p>
          </div>
          <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] ">
            <Image
              src={images.IMG_OUR_CLOUD_3}
              alt="cloud-1"
              fill
              className="object-contain rounded-1xl" // atau contain
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-5 sm:gap-0 mt-10 sm:mt-20">
        <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px]">
          <Image
            src={images.IMG_OUR_CLOUD_4}
            alt="cloud-1"
            fill
            className="object-contain object-left"
          />
        </div>
        <div className="flex flex-col gap-2 items-start pt-8 px-5 sm:px-20 ">
          <h2 className="text-[24px] sm:text-5xl font-[500] leading-[130%]  w-[90%]">
            Powered by Microsoft
          </h2>
          <p className="text-[#7D7D9D] mt-3 text-[16px] sm:text-[18px]">
            To build future-ready solutions, 1011 harnesses the power of
            Microsoft technologies, including Azure Machine Learning, AI
            Foundry, and Microsoft Fabric. Every system we deploy is designed to
            support agility, intelligence, and operational excellence.
          </p>
        </div>
      </div>
      <ScheduleSession />
    </section>
  );
}
