"use client";

import React from "react";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const page = () => {
  return <MapComponent />;
};

export default page;
