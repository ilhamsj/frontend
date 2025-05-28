import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";
import { FACET } from "@/constants/meilisearch/facets";

export const searchQueryParsers = {
  keyword: parseAsString.withDefault(""),
  [FACET.INDUSTRY]: parseAsArrayOf(parseAsString).withDefault([]),
  [FACET.REGIONS]: parseAsArrayOf(parseAsString).withDefault([]),
  [FACET.BATCH]: parseAsArrayOf(parseAsString).withDefault([]),
  [FACET.STAGE]: parseAsArrayOf(parseAsString).withDefault([]),
};

export const useSearchQuery = () => {
  return useQueryStates(searchQueryParsers, {
    clearOnDefault: false,
    urlKeys: { keyword: "q" },
  });
};
