"use client";

import { useSearchQuery } from "@/components/companies/hooks/filter";

const CompaniesSearch = () => {
  const [searchQuery, setSearchQuery] = useSearchQuery();

  return (
    <div className="flex items-center">
      <input
        type="text"
        id="search"
        placeholder="Search companies..."
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        defaultValue={searchQuery.query}
        onChange={(e) => setSearchQuery({ query: e.target.value })}
      />
    </div>
  );
};

export default CompaniesSearch;
