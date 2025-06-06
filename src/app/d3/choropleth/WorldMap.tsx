"use client";

import * as d3 from "d3";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { useRef, useEffect } from "react";
import worldData from "./world.json";

const WorldMap = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 400;
    const height = 300;

    const projection = geoNaturalEarth1()
      .scale(width / 1.3 / Math.PI)
      .translate([width / 2, height / 2]);

    const pathGenerator = geoPath().projection(projection);

    // ✅ Use worldData directly — no d3.json() needed!
    svg
      .selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", pathGenerator as any)
      .style("stroke", "#fff");
  }, []);

  //   return <svg ref={svgRef} width={400} height={300} />;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto" }}
    />
  );
};

export default WorldMap;
