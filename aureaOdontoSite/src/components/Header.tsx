import { useState } from "react";
import { clinic, waLink } from "../data";
import { useScrolled } from "../hooks";
import { Logo } from "./Logo";

const links = [
  { href: "#clinica", label: "A clínica" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#espaco", label: "Espaço" },
  { href: "#resultados", label: "Resultados" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const overHero = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        overHero ? "text-cream" : "glass-nav text-ink shadow-[0_10px_40px_rgba(26,22,18,0.06)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 md:px-8">
        <Logo light={overHero} compact />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[0.78rem] font-medium tracking-[0.14em] uppercase transition-opacity hover:opacity-70 ${
                overHero ? "text-cream/90" : "text-ink-soft"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-gold px-4 py-2 text-[0.72rem] font-semibold tracking-[0.16em] text-ink uppercase transition hover:bg-gold-soft sm:inline-flex"
          >
            WhatsApp
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/20 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="flex w-5 flex-col gap-1.5">
              <span className={`h-px w-full bg-current transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-current transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-sand bg-ivory px-5 py-5 text-ink lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm tracking-[0.16em] uppercase"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href={waLink()} target="_blank" rel="noreferrer" className="pt-2 text-sm text-gold-deep">
              Falar no WhatsApp · {clinic.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
