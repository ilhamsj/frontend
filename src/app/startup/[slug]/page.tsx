import { searchCompanies } from "@/api/company";
import CompanyCard from "@/components/companies/card";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const companies = await searchCompanies({ slug });

  if (!companies.hits.length) return notFound();

  return (
    <div className="container mx-auto py-6">
      <CompanyCard company={companies.hits[0]} />
    </div>
  );
};

export default page;
