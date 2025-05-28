"use client";

import React from "react";
import CompanyCard from "@/components/companies/card";
import { useInView } from "react-intersection-observer";
import { InfiniteScrolling } from "@/components/common/infinite-scrolling";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useCompanies } from "@/components/companies/hooks";
import { useSearchQuery } from "@/components/companies/hooks/filter";
import { FACET } from "@/constants/meilisearch/facets";

const CompaniesIndex = () => {
  const { ref, inView } = useInView();
  const [searchQuery] = useSearchQuery();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useCompanies({
    [FACET.BATCH]: searchQuery[FACET.BATCH] as string[],
    [FACET.INDUSTRY]: searchQuery[FACET.INDUSTRY] as string[],
    [FACET.REGIONS]: searchQuery[FACET.REGIONS] as string[],
    [FACET.STAGE]: searchQuery[FACET.STAGE] as string[],
  });

  React.useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (status === "pending") return <div>Loading</div>;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <div className="container mx-auto w-1/2">
      <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-1 xl:gap-x-8">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.hits.map((item, index) => (
              <CompanyCard key={index} company={item} />
            ))}
          </React.Fragment>
        ))}
      </div>

      <InfiniteScrolling
        ref={ref}
        isFetching={isFetching}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />

      <ReactQueryDevtools initialIsOpen />
    </div>
  );
};

export default CompaniesIndex;
