import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-4 md:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-7 text-muted">
            {site.description} Unidade de Porto Alegre desde {site.founded}, no
            coração de Petrópolis.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Visita</p>
          <p className="mt-3 text-sm leading-7 text-cream/80">
            {site.address}
            <br />
            Petrópolis, Porto Alegre
            <br />
            {site.hours}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-gold">Atalhos</p>
          <Link href="/cardapio" className="text-cream/80 hover:text-gold-soft">
            Cardápio
          </Link>
          <Link href="/reservas" className="text-cream/80 hover:text-gold-soft">
            Reservar
          </Link>
          <a
            href={site.ifoodUrl}
            target="_blank"
            rel="noreferrer"
            className="text-cream/80 hover:text-gold-soft"
          >
            Delivery iFood
          </a>
          <a
            href={whatsappUrl("Olá! Vim pelo site e quero uma mesa.")}
            target="_blank"
            rel="noreferrer"
            className="text-cream/80 hover:text-gold-soft"
          >
            WhatsApp {site.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="border-t border-paper/10 px-5 py-5 text-center text-xs text-muted">
        © 2026 {site.name} · Porto Alegre. Site de experiência local — não
        substitui o site oficial da rede.
      </div>
    </footer>
  );
}
