import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

export const searchQueryParsers = {
  keyword: parseAsString,
  categories: parseAsArrayOf(parseAsString),
  locations: parseAsArrayOf(parseAsString),
};

export const useSearchQuery = () => {
  return useQueryStates(searchQueryParsers, {
    clearOnDefault: false,
    urlKeys: { keyword: "q" },
  });
};
