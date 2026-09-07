import { useEffect, useState } from "react"
import { site } from "../data/content"

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#cardapio", label: "Carta" },
  { href: "#casa", label: "A casa" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#visita", label: "Visita" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
        <a href="#topo" className="flex items-baseline gap-2">
          <span className="font-display text-2xl tracking-wide text-cream">
            ONZE
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold">
            Bar
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream-dim transition-colors hover:text-gold-bright"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-gold/40 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-ink md:inline-flex"
        >
          Reservar
        </a>

        <button
          type="button"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menu"
        >
          {open ? "Fechar" : "Menu"}
        </button>
      </div>

      {open ? (
        <div className="border-t border-line bg-ink/95 px-5 py-6 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.22em] text-cream"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="pt-2 font-mono text-sm uppercase tracking-[0.22em] text-gold"
            >
              Reservar no WhatsApp
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
