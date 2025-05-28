import meiliSearchClient from "@/lib/meilisearch/client";
import { INDEX_YCOMBINATOR } from "@/constants/meilisearch";
import { Company } from "@/interfaces/company";
import camelcaseKeys from "camelcase-keys";
import {
  GetCompaniesFilterRequest,
  GetCompaniesFilterResponse,
  SearchCompaniesRequest,
} from "@/api/company/types";
import { SearchParams, SearchResponse } from "meilisearch";

export const getCompanies = async (
  filter: GetCompaniesFilterRequest
): Promise<GetCompaniesFilterResponse> => {
  const params = {
    ...filter,
  };

  const data = await meiliSearchClient
    .index<Company>(INDEX_YCOMBINATOR)
    .getDocuments({ ...params });

  return camelcaseKeys(data, { deep: true });
};

export const searchCompanies = async (
  request: SearchCompaniesRequest
): Promise<SearchResponse<Company>> => {
  const query = request.query ?? "";

  const searchParams: SearchParams = {
    page: request.page,
    hitsPerPage: 12,
    filter: ["tags = 'Marketplace' OR tags = 'SaaS'"],
    sort: ["launched_at:desc"],
  };

  const data = await meiliSearchClient
    .index<Company>(INDEX_YCOMBINATOR)
    .search<Company, SearchParams>(query, searchParams);

  return camelcaseKeys(data, { deep: true });
};
