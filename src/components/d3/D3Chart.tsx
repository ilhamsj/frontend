"use client";

import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface BarChartProps {
  data: number[];
}

const D3Chart: React.FC<BarChartProps> = ({ data }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove(); // Clear previous chart

    const width = 400;
    const height = 200;
    const barWidth = width / data.length;

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data) || 1])
      .range([height, 0]);

    svg.attr("width", width).attr("height", height);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (_, i) => i * barWidth)
      .attr("y", (d) => yScale(d))
      .attr("width", barWidth - 2)
      .attr("height", (d) => height - yScale(d))
      .attr("fill", "steelblue");
  }, [data]);

  return <svg ref={ref} />;
};

export default D3Chart;
