"use client";

import { CategoriesDistribution } from "meilisearch";
import { FacetFilter } from "../facet";

export function FilterBatch({ items }: { items: CategoriesDistribution }) {
  return <FacetFilter items={items} facetKey="BATCH" title="Batch" />;
}
