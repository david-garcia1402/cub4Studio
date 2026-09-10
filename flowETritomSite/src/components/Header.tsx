import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogoFlow, LogoGrupoFVT, LogoTriton } from "./Logos";
import { WhatsAppButton } from "./WhatsAppButton";
import { PHONE_FIXO, PHONE_FIXO_TEL, waLink } from "../data";
import { PhoneIcon } from "./PhoneLinks";

const links = [
  { to: "/", label: "Início" },
  { to: "/grupo-fvt", label: "Grupo FVT" },
  { to: "/flow", label: "Flow" },
  { to: "/triton", label: "Triton" },
  { to: "/sobre", label: "Sobre" },
  { to: "/contato", label: "Contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/95 text-white backdrop-blur-md">
      <div className="hidden border-b border-white/10 bg-navy-2/80 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 lg:px-6">
          <Link to="/grupo-fvt" className="inline-flex items-center gap-2 text-yellow hover:text-white">
            <LogoGrupoFVT className="h-5 w-5" />
            Grupo FVT · Flow e Triton
          </Link>
          <span className="hidden md:inline">Envios para todo o Brasil · Nota fiscal e garantia</span>
          <span>11 anos no mercado</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 lg:px-6">
        <Link to="/flow" className="shrink-0" aria-label="Ir para Flow" onClick={() => setOpen(false)}>
          <LogoFlow variant="light" className="h-11 w-auto sm:h-12 lg:h-14" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-full px-2.5 py-2 text-sm font-semibold tracking-wide xl:px-3 ${
                  isActive ? "bg-yellow text-navy" : "text-white/85 hover:bg-white/10"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <WhatsAppButton
            href={waLink("Olá! Quero um orçamento Flow & Triton.")}
            variant="yellow"
            className="hidden px-4 py-2 sm:inline-flex"
          >
            Orçamento
          </WhatsAppButton>
          <a
            href={`tel:${PHONE_FIXO_TEL}`}
            className="hidden flex-col items-start leading-tight text-yellow md:flex"
            title="Telefone fixo — somente ligação (sem WhatsApp)"
          >
            <span className="inline-flex items-center gap-1 text-xs font-semibold">
              <PhoneIcon className="h-3.5 w-3.5" />
              {PHONE_FIXO}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white/60">Somente ligação</span>
          </a>
          <Link to="/triton" className="shrink-0" aria-label="Ir para Triton" onClick={() => setOpen(false)}>
            <LogoTriton variant="light" className="h-10 w-auto sm:h-12 lg:h-14" />
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <span className="grid gap-1.5">
              <span className={`block h-0.5 w-5 bg-white transition ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-navy px-4 py-4 lg:hidden">
          <nav className="grid gap-1" aria-label="Mobile">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-base font-semibold ${isActive ? "bg-yellow text-navy" : "text-white"}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <WhatsAppButton
              href={waLink("Olá! Quero um orçamento Flow & Triton.")}
              variant="yellow"
              className="mt-2 w-full"
            >
              Falar no WhatsApp
            </WhatsAppButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
