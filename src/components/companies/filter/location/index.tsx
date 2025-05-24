import { Checkbox } from "@/components/ui/checkbox";

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
  return (
    <div>
      <h3>Location</h3>
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
