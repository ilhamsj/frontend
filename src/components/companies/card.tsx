import React from "react";
import Image from "next/image";
import { Company } from "@/interfaces/company";
import Link from "next/link";

interface CompanyCardProps {
  company: Company;
}

const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <div className="flex gap-4 items-start">
      <Image
        src={company.smallLogoThumbUrl}
        alt={company.name}
        width={100}
        height={100}
        className="self-stretch object-contain w-auto"
      />

      <div className="flex flex-col gap-2">
        <Link href={company.website} target="_blank">
          <h3 className="text-2xl font-bold">{company.name}</h3>
        </Link>
        <p className="text-sm text-gray-500">{company.oneLiner}</p>
        <p className="text-sm text-gray-500 font-bold">
          {company.tags.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default CompanyCard;
