"use client";

import Link from "next/link";

export default function ScheduleSession() {
  return (
    <div className="relative w-full h-115 md:h-180 lg:h-screen overflow-hidden ">
      {/* Background + overlay layer */}
      <div className="absolute inset-0 z-0">
        <div className="w-full  h-full bg-contain lg:bg-cover bg-[url('/assets/bg_schedule_session.png')] bg-bottom bg-no-repeat"></div>
        {/* <div className="absolute top-0 right-0 w-full lg:h-180 bg-gradient-to-b from-white/90 to-transparent"></div> */}
      </div>

      {/* Content layer */}
      <div className="relative z-20 flex flex-col justify-center text-center items-center gap-3 sm:gap-8 pt-20 px-4 sm:px-0">
        <h1 className="flex flex-col text-3xl sm:text-6xl items-center font-medium">
          <span>Launch Your Next </span>
          <span>Breakthrough</span>
        </h1>
        <p className="text-[16px] sm:text-[19px] w-[90%] sm:w-full font-[300] text-[#7D7D9D]">
          Connect with 1011 specialists, start solving real obstacles with
          scalable tech.
        </p>
        <Link
          href="/schedule"
          className="bg-[#F05125] hover:bg-orange-600 sm:w-fit w-full text-white px-6 py-3 rounded-full"
        >
          Schedule a Session
        </Link>
      </div>
    </div>
  );
}
