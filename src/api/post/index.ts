import { INDEX_POSTS } from "@/constants/meilisearch";
import { Post } from "@/interfaces/post";
import meiliSearchClient from "@/lib/meilisearch/client";
import camelcaseKeys from "camelcase-keys";
import { ResourceResults, SearchParams, SearchResponse } from "meilisearch";

export const getPosts = async (
  offset: number
): Promise<ResourceResults<Post[]>> => {
  const data = await meiliSearchClient
    .index<Post>(INDEX_POSTS)
    .getDocuments({ offset, limit: 12 });

  return camelcaseKeys(data, { deep: true });
};

export const searchPosts = async ({
  slug,
}: {
  slug: string;
}): Promise<SearchResponse<Post>> => {
  const filter = `slug = '${slug}'`;

  const searchParams: SearchParams = {
    hitsPerPage: 12,
    filter,
  };

  const data = await meiliSearchClient
    .index<Post>(INDEX_POSTS)
    .search<Post, SearchParams>(slug, searchParams);

  return camelcaseKeys(data, { deep: true });
};
