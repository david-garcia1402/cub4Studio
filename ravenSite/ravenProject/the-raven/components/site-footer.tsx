import { RavenMark } from "@/components/raven-mark";
import { restaurant } from "@/lib/restaurant";

export function SiteFooter() {
  return (
    <footer className="border-t border-gold/15 bg-ink">
      <div className="overflow-hidden border-b border-gold/10 py-6">
        <div className="marquee flex w-max gap-12 text-[11px] tracking-[0.4em] text-gold uppercase">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              The Raven · Mediterrâneo · Porto Alegre · Mezanino · Vinhos ·
              Alta gastronomia
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <RavenMark className="h-8 w-8" />
            <p className="font-display text-2xl">{restaurant.name}</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-dim">
            {restaurant.blurb}
          </p>
        </div>
        <div className="text-sm text-paper-dim">
          <p className="tracking-[0.2em] text-gold uppercase">Casa</p>
          <p className="mt-3 text-paper">{restaurant.address}</p>
          <p>
            {restaurant.city} · {restaurant.cep}
          </p>
          <a
            href={restaurant.phoneHref}
            className="mt-3 block text-paper hover:text-gold"
          >
            {restaurant.phone}
          </a>
        </div>
        <div className="text-sm">
          <p className="tracking-[0.2em] text-gold uppercase">Atalhos</p>
          <div className="mt-3 grid gap-2 text-paper-dim">
            <a href="#cardapio" className="hover:text-gold">
              Cardápio
            </a>
            <a
              href={restaurant.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold"
            >
              WhatsApp
            </a>
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-gold"
            >
              Rotas
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gold/10 px-5 py-6 text-center text-xs text-paper-dim">
        © {new Date().getFullYear()} The Raven Restaurant · Cidade Baixa
      </div>
    </footer>
  );
}
