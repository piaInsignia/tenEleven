"use client";

import { images } from "@/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ScheduleSession from "../component/ScheduleSession";
import { MoveDown } from "lucide-react";

export default function StudyCase() {
  const navigate = useRouter();

  return (
    <div className="relative min-h-screen bg-white pt-40 font-inter">
      <div className="relative bg-[url('/assets/bg_studycase.png')] bg-no-repeat w-[100%] h-[100%]  bg-right">
        {/* <div className="absolute top-0 right-0 w-5/5 h-50 bg-gradient-to-t from-white/60 to-transparent"></div> */}

        <div className="text-black h-170 flex flex-col gap-5 text-center items-center px-30 ">
          <h1 className="sm:flex sm:flex-col font-[500] text-6xl">
            <span className="inline">Step Into the Flow of Our Full </span>
            <span className="inline">Cycle Execution</span>
          </h1>

          <p className="tracking-[.01em] w-[55%] text-[18px] font-[300]">
            We engineer seamlessly from architecture to execution, ensuring
            enterprises scale with confidence. Discover how our Microsoft
            technology delivers measurable outcomes at every stage.
          </p>
        </div>
      </div>
      {/* home section 2 */}
      <div className="flex flex-col gap-20 px-20">
        <div className="grid grid-cols-2">
          <h2 className="text-5xl font-medium">Precision in One Flow</h2>
          <p className="text-[20px] text-[#7D7D9D] leading-[130%] w-[80%]">
            Everything works in sync, because your transformation deserves a
            flow that delivers value.
          </p>
        </div>
        <div className="relative h-[162px] sm:h-[330px] w-full ">
          <Image
            src={images.IMG_PRECISION_FLOW}
            alt="News Cover"
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-5 items-center">
          <p className="w-[64.5%] text-center">
            We examine your needs by aligning all the process into a unify
            workflow. We capture customer data across channels, processed
            through real-time pipelines, and enriched within a Microsoft-powered
            CDP to build a 360° customer view. These insights are then activated
            through smart campaign management for personalized outreach.
          </p>
          <Link
            className="text-[#F05125] flex items-center gap-2 text-[16px] font-medium cursor-pointer mb-10 sm:mb-0"
            href="/"
          >
            Explore how we bring solutions to life{" "}
            <MoveDown color="#F05125" height={15} />
          </Link>
        </div>
      </div>
      <div className="px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-8 items-start justify-center ">
            <p className="w-[100px] border-1"></p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[80%] font-medium leading-[130%]">
              Customer Segmentation scale
            </h2>
            <p className="text-[#7D7D9D] w-full lg:w-[86%] text-[16px] sm:text-[18px]">
              Understanding your customers starts with the right segmentation.
              We capture key behavioral and contextual data, such as purchasing
              behavior, journey stage, engagement level, and more into one
              unified view. This segmentation lays the groundwork for
              personalized strategies that improve targeting and drive higher
              ROI.
            </p>
          </div>
          <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[450px] ">
            <Image
              src={images.IMG_STUDY_CASE_2}
              alt="cloud-1"
              fill
              className="object-contain object-center" // atau contain
            />
          </div>
        </div>
      </div>

      <div className="px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[450px] ">
            <Image
              src={images.IMG_STUDY_CASE_1}
              alt="cloud-1"
              fill
              className="object-contain object-center" // atau contain
            />
          </div>
          <div className="flex flex-col gap-8 items-start justify-center ">
            <p className="w-[100px] border-1"></p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[80%] font-medium leading-[130%]">
              Campaign Automation
            </h2>
            <p className="text-[#7D7D9D] w-full lg:w-[86%] text-[16px] sm:text-[18px]">
              AI takes over to automate what matters most. It assists in
              crafting compelling subject lines, sets personalized performance
              benchmarks, and determines the optimal time to send. Thus, every
              message lands with maximum impact.
            </p>
          </div>
        </div>
      </div>

      <div className="px-20 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col gap-8 items-start justify-center ">
            <p className="w-[100px] border-1"></p>
            <h2 className="text-[20px] sm:text-4xl w-full lg:w-[80%] font-medium leading-[130%]">
              Data Reporting{" "}
            </h2>
            <p className="text-[#7D7D9D] w-full lg:w-[86%] text-[16px] sm:text-[18px]">
              The data is turn into a two-way conversation. Our AI-powered
              chatbot allows you to ask questions, explore data, and evaluate
              campaign performance in real time. You can simply chat to uncover
              key findings, spot opportunities, and drive faster decisions with
              data that talks back.
            </p>
          </div>
          <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[450px] ">
            <Image
              src={images.IMG_STUDY_CASE_3}
              alt="cloud-1"
              fill
              className="object-contain object-center" // atau contain
            />
          </div>
        </div>
      </div>
      {/* section 4 */}
      <div>
        <h3 className="text-3xl font-medium text-center">
          What You’ll Discover from Data Reporting
        </h3>
        <div className=" grid grid-cols-[repeat(auto-fit,_minmax(320px,_1fr))] gap-4 px-25 pt-30">
          <div
            className="group relative rounded-2xl w-full max-w-sm pb-10"
            onClick={() => navigate.push("/our_service?keyword=data")}
          >
            <div className="relative w-full h-[160px]">
              {/* <div className="absolute top-4 right-4 ">
                <Image
                  src={images.IMG_AI_TOGGLE}
                  alt="Example"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div> */}

              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-45 h-45">
                <Image
                  src={images.IMG_AI_DATA}
                  alt="Example"
                  width={180}
                  height={180}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className=" flex flex-col items-center gap-5 ">
              <h4 className="text-3xl text-center font-medium w-[90%]">
                Intelligent Chatbot Virtual Assistants
              </h4>
              <p className="font-[300] text-[#7D7D9D] text-center text-[19px] w-[350px]">
                Put your customer service on autopilot with intelligent chatbots
                that handle queries and qualify leads. Keeping your business
                available around the clock.{" "}
              </p>
            </div>
          </div>

          <div
            className=" relative rounded-2xl  w-full max-w-sm pb-10"
            onClick={() => navigate.push("/our_service?keyword=ai")}
          >
            <div className="relative w-full h-[160px]">
              {/* <div className="absolute top-4 right-4 ">
                <Image
                  src={images.IMG_AI_TOGGLE}
                  alt="Example"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div> */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-45 h-45">
                <Image
                  src={images.IMG_AI_ICON}
                  alt="Example"
                  width={180}
                  height={180}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className="group flex flex-col items-center gap-5">
              <h4 className="text-3xl text-center font-medium w-[90%]">
                AI Segmentation & Campaign Workflow
              </h4>
              <p className="font-[300] text-[#7D7D9D] text-center text-[19px] w-[340px]">
                Designed to reach right people with personalized messages across
                channels, it lets your marketing moves faster and go further.
              </p>
            </div>
          </div>
          <div
            className=" relative rounded-2xl w-full max-w-sm pb-10"
            onClick={() => navigate.push("/our_service?keyword=cloud")}
          >
            <div className="relative w-full h-[160px]">
              {/* <div className="absolute top-4 right-4 ">
                <Image
                  src={images.IMG_AI_TOGGLE}
                  alt="Example"
                  width={25}
                  height={25}
                  className="object-contain"
                />
              </div> */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-45 h-45">
                <Image
                  src={images.IMG_AI_CLOUD}
                  alt="Example"
                  width={180}
                  height={180}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
            <div className="group flex flex-col items-center gap-5 ">
              <h4 className="text-3xl text-center font-medium w-[90%]">
                AI-Enhanced Data Insights
              </h4>
              <p className="font-[300] text-[#7D7D9D] text-center text-[19px] w-[340px] ">
                Instead of navigating static dashboards, you’ll receive
                actionable narratives across three layers: descriptive,
                diagnostic, and predictive. Sharpen your decision-making with AI
                curated insights.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[400px] bg-[linear-gradient(to_right,_#F05125,_#C4330B)] grid grid-cols-5 gap-10 mt-10 ">
        <div className="relative col-span-2">
          {" "}
          <div className="absolute top-[-105] object-center w-full h-[600px]">
            <Image
              src={images.IMG_STUDY_CASE_4}
              alt="Example"
              fill
              className="object-contain w-full h-full"
            />
          </div>
        </div>
        <div className="col-span-3 flex flex-col text-white gap-5 py-10">
          <h2 className="text-5xl font-semibold">Understand the Way We Work</h2>
          <p className="text-[24px] w-[80%] font-[400]">
            Get the full story in our whitepaper, including execution flow,
            challenges solved, and the results that followed. Find out how
            strategy and technology come together to accelerate your business
            growth.
          </p>
          <Link
            href="/contact"
            className="text-[#F05125]  bg-white px-6 py-3 rounded-full w-fit"
          >
            Download Whitepaper
          </Link>
        </div>
      </div>

      <ScheduleSession />
    </div>
  );
}
