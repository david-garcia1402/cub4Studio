import { restaurant } from "@/lib/restaurant";

const stats = [
  { value: restaurant.rating.toString().replace(".", ","), label: "Nota no Google" },
  { value: restaurant.reviewCount.toLocaleString("pt-BR"), label: "Avaliações" },
  { value: "19h", label: "Abre terça" },
  { value: "POA", label: "Cidade Baixa" },
];

export function StatsStrip() {
  return (
    <section className="border-y border-gold/15 bg-ink-soft">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="px-6 py-10 text-center">
            <p className="font-display text-4xl text-gold md:text-5xl">
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
