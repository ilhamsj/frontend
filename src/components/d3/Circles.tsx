"use client";

import React, { useEffect, useRef, useState } from "react";
import { generateDataset } from "./common";
import * as d3 from "d3";

export const Circles = () => {
  const [dataset, setDataset] = useState(generateDataset());

  const ref = useRef(null);

  useEffect(() => {
    const svgElement = d3.select(ref.current);
    svgElement
      .selectAll("circle")
      .data(dataset)
      .join("circle")
      .attr("cx", (d) => d[0])
      .attr("cy", (d) => d[1])
      .attr("r", 3);
  }, [dataset]);

  setInterval(() => {
    const newDataset = generateDataset();
    setDataset(newDataset);
  }, 2000);

  return <svg ref={ref}></svg>;
};
