import { clinic, waLink } from "../data";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate min-h-[100svh] overflow-hidden text-cream">
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/fachada-close.webp" type="image/webp" />
        <source srcSet="/images/fachada.webp" type="image/webp" />
        <img
          src="/images/01-fachada.jpg"
          alt="Fachada da Áurea Odontologia Premium no Centro de Jaraguá do Sul"
          className="absolute inset-0 h-full w-full object-cover object-[78%_center] md:object-[72%_center]"
          width={1600}
          height={900}
          fetchPriority="high"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:justify-center md:pb-24 md:px-8">
        <p className="mb-5 text-[0.72rem] font-medium tracking-[0.32em] text-gold-soft uppercase">
          Centro · Jaraguá do Sul
        </p>
        <h1 className="font-display max-w-3xl text-5xl leading-[0.95] italic sm:text-6xl lg:text-7xl">
          {clinic.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/82 sm:text-lg">
          Clínica odontológica premium com ambiente sofisticado, acolhimento de verdade e
          especialidades que cuidam da função e da estética do sorriso.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-gold px-6 py-3.5 text-[0.78rem] font-semibold tracking-[0.16em] text-ink uppercase transition hover:bg-gold-soft"
          >
            Agendar pelo WhatsApp
          </a>
          <a
            href={clinic.bookingUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-cream/40 bg-ink/35 px-6 py-3.5 text-[0.78rem] font-medium tracking-[0.16em] uppercase backdrop-blur-sm transition hover:border-gold hover:text-gold-soft"
          >
            Agendar online
          </a>
        </div>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.78rem] tracking-wide text-cream/75">
          <span className="inline-flex items-center gap-1.5">
            <Stars />
            <strong className="text-cream">{clinic.rating}</strong> · {clinic.reviews} avaliações no Google
          </span>
          <span>Estacionamento exclusivo</span>
          <span>Seg–sex 9h–20h</span>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  return (
    <span className="inline-flex text-gold" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-current">
          <path d="M10 1.6 12.4 7l5.8.5-4.4 3.7 1.4 5.6L10 13.8 4.8 16.8l1.4-5.6L1.8 7.5 7.6 7 10 1.6z" />
        </svg>
      ))}
    </span>
  );
}
