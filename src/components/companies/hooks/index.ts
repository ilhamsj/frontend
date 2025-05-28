import { searchCompanies } from "@/api/company";
import { GET_COMPANIES_KEY } from "@/constants/cache";
import { useInfiniteQuery } from "@tanstack/react-query";
import { searchQueryParsers } from "@/components/companies/hooks/filter";
import { Values } from "nuqs";

type Filters = Values<typeof searchQueryParsers>;

export const useCompanies = (filters?: Filters) => {
  return useInfiniteQuery({
    queryKey: [GET_COMPANIES_KEY],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => searchCompanies({ page: pageParam }),
    getNextPageParam: (response) => {
      if (response.page === undefined) return undefined;
      if (response.page === response.totalPages) return undefined;
      return response.page + 1;
    },
  });
};
