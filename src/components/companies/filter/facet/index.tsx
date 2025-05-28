"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useSearchQuery } from "@/components/companies/hooks/filter";
import { CategoriesDistribution } from "meilisearch";
import { FACET } from "@/constants/meilisearch/facets";

interface FacetFilterProps {
  items: CategoriesDistribution;
  facetKey: keyof typeof FACET;
  title: string;
  maxItems?: number;
}

export function FacetFilter({
  items,
  facetKey,
  title,
  maxItems = Infinity,
}: FacetFilterProps) {
  const [searchQuery, setSearchQuery] = useSearchQuery();
  const facetValue = searchQuery[FACET[facetKey]] as string[];

  const toggleFacet = (item: string) => {
    if (facetValue?.includes(item)) {
      setSearchQuery({
        [FACET[facetKey]]: facetValue.filter((i: string) => i !== item),
      });
    } else {
      setSearchQuery({
        [FACET[facetKey]]: [...(facetValue || []), item],
      });
    }
  };

  // Sort items by count (descending)
  const sorted = Object.entries(items)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxItems);

  const sortedObject = Object.fromEntries(sorted);

  if (Object.keys(sortedObject).length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">{title}</h3>
      <div className="space-y-1">
        {Object.entries(sortedObject).map(([item, count]) => (
          <div key={item} className="flex items-center gap-2">
            <Checkbox
              id={`${facetKey}-${item}`}
              checked={facetValue?.includes(item)}
              onCheckedChange={() => toggleFacet(item)}
            />
            <label
              htmlFor={`${facetKey}-${item}`}
              className="text-sm font-normal"
            >
              {item} ({count})
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
