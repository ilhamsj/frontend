import CompaniesIndex from "@/components/companies";
import CompaniesFilter from "@/components/companies/filter";

const page = async () => {
  return (
    <div className="w-10/12 mx-auto">
      <div className="flex">
        <CompaniesFilter />
        <CompaniesIndex />;
      </div>
    </div>
  );
};

export default page;
