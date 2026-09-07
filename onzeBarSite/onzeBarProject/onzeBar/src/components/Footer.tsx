import { site } from "../data/content"

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl text-cream">
            Onze <span className="italic text-gold">Bar</span>
          </p>
          <p className="mt-2 max-w-sm text-sm text-cream-dim">
            Uma casa LGBTQ+ no Centro Histórico. Drinks, petiscos e a noite no
            ponto.
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cream-dim md:items-end">
          <a href={site.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">
            Instagram
          </a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer" className="hover:text-gold">
            WhatsApp
          </a>
          <p>© {new Date().getFullYear()} Onze Bar · Porto Alegre</p>
        </div>
      </div>
    </footer>
  )
}
