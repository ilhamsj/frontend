import { Company } from "@/interfaces/company";
import { Pagination } from "meilisearch";

export type GetCompaniesFilterRequest = Pagination;
export type GetCompaniesFilterResponse = Pagination & {
  results: Company[];
};
