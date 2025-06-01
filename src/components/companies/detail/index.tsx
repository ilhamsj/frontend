import React from "react";
import Image from "next/image";
import { Company } from "@/interfaces/company";
import Link from "next/link";

interface Props {
  company: Company;
}

const Tag = ({ tag }: { tag: string }) => {
  return (
    <span className="border px-2 py-1 flex items-center gap-2 rounded-md">
      {tag}
    </span>
  );
};

const CompanyDetail = ({ company }: Props) => {
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
        <div className="flex gap-2 flex-wrap">
          {company.tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
          <Tag tag={company.stage} />
          <Tag tag={company.industry} />
          <Tag tag={company.allLocations} />
          <p className="text-sm text-gray-500">{company.longDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetail;
