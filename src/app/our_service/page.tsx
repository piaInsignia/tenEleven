"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import OurServiceAi from "./component/service_ai";
import OurServiceCloud from "./component/service_cloud";
import OurServiceData from "./component/service_data";

export default function OurService() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";

  return (
    <React.Fragment>
      {keyword === "ai" && <OurServiceAi />}
      {keyword === "cloud" && <OurServiceCloud />}
      {keyword === "data" && <OurServiceData />}
    </React.Fragment>
  );
}
