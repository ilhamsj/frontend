import { Checkbox } from "@/components/ui/checkbox";

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
  return (
    <div>
      <h3>Category</h3>
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <Checkbox id={item.id} />
          <label htmlFor={item.id} className="text-sm font-normal">
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}
