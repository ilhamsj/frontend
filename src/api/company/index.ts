import meiliSearchClient from "@/lib/meilisearch/client";
import { INDEX_YCOMBINATOR } from "@/constants/meilisearch";
import { Company } from "@/interfaces/company";
import camelcaseKeys from "camelcase-keys";
import {
  GetCompaniesFilterRequest,
  GetCompaniesFilterResponse,
  SearchCompaniesRequest,
  FacetFilter,
} from "@/api/company/types";
import { SearchParams, SearchResponse } from "meilisearch";
import { FACETS_FILTER } from "@/constants/meilisearch/facets";
import { isEmpty } from "lodash";

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

/**
 * Builds filter string for Meilisearch from facet filters
 */
const buildFilterString = (facetFilters: FacetFilter): string => {
  const filters: string[] = [];

  if (!isEmpty(facetFilters.batch)) {
    filters.push(`batch = '${facetFilters.batch!.join("' OR batch = '")}' `);
  }

  if (!isEmpty(facetFilters.industry)) {
    filters.push(
      `industry = '${facetFilters.industry!.join("' OR industry = '")}' `
    );
  }

  if (!isEmpty(facetFilters.regions)) {
    filters.push(
      `regions = '${facetFilters.regions!.join("' OR regions = '")}' `
    );
  }

  if (!isEmpty(facetFilters.stage)) {
    filters.push(`stage = '${facetFilters.stage!.join("' OR stage = '")}' `);
  }

  return filters.join(" AND ");
};

export const searchCompanies = async (
  request: SearchCompaniesRequest
): Promise<SearchResponse<Company>> => {
  const query = request.query ?? "";
  const filter = buildFilterString(request);
  const sort = request.sort ? [`${request.sort}:desc`] : [];

  const searchParams: SearchParams = {
    page: request.page,
    hitsPerPage: 12,
    filter,
    sort,
    facets: FACETS_FILTER,
  };

  const data = await meiliSearchClient
    .index<Company>(INDEX_YCOMBINATOR)
    .search<Company, SearchParams>(query, searchParams);

  return camelcaseKeys(data, { deep: true });
};
