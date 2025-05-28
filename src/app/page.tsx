import CompaniesIndex from "@/components/companies";
import CompaniesFilter from "@/components/companies/filter";
import CompaniesSearch from "@/components/companies/search";
import CompaniesSort from "@/components/companies/sort";

const page = async () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">YC Companies</h1>
        <div className="flex gap-4 items-center">
          <CompaniesSearch />
          <CompaniesSort />
        </div>
      </div>
      <div className="flex gap-8">
        <div className="w-1/4">
          <CompaniesFilter />
        </div>
        <div className="w-3/4">
          <CompaniesIndex />
        </div>
      </div>
    </div>
  );
};

export default page;
