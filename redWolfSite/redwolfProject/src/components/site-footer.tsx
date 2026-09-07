import { WolfMark } from "@/components/wolf-mark";
import { brand, units } from "@/lib/brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-ember/15 bg-ink">
      <div className="overflow-hidden border-b border-ember/10 py-6">
        <div className="marquee flex w-max gap-12 text-[11px] tracking-[0.4em] text-ember-bright uppercase">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Redwolf · 48h · Jaraguá · Schroeder · DOC · Fermento e tempo
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <WolfMark className="h-8 w-8" />
            <p className="font-display text-2xl tracking-[0.14em]">REDWOLF</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper-dim">
            {brand.tagline}. Site piloto para centralizar pedidos e WhatsApp.
          </p>
        </div>
        <div className="text-sm text-paper-dim">
          <p className="tracking-[0.2em] text-ember-bright uppercase">Casas</p>
          <p className="mt-3 text-paper">{units.jaragua.city}</p>
          <p>{units.jaragua.address}</p>
          <p className="mt-3 text-paper">{units.schroeder.city}</p>
          <p>{units.schroeder.address}</p>
        </div>
        <div className="text-sm">
          <p className="tracking-[0.2em] text-ember-bright uppercase">Atalhos</p>
          <div className="mt-3 grid gap-2 text-paper-dim">
            <a href="#cardapio" className="hover:text-ember-bright">
              Cardápio
            </a>
            <a href="#pedir" className="hover:text-ember-bright">
              Pedir
            </a>
            <a
              href={brand.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-ember-bright"
            >
              {brand.instagramHandle}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ember/10 px-5 py-6 text-center text-xs text-paper-dim">
        © {new Date().getFullYear()} {brand.legalName} · piloto de apresentação
      </div>
    </footer>
  );
}
