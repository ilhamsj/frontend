import { Company } from "@/interfaces/company";
import { Hit, Pagination, ResourceResults } from "meilisearch";

export type GetCompaniesFilterRequest = Pagination & {
  location?: string;
  category?: string;
};

export type SearchCompaniesRequest = {
  page?: number;
  hitsPerPage?: number;
  query?: string;
  sort?: SortOption;
} & FacetFilter;

export type GetCompaniesFilterResponse = ResourceResults<Company[]>;
export type GetCompaniesHitsResponse = Hit<Company[]>;

export type SortOption =
  | "launched_at:desc"
  | "launched_at:asc"
  | "name:asc"
  | "name:desc"
  | "";

export type FacetFilter = {
  batch?: string[];
  industry?: string[];
  regions?: string[];
  stage?: string[];
  slug?: string;
};
