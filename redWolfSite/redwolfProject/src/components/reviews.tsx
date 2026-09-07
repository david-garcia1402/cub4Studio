import { IconStar } from "@/components/icons";
import { brand, reviews, units } from "@/lib/brand";
import { Reveal } from "@/components/reveal";

const tags = [
  { label: "massa 48h", count: 41 },
  { label: "maionese", count: 28 },
  { label: "famosinha", count: 22 },
  { label: "4 queijos", count: 19 },
];

export function Reviews() {
  return (
    <section id="avaliacoes" className="border-t border-ember/15 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] tracking-[0.32em] text-ember-bright uppercase">
                Destaque Clientes
              </p>
              <h2 className="font-display mt-3 text-5xl md:text-6xl">
                {brand.rating.toString().replace(".", ",")} no Google.
                <span className="italic text-ember-bright"> A matilha fala.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-5 w-5 text-ember-bright" />
                ))}
              </div>
              <p className="mt-3 text-paper-dim">
                {brand.reviewCount} avaliações públicas · {brand.followers} no
                Instagram. Querem é achar o WhatsApp sem fricção.
              </p>
              <a
                href={units.schroeder.googleReview}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm text-ember-bright underline-offset-4 hover:underline"
              >
                Avaliar no Google
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="border border-ember/20 px-3 py-1.5 text-xs tracking-[0.14em] text-paper-dim uppercase"
            >
              {tag.label} · {tag.count}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.08}>
              <blockquote className="flex h-full flex-col border border-ember/15 bg-ink p-6">
                <p className="font-display text-2xl leading-snug italic">
                  “{review.quote}”
                </p>
                <footer className="mt-auto pt-6">
                  <p className="text-sm text-paper">{review.name}</p>
                  <p className="text-xs tracking-[0.16em] text-paper-dim uppercase">
                    {review.meta}
                  </p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
