import { ADDRESS, GOOGLE_REVIEWS_URL, HOURS, PHONE_ALT, PHONE_DISPLAY, googlePlace } from "../data";

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-[#F5C400]" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1 5.06 16.71 6 11.21l-4-3.9 5.53-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function GoogleReviews() {
  return (
    <section className="bg-paper px-4 py-12 sm:px-6" aria-labelledby="google-reviews-title">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">Google</p>
            <h2 id="google-reviews-title" className="mt-2 font-display text-3xl text-navy sm:text-4xl">
              O que dizem no Google
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
              {googlePlace.name} · {googlePlace.reviewCount} avaliações públicas. Abaixo, as melhores.
            </p>
          </div>
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy underline decoration-gold/50"
          >
            Ver no Google
          </a>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-4">
            {googlePlace.reviews.map((review) => (
              <blockquote key={review.name} className="rounded-3xl bg-white p-6 shadow-sm">
                <Stars />
                <p className="mt-3 font-display text-2xl leading-snug text-navy">“{review.text}”</p>
                <footer className="mt-4 text-sm font-semibold text-muted">{review.name}</footer>
              </blockquote>
            ))}
          </div>

          <aside className="rounded-3xl border border-navy/10 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">No Google</p>
            <p className="mt-2 font-display text-xl text-navy">{googlePlace.name}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
              <li>{googlePlace.reviewCount} avaliações no Google</li>
              <li>{ADDRESS}</li>
              <li>{HOURS}</li>
              <li>
                {PHONE_DISPLAY} · {PHONE_ALT}
              </li>
            </ul>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full bg-navy px-5 py-3 text-sm font-bold text-white"
            >
              Ler todas as avaliações
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
