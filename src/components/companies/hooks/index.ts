import { searchCompanies } from "@/api/company";
import { FacetFilter } from "@/api/company/types";
import { GET_COMPANIES_KEY } from "@/constants/cache";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useCompanies = (filters?: FacetFilter) => {
  return useInfiniteQuery({
    queryKey: [GET_COMPANIES_KEY, filters],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      searchCompanies({
        page: pageParam,
        hitsPerPage: 12,
        ...filters,
      }),
    getNextPageParam: (response) => {
      if (response.page === undefined) return undefined;
      if (response.page === response.totalPages) return undefined;
      return response.page + 1;
    },
  });
};
