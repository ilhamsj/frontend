import { Company } from "@/interfaces/company";
import { Pagination, ResourceResults } from "meilisearch";

export type GetCompaniesFilterRequest = Pagination;
export type GetCompaniesFilterResponse = ResourceResults<Company[]>;
