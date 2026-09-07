import { site } from "@/lib/site";

const items = [
  { label: "Nota Google", value: `${site.rating} ★` },
  { label: "Avaliações", value: site.reviews.toLocaleString("pt-BR") },
  { label: "Por pessoa", value: site.priceRange },
  { label: "Horário", value: "19h–00h" },
];

export function TrustBar() {
  return (
    <section className="border-y border-paper/10 bg-ink">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
        {items.map((item) => (
          <div key={item.label} className="px-5 py-7 text-center md:px-8">
            <p className="font-display text-2xl text-paper md:text-3xl">
              {item.value}
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-muted">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
