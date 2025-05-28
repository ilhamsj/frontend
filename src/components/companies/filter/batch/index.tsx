"use client";

import { CategoriesDistribution } from "meilisearch";
import { FacetFilter } from "@/components/companies/filter/facet";

export function FilterBatch({ items }: { items: CategoriesDistribution }) {
  return <FacetFilter items={items} facetKey="BATCH" title="Batch" />;
}
