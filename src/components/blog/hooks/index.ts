import { getPosts } from "@/api/post";
import { GET_POSTS_KEY } from "@/constants/cache";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePosts = () => {
  return useInfiniteQuery({
    queryKey: [GET_POSTS_KEY],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getPosts(pageParam),
    getNextPageParam: (response) => {
      if (response.offset === undefined) return undefined;
      return response.offset + 12;
    },
  });
};
