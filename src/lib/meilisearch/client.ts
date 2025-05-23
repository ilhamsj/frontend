import { MeiliSearch } from "meilisearch";

const hostUrl =
  process.env.MEILISEARCH_HOST ||
  process.env.NEXT_PUBLIC_MEILISEARCH_HOST ||
  "";

const apiKey =
  process.env.MEILISEARCH_API_KEY ||
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY ||
  "";

const meilisearchClient = new MeiliSearch({
  host: hostUrl,
  apiKey: apiKey,
});

export default meilisearchClient;
