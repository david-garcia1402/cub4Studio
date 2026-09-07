import { IconStar } from "@/components/icons";
import { restaurant, reviews, reviewTags } from "@/lib/restaurant";
import { Reveal } from "@/components/reveal";

export function Reviews() {
  return (
    <section id="avaliacoes" className="border-t border-gold/10 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
                Avaliações
              </p>
              <h2 className="font-display mt-3 text-5xl md:text-6xl">
                4,7 no Google.
                <span className="italic text-gold"> Quase dois mil jantares.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-5 w-5 text-gold" />
                ))}
              </div>
              <p className="mt-3 text-paper-dim">
                {restaurant.reviewCount.toLocaleString("pt-BR")} avaliações ·
                comida de alta qualidade, atendimento atencioso e preços justos.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {reviewTags.map((tag) => (
            <span
              key={tag.label}
              className="border border-gold/20 px-3 py-1.5 text-xs tracking-[0.14em] text-paper-dim uppercase"
            >
              {tag.label} · {tag.count}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 0.08}>
              <blockquote className="flex h-full flex-col border border-gold/15 bg-ink p-6">
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
