"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useSearchQuery } from "@/components/companies/hooks/filter";

const items = [
  {
    id: "Marketplace",
    label: "Marketplace",
  },
  {
    id: "E-commerce",
    label: "E-commerce",
  },
] as const;

export function FilterCategory() {
  const [{ categories }, setSearchQuery] = useSearchQuery();

  const toggleCategory = (item: string) => {
    if (categories?.includes(item)) {
      setSearchQuery({ categories: categories.filter((i) => i !== item) });
    } else {
      setSearchQuery({ categories: [...(categories || []), item] });
    }
  };

  return (
    <div>
      <h3>Category</h3>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Checkbox
            id={item.id}
            checked={categories?.includes(item.id)}
            onCheckedChange={() => toggleCategory(item.id)}
          />
          <label htmlFor={item.id} className="text-sm font-normal">
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}
