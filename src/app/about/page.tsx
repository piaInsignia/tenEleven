"use client";

import { images } from "@/lib/image";
import Image from "next/image";
import ScheduleSession from "../component/ScheduleSession";
import SimpleSlider from "../component/Slider";
import { listFeature } from "@/lib/data";

// export const metadata = getMetadata("About", "Tentang kami di Teneleven");

export default function NewsDetails() {
  return (
    <div className="relative min-h-screen bg-white pt-12 sm:pt-23">
      <div className=" h-full">
        <div className=" flex flex-col gap-5 mt-5 px-0 md:px-10 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 px-5 sm:px-5">
            <h1 className="text-3xl md:text-6xl font-medium  w-[90%] sm:w-[100%]">
              With 1011, Every Line of Code Leads to Results
            </h1>
            <div className="pl-0 lg:pl-15 text-[16px] md:text-[20px] text-[#7D7D9D] w-[100%] xl:w-[90%] mt-5 sm:mt-4">
              <p>
                1011 exists to bridge the gap between vision and execution. With
                a sharp focus on outcomes, we implement systems to empower
                enterprises moving faster and acting smarter in a data-driven
                world.
              </p>
            </div>
          </div>

          <div className="relative h-[240px] sm:h-[550px] w-full mt-5 xl:mt-10">
            <Image
              src={images.IMG_ABOUT_1}
              alt="News Cover"
              fill
              className="object-cover rounded md:rounded-2xl"
            />
          </div>
        </div>
        <div className="flex flex-col items-center mt-10 lg:mt-30 sm:gap-5 px-5 sm:px-20">
          <h2 className="text-[24px] sm:text-5xl text-center font-medium">
            Clarity in Vision. Certainty in Execution
          </h2>
          <p className="text-[16px] sm:text-[20px] text-[#7D7D9D] text-center w-[100%] lg:w-[55%]">
            We believe progress starts with clarity. That’s why our vision and
            mission guide every step we take.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-10 mt-8 sm:mt-20 px-5 sm:px-20">
          <div className="bg-[#FFFAF8] px-5 xl:px-10 py-5 xl:py-10 rounded-2xl flex flex-col gap-3">
            <h3 className="text-[20px] xl:text-3xl font-medium">
              {" "}
              Our Mission
            </h3>
            <p className="text-[16px] xl:text-[20px] text-[#7D7D9D] ">
              To become a trusted IT consulting partner by delivering
              exceptional client experiences through robust technologies,
              end-to-end solutions, and excellence at every touchpoint.
            </p>
          </div>
          <div className="bg-[#FFFAF8] px-5 xl:px-10 py-5 xl:py-10 rounded-2xl flex flex-col gap-3">
            <h3 className="text-[20px] xl:text-3xl font-medium">Our Vision</h3>
            <p className="text-[16px] xl:text-[20px] text-[#7D7D9D]">
              To deliver solutions that unify data, cloud, and AI in a seamless
              ecosystem. Integrated through Microsoft technology and carefully
              aligned with each enterprise’s strategic goals.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:grid sm:grid-cols-2  lg:mt-20">
        <div className="relative w-full h-[300px]  lg:h-[450px] mt-10 lg:mt-0">
          <Image
            src={images.IMG_OUR_CLOUD_4}
            alt="cloud-1"
            fill
            className="object-contain  lg:object-cover object-center lg:object-left"
          />
        </div>
        <div className="flex flex-col gap-2 items-start pt-8 px-5 sm:px-20 ">
          <h2 className="text-[24px] sm:text-5xl font-[500] leading-[130%]  w-[100%]">
            Grounded in Microsoft Technology
          </h2>
          <p className="text-[#7D7D9D] mt-3 text-[16px] sm:text-[20px] w-[100%] sm:w-[97%]">
            Outcomes begin with the right pillar. Our foundation in Microsoft
            technologies enables us to build future-proof systems that align
            with your digital strategy.
          </p>
          <p className="text-[#7D7D9D] mt-3 text-[16px] sm:text-[20px] w-[100%] sm:w-[97%]">
            {`Whether it's cloud infrastructure, data pipelines, or intelligent
            automation, every layer we develop is designed for performance and
            resilience in the long run.`}
          </p>
        </div>
      </div>
      <div className=" mt-10 sm:mt-20 px-5 lg:px-20">
        <h1 className="text-[24px] md:text-6xl font-medium text-center">
          Brains Behind the Codes
        </h1>
        <div className="flex flex-col-reverse lg:grid sm:grid-cols-3 gap-5 mt-3 lg:mt-20">
          <div className="block lg:hidden">
            <SimpleSlider
              data={listFeature}
              renderSlide={(item) => (
                <div className="text-left flex items-start flex-col h-100">
                  <div className="relative w-full h-[300px]">
                    <Image
                      src={item.image}
                      alt="cloud-1"
                      fill
                      className="object-cover"
                    />
                  </div>{" "}
                  <h2 className="text-xl font-bold font-schibsted mt-2">
                    {item.name}
                  </h2>
                  <p className="text-[#696A9C] font-league mb-4">
                    {item.description}
                  </p>
                </div>
              )}
            />
          </div>
          <div className="lg:flex flex-col gap-3 hidden">
            <div className="relative h-[320px] lg:h-[360px] m-w-[408px] ">
              <Image
                src={images.IMG_ABOUT_PEOPLE_2}
                alt="News Cover"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-[20px] sm:text-[24px] font-semibold">
                Erik Johansson
              </span>
              <p className="text-[14px] sm:text-[16px] text-[#7D7D9D] w-[90%]">
                Co-Founder of SALT & Insignia 17 years experience in Digital
                Technology
              </p>
            </div>
          </div>
          <div className="lg:flex flex-col gap-3 hidden">
            <div className="relative h-[320px] lg:h-[360px] m-w-[408px]">
              <Image
                src={images.IMG_ABOUT_PEOPLE_1}
                alt="News Cover"
                fill
                className="object-cover object-center"
              />
            </div>
            <div>
              <span className="text-[24px] font-semibold">Emma Svensson</span>
              <p className="text-[16px] text-[#7D7D9D] w-[90%]">
                Co-Founder of SALT & Insignia 17 years experience in Digital
                Technology
              </p>
            </div>
          </div>
          <div className="text-[#7D7D9D] text-center sm:text-left flex justify-center text-[16px] md:text-[20px] sm:pl-10">
            <p className="w-[90%]">
              At the heart of every solution, there is a team that builds with
              intent. Our team of specialists, engineers, and architects work
              with precision to build AI-powered technologies that deliver real
              values.
            </p>
          </div>
        </div>
      </div>
      <ScheduleSession />
    </div>
  );
}
