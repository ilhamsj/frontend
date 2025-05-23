import { getCompanies } from "@/api/company";
import { GET_COMPANIES_KEY } from "@/constants/cache";
import { useInfiniteQuery } from "@tanstack/react-query";

const LIMIT = 12;

export const useCompanies = () => {
  return useInfiniteQuery({
    queryKey: [GET_COMPANIES_KEY],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) =>
      getCompanies({ offset: pageParam, limit: LIMIT }),
    getNextPageParam: ({ offset = 0, total, limit = LIMIT }) => {
      const nextOffset = offset + limit;
      return nextOffset < total ? nextOffset : undefined;
    },
  });
};
