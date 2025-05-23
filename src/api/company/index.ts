import meiliSearchClient from "@/lib/meilisearch/client";
import { INDEX_YCOMBINATOR } from "@/constants/meilisearch";
import { Company } from "@/interfaces/company";
import camelcaseKeys from "camelcase-keys";
import { GetCompaniesFilterRequest, GetCompaniesFilterResponse } from "./types";

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
