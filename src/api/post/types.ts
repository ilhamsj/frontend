import { Pagination } from "meilisearch";

export type GetPostsFilterRequest = Pagination & {
  slug?: string;
};
