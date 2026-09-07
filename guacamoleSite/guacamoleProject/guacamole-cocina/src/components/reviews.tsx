import { reviewSummary, reviews, site } from "@/lib/site";
import { Star } from "lucide-react";

export function Reviews() {
  return (
    <section id="avaliacoes" className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.4fr] lg:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              Quem já sentou
            </p>
            <p className="font-display mt-3 text-7xl leading-none text-paper">
              {site.rating}
            </p>
            <div className="mt-3 flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold" />
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">
              {site.reviews.toLocaleString("pt-BR")} avaliações no Google
            </p>
          </div>
          <p className="text-lg leading-8 text-cream/80">{reviewSummary}</p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.quote}
              className="rounded-3xl border border-paper/10 bg-ink p-7"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <p className="mt-5 font-display text-2xl leading-snug text-paper">
                “{review.quote}”
              </p>
              <footer className="mt-6 text-xs uppercase tracking-[0.18em] text-muted">
                {review.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
