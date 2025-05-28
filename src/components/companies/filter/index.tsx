"use client";

import React from "react";
import { useSearchQuery } from "@/components/companies/hooks/filter";
import { useCompanies } from "@/components/companies/hooks";
import { get } from "lodash";
import { FACET } from "@/constants/meilisearch/facets";
import { FacetFilter } from "@/components/companies/filter/facet";
import { CategoriesDistribution } from "meilisearch";
import { SortOption } from "@/api/company/types";

const CompaniesFilter = () => {
  const [searchQuery] = useSearchQuery();

  const { status, data, error } = useCompanies({
    sort: searchQuery.sort as SortOption,
    query: searchQuery.query as string,
    [FACET.BATCH]: searchQuery[FACET.BATCH] as string[],
    [FACET.INDUSTRY]: searchQuery[FACET.INDUSTRY] as string[],
    [FACET.REGIONS]: searchQuery[FACET.REGIONS] as string[],
    [FACET.STAGE]: searchQuery[FACET.STAGE] as string[],
  });

  if (status === "pending") return <div>Loading</div>;
  if (status === "error") return <div>{error.message}</div>;

  const facetDistribution = get(data, "pages[0].facetDistribution", {});

  // Get distributions for each facet
  const batchDistribution = get(
    facetDistribution,
    FACET.BATCH,
    {}
  ) as CategoriesDistribution;

  const industryDistribution = get(
    facetDistribution,
    FACET.INDUSTRY,
    {}
  ) as CategoriesDistribution;

  const regionsDistribution = get(
    facetDistribution,
    FACET.REGIONS,
    {}
  ) as CategoriesDistribution;

  const stageDistribution = get(
    facetDistribution,
    FACET.STAGE,
    {}
  ) as CategoriesDistribution;

  return (
    <div className="flex flex-col gap-4">
      <FacetFilter items={stageDistribution} facetKey="STAGE" title="Stage" />

      <FacetFilter
        items={batchDistribution}
        facetKey="BATCH"
        title="Batch"
        maxItems={10}
      />

      <FacetFilter
        items={industryDistribution}
        facetKey="INDUSTRY"
        title="Industry"
        maxItems={10}
      />

      <FacetFilter
        items={regionsDistribution}
        facetKey="REGIONS"
        title="Regions"
        maxItems={10}
      />
    </div>
  );
};

export default CompaniesFilter;
