import React from "react";
import Image from "next/image";
import { Company } from "@/interfaces/company";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div>
      <Image
        src={company.small_logo_thumb_url}
        alt={company.name}
        width={100}
        height={100}
      />
      <h3 className="text-2xl font-bold">{company.name}</h3>
      <p className="text-sm text-gray-500">{company.website}</p>
      <p className="text-sm text-gray-500 font-bold">
        {company.tags.join(", ")}
      </p>
    </div>
  );
};

export default CompanyCard;
