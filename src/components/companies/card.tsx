import React from "react";
import { Company } from "@/interfaces/company";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div>
      <h3 className="text-2xl font-bold">{company.name}</h3>
      <p className="text-sm text-gray-500">{company.website}</p>
      <p className="text-sm text-gray-500 font-bold">
        {company.tags.join(", ")}
      </p>
    </div>
  );
};

export default CompanyCard;
