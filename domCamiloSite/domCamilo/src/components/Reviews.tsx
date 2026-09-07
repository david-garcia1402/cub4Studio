import { Quote, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { restaurant, reviewQuotes, reviews, reviewTags } from "@/lib/data";

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5 text-brass" aria-label={`${value} estrelas`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={14}
          className={index < value ? "fill-brass" : "opacity-25"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section id="avaliacoes" className="scroll-mt-24 bg-cream px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-[11px] uppercase tracking-[0.38em] text-ember">
              Avaliações
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none text-ink md:text-6xl">
              1.250 vozes, a mesma mesa.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-smoke">
              Elogiam a comida caseira, a variedade, as carnes assadas e as
              sobremesas. Também o preço justo, o serviço cordial e o ambiente
              limpo. Algumas notas pedem o prato mais quente — a casa responde.
            </p>
          </Reveal>
          <Reveal className="lg:col-span-5">
            <div className="rounded-[1.8rem] bg-ink p-8 text-cream">
              <p className="font-display text-7xl leading-none">
                {restaurant.rating.toFixed(1).replace(".", ",")}
              </p>
              <Stars value={4} />
              <p className="mt-3 text-sm text-cream/65">
                {restaurant.reviewCount.toLocaleString("pt-BR")} avaliações no Google
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {reviewTags.map((tag) => (
                  <span
                    key={tag.label}
                    className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.14em] text-cream/80"
                  >
                    {tag.label} {tag.count}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reviewQuotes.map((quote, index) => (
            <Reveal key={quote} delay={index * 80}>
              <blockquote className="h-full rounded-3xl border border-ink/8 bg-linen p-6">
                <Quote className="text-ember" size={18} />
                <p className="mt-3 font-display text-2xl leading-snug text-ink">
                  {quote}
                </p>
              </blockquote>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <Reveal key={review.name} delay={index * 80}>
              <article className="flex h-full flex-col rounded-[1.6rem] bg-linen p-6">
                <Stars value={review.rating} />
                <p className="mt-4 flex-1 leading-relaxed text-bark">{review.text}</p>
                <div className="mt-6 border-t border-ink/8 pt-4">
                  <p className="font-medium text-ink">{review.name}</p>
                  <p className="text-xs text-smoke">
                    {review.meta} · {review.time}
                  </p>
                  <p className="mt-3 text-sm text-ember">
                    Resposta do proprietário — {review.reply}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
