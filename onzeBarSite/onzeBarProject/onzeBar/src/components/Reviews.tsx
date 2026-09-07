import { reviewBars, reviews, site } from "../data/content"

export function Reviews() {
  return (
    <section
      id="avaliacoes"
      className="scroll-mt-24 border-y border-line bg-ink-soft px-5 py-24 md:px-8"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            O que a galera diz
          </p>
          <p className="mt-4 font-display text-7xl leading-none text-cream">
            {site.rating.toString().replace(".", ",")}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim">
            {site.reviews} avaliações no Google
          </p>

          <div className="mt-8 space-y-2">
            {reviewBars.map((bar) => (
              <div key={bar.stars} className="flex items-center gap-3">
                <span className="w-3 font-mono text-[11px] text-cream-dim">
                  {bar.stars}
                </span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-cream/10">
                  <div
                    className="h-full rounded-full bg-gold"
                    style={{ width: `${bar.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-sm leading-relaxed text-cream-dim">
            Ótimos drinks — inclusive autorais —, comida deliciosa, atmosfera
            animada com boa música e DJs, cerveja gelada e um serviço descrito
            como atencioso e amigável.
          </p>
        </div>

        <div className="grid gap-5">
          {reviews.map((review) => (
            <blockquote
              key={review.name}
              className="rounded-[1.5rem] border border-line bg-ink p-6 md:p-8"
            >
              <p className="font-display text-xl leading-relaxed text-cream italic md:text-2xl">
                “{review.quote}”
              </p>
              <footer className="mt-5 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-cream-dim">
                <span className="text-gold">{review.name}</span>
                <span>{review.time}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
