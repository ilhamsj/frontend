import CompaniesIndex from "@/components/companies";
import meilisearchClient from "./lib/meilisearch/client";
import { Company } from "@/interfaces/company";
import { YCOMBINATOR_INDEX } from "@/constants";

const page = async () => {
  const index = meilisearchClient.index(YCOMBINATOR_INDEX);
  const documents = await index.getDocuments<Company>();

  return <CompaniesIndex companies={documents.results} />;
};

export default page;
