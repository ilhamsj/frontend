"use client";

import { useSearchQuery } from "@/components/companies/hooks/filter";
import { SortOption } from "@/api/company/types";

const CompaniesSort = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery();

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Default", value: "" },
    { label: "Launch Date", value: "launched_at" },
    { label: "Alphabetical", value: "name" },
  ];

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by
      </label>
      <select
        id="sort"
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        defaultValue={searchQuery.sort}
        onChange={(e) => {
          setSearchQuery({
            sort: e.target.value as SortOption,
          });
        }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CompaniesSort;
