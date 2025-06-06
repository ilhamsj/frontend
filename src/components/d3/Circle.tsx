"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Circle = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement.append("circle").attr("cx", 150).attr("cy", 70).attr("r", 50);
  }, []);

  return <svg ref={ref}></svg>;
};

export default Circle;
