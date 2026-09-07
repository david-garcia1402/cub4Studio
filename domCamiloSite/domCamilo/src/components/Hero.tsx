import { Star } from "lucide-react";
import { restaurant, whatsappHref } from "@/lib/data";
import { HoursBadge } from "@/components/HoursBadge";

export function Hero() {
  return (
    <section id="topo" className="relative min-h-[100svh] overflow-hidden bg-ink">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=2200&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent,rgba(22,17,13,0.45))]" />
      <div className="grain" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <p className="animate-rise text-[11px] uppercase tracking-[0.42em] text-brass">
          Niterói · Canoas · Casa informal
        </p>
        <h1 className="animate-rise delay-1 mt-4 max-w-3xl font-display text-[18vw] leading-[0.86] text-cream sm:text-7xl md:text-8xl lg:text-9xl">
          Dom
          <br />
          Camilo
        </h1>
        <p className="animate-rise delay-2 mt-6 max-w-xl text-lg leading-relaxed text-cream/78 md:text-xl">
          {restaurant.description}
        </p>

        <div className="animate-rise delay-3 mt-8 flex flex-wrap items-center gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ember px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-ember-deep"
          >
            Reservar mesa
          </a>
          <a
            href="#cardapio"
            className="rounded-full border border-cream/25 px-7 py-3.5 text-sm uppercase tracking-[0.16em] text-cream transition hover:border-brass hover:text-brass"
          >
            Ver cardápio
          </a>
        </div>

        <div className="animate-rise delay-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-6 text-sm text-cream/80">
          <div className="flex items-center gap-2">
            <Star className="fill-brass text-brass" size={16} />
            <strong className="text-cream">{restaurant.rating.toFixed(1).replace(".", ",")}</strong>
            <span>({restaurant.reviewCount.toLocaleString("pt-BR")} avaliações)</span>
          </div>
          <span>{restaurant.priceRange} por pessoa</span>
          <HoursBadge />
        </div>
      </div>
    </section>
  );
}
