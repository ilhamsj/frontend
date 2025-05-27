import React from "react";
import { FilterLocation } from "@/components/companies/filter/location";
import { FilterCategory } from "@/components/companies/filter/category";

const CompaniesFilter = () => {
  return (
    <div className="flex flex-col gap-4">
      <FilterCategory />
      <FilterLocation />
    </div>
  );
};

export default CompaniesFilter;
