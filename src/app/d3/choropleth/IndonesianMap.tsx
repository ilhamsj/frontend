"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { geoPath, geoMercator } from "d3-geo";
import type { FeatureCollection, Feature } from "geojson";
import worldData from "./indonesia-province.json";

// Define proper types for our GeoJSON data
interface ProvinceProperties {
  name: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface ProvinceFeature extends Feature {
  properties: ProvinceProperties;
}

interface IndonesiaGeoJSON extends FeatureCollection {
  features: ProvinceFeature[];
}

// This is our known data with correct Indonesian province names
const startupTotals: Record<string, number> = {
  Aceh: 10,
  Bali: 25,
  Banten: 15,
  Bengkulu: 5,
  "Central Java": 40,
  "Central Kalimantan": 2,
  "Central Sulawesi": 3,
  "East Java": 60,
  "East Kalimantan": 8,
  "East Nusa Tenggara": 1,
  Gorontalo: 1,
  Jakarta: 120,
  Jambi: 4,
  Lampung: 7,
  Maluku: 1,
  "North Kalimantan": 1,
  "North Maluku": 1,
  "North Sulawesi": 3,
  "North Sumatra": 20,
  Papua: 1,
  Riau: 9,
  "Riau Islands": 6,
  "South Kalimantan": 7,
  "South Sulawesi": 15,
  "South Sumatra": 10,
  "Southeast Sulawesi": 3,
  "West Java": 80,
  "West Kalimantan": 4,
  "West Nusa Tenggara": 2,
  "West Papua": 1,
  "West Sulawesi": 1,
  "West Sumatra": 12,
  Yogyakarta: 30,
};

// Create a mapping between GeoJSON province names and our data keys
// This will be populated during the first render
const provinceNameMapping: Record<string, string> = {};

const IndonesianMap = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [mappingReady, setMappingReady] = useState(false);

  // First render - create a mapping between GeoJSON province names and our data
  useEffect(() => {
    if (!mappingReady) {
      const typedWorldData = worldData as IndonesiaGeoJSON;

      // Validate the GeoJSON data
      if (
        !typedWorldData ||
        !typedWorldData.features ||
        !Array.isArray(typedWorldData.features)
      ) {
        console.error("Invalid GeoJSON data:", typedWorldData);
        setMappingReady(true); // Set to true to avoid infinite loop
        return;
      }

      // Log all province names from GeoJSON for debugging
      console.log("GeoJSON Province Names:");
      const geoJsonProvinceNames = typedWorldData.features
        .map((f) => f.properties?.name)
        .filter(Boolean);
      console.log(geoJsonProvinceNames);

      // Log our keys for comparison
      console.log("Our Data Keys:");
      console.log(Object.keys(startupTotals));

      // Try to create a mapping between GeoJSON names and our data keys
      // Here we're using a simple approach - if needed this can be updated with
      // more sophisticated name matching
      typedWorldData.features.forEach((feature) => {
        const geoJsonName = feature.properties?.name;

        // Skip if name is undefined
        if (!geoJsonName) {
          console.warn("Found a province with undefined name in GeoJSON");
          return;
        }

        // Check for exact match
        if (startupTotals[geoJsonName] !== undefined) {
          provinceNameMapping[geoJsonName] = geoJsonName;
          return;
        }

        // Try some common transformations
        // This is where you'll need to update with specific mappings based on your data

        // Example: Check if there's a case-insensitive match
        const matchingKey = Object.keys(startupTotals).find(
          (key) => key.toLowerCase() === geoJsonName.toLowerCase()
        );

        if (matchingKey) {
          provinceNameMapping[geoJsonName] = matchingKey;
          return;
        }

        // Add any specific mappings you discover
        // For example, if GeoJSON has "DKI Jakarta" but our data has "Jakarta":
        if (geoJsonName === "DKI Jakarta") {
          provinceNameMapping[geoJsonName] = "Jakarta";
          return;
        }

        // You'll need to add more mappings here based on the actual data
        console.warn(`No mapping found for province: ${geoJsonName}`);
      });

      console.log("Province mapping:", provinceNameMapping);
      setMappingReady(true);
    }
  }, [mappingReady]);

  // Get startup count for a province using our mapping
  const getStartupCount = (geoJsonName: string): number => {
    const mappedName = provinceNameMapping[geoJsonName];
    return mappedName ? startupTotals[mappedName] ?? 0 : 0;
  };

  // Main effect to render the map - only runs after mapping is ready
  useEffect(() => {
    if (!svgRef.current || !tooltipRef.current || !mappingReady) return;

    const width = 800;
    const height = 500;
    const typedWorldData = worldData as IndonesiaGeoJSON;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Tooltip div
    const tooltip = d3.select(tooltipRef.current);

    // Initial projection for bounds calc
    let projection = geoMercator().scale(1).translate([0, 0]);

    const pathGenerator = geoPath().projection(projection);

    // Calculate bounds
    const bounds = pathGenerator.bounds(typedWorldData);
    const [[x0, y0], [x1, y1]] = bounds;
    const geoWidth = x1 - x0;
    const geoHeight = y1 - y0;

    // Calculate scale and translate
    const scale = 0.95 * Math.min(width / geoWidth, height / geoHeight);
    const translateX = width / 2 - scale * (x0 + geoWidth / 2);
    const translateY = height / 2 - scale * (y0 + geoHeight / 2);

    // Update projection with new scale and translate
    projection = geoMercator().scale(scale).translate([translateX, translateY]);

    const finalPathGenerator = geoPath().projection(projection);

    // Setup color scale
    const values = Object.values(startupTotals);
    const colorScale = d3
      .scaleSequential()
      .domain([Math.min(...values), Math.max(...values)])
      .interpolator(d3.interpolateBlues);

    // Draw map paths
    svg
      .selectAll("path")
      .data(typedWorldData.features)
      .enter()
      .append("path")
      .attr("d", (d) => finalPathGenerator(d))
      .attr("fill", (d) => {
        const name = d.properties?.name;
        if (!name) return "#eee";
        const total = getStartupCount(name);
        return total ? colorScale(total) : "#eee";
      })
      .style("stroke", "#fff")
      .style("stroke-width", 0.5)
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("fill", "#ff7f0e");

        const name = d.properties?.name;
        if (!name) {
          tooltip.style("visibility", "hidden");
          return;
        }

        tooltip
          .style("visibility", "visible")
          .text(`${name}: ${getStartupCount(name)} startups`);
      })
      .on("mousemove", (event) => {
        tooltip
          .style("top", event.pageY + 10 + "px")
          .style("left", event.pageX + 10 + "px");
      })
      .on("mouseleave", function (event, d) {
        const name = d.properties?.name;
        if (!name) {
          tooltip.style("visibility", "hidden");
          return;
        }

        const total = getStartupCount(name);
        d3.select(this).attr("fill", total ? colorScale(total) : "#eee");

        tooltip.style("visibility", "hidden");
      });
  }, [mappingReady]);

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={800}
        height={500}
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid meet"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          pointerEvents: "none",
          backgroundColor: "rgba(0,0,0,0.7)",
          color: "white",
          padding: "4px 8px",
          borderRadius: 4,
          fontSize: 12,
          visibility: "hidden",
          userSelect: "none",
          zIndex: 10,
        }}
      />
    </div>
  );
};

export default IndonesianMap;
