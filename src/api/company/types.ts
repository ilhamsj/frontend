import { Company } from "@/interfaces/company";
import { Hit, Pagination, ResourceResults } from "meilisearch";

export type GetCompaniesFilterRequest = Pagination & {
  location?: string;
  category?: string;
};
export type GetCompaniesFilterResponse = ResourceResults<Company[]>;
export type GetCompaniesHitsResponse = Hit<Company[]>;

export type SearchCompaniesRequest = {
  page: number;
  query?: string;
};
