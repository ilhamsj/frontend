"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useSearchQuery } from "@/components/companies/hooks/filter";

const items = [
  {
    id: "Asia",
    label: "Asia",
  },
  {
    id: "Europe",
    label: "Europe",
  },
  {
    id: "America",
    label: "America",
  },
] as const;

export function FilterLocation() {
  const [{ locations }, setSearchQuery] = useSearchQuery();

  const toggleLocation = (item: string) => {
    if (locations?.includes(item)) {
      setSearchQuery({ locations: locations.filter((i) => i !== item) });
    } else {
      setSearchQuery({ locations: [...(locations || []), item] });
    }
  };

  return (
    <div>
      <h3>Location</h3>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Checkbox
            id={item.id}
            checked={locations?.includes(item.id) || false}
            onCheckedChange={() => toggleLocation(item.id)}
          />
          <label htmlFor={item.id} className="text-sm font-normal">
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}
