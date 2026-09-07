import { Flame, ShoppingBag, Truck, UtensilsCrossed } from "lucide-react";
import { restaurant } from "@/lib/data";

const items = [
  { icon: UtensilsCrossed, label: restaurant.services[0] },
  { icon: ShoppingBag, label: restaurant.services[1] },
  { icon: Truck, label: restaurant.services[2] },
  { icon: Flame, label: "Carnes na brasa" },
];

export function TrustBar() {
  return (
    <section className="border-y border-ink/8 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-8 md:grid-cols-4 md:px-8">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 text-sm text-bark">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-brass">
              <Icon size={16} />
            </span>
            {label}
          </div>
        ))}
      </div>
    </section>
  );
}
