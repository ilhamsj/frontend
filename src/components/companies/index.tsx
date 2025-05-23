import React from "react";
import CompanyCard from "./card";
import { Company } from "@/interfaces/company";

interface CompaniesIndexProps {
  companies: Company[];
}

const CompaniesIndex = ({ companies }: CompaniesIndexProps) => {
  return (
    <div className="container mx-auto w-1/2">
      <div className="grid grid-cols-3 gap-4">
        {companies.map((company) => (
          <CompanyCard key={company.slug} company={company} />
        ))}
      </div>
    </div>
  );
};

export default CompaniesIndex;
