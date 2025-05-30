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
      <div
        style={{ width: "100px", height: "100px" }}
        className="flex items-center justify-center flex-shrink-0"
      >
        <Image
          src={company.smallLogoThumbUrl}
          alt={company.name}
          width={80}
          height={80}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Link href={`/startup/${company.slug}`}>
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
