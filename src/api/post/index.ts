import { INDEX_POSTS } from "@/constants/meilisearch";
import { Post } from "@/interfaces/post";
import meiliSearchClient from "@/lib/meilisearch/client";
import camelcaseKeys from "camelcase-keys";
import { ResourceResults } from "meilisearch";

export const getPosts = async (
  offset: number
): Promise<ResourceResults<Post[]>> => {
  const data = await meiliSearchClient
    .index<Post>(INDEX_POSTS)
    .getDocuments({ offset, limit: 12 });

  return camelcaseKeys(data, { deep: true });
};
