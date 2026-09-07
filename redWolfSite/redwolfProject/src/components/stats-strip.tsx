import { brand } from "@/lib/brand";

const stats = [
  { value: brand.rating.toString().replace(".", ","), label: "Nota no Google" },
  { value: brand.followers, label: "No Instagram" },
  { value: "48h", label: "Fermentação" },
  { value: "2", label: "Unidades" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-ember/15 bg-ink-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-10 text-center">
            <p className="font-display text-4xl text-ember-bright md:text-5xl">
              {stat.value}
            </p>
            <p className="mt-2 text-[11px] tracking-[0.22em] text-paper-dim uppercase">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
