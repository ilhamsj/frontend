"use client";

import React from "react";
import { useInView } from "react-intersection-observer";
import { InfiniteScrolling } from "@/components/common/infinite-scrolling";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePosts } from "./hooks";
import BlogCard from "./card";

const BlogIndex = () => {
  const { ref, inView } = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePosts();

  React.useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (status === "pending") return <div>Loading</div>;
  if (status === "error") return <div>{error.message}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.results.map((item, index) => (
              <BlogCard key={index} post={item} />
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

export default BlogIndex;
