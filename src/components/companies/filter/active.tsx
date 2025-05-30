"use client";

import React from "react";
import { useSearchQuery } from "../hooks/filter";
import { XIcon } from "lucide-react";

const FilterActive = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery();

  // Get keys of filters that have values
  const activeFilterKeys = Object.keys(searchQuery).filter(
    (key) => searchQuery[key].length > 0
  );

  return (
    <div className="flex gap-2 flex-wrap">
      {activeFilterKeys.map((key, index) => {
        const value = searchQuery[key];
        return (
          <div
            key={index}
            className="border px-2 py-1 flex items-center gap-2 rounded-md"
          >
            <button
              className="cursor-pointer"
              type="button"
              onClick={() => {
                setSearchQuery({
                  ...searchQuery,
                  [key]: [],
                });
              }}
              aria-label={`Remove ${key} filter`}
            >
              <XIcon className="w-4 h-4" />
            </button>
            <span className="font-medium">{key}</span>
            <span className="text-sm">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default FilterActive;
