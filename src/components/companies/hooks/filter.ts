import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

export const searchQueryParsers = {
  keyword: parseAsString.withDefault(""),
  categories: parseAsArrayOf(parseAsString).withDefault([]),
  locations: parseAsArrayOf(parseAsString).withDefault([]),
};

export const useSearchQuery = () => {
  return useQueryStates(searchQueryParsers, {
    clearOnDefault: false,
    urlKeys: { keyword: "q" },
  });
};
