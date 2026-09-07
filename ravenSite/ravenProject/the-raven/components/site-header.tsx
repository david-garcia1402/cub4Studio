"use client";

import { useEffect, useState } from "react";
import { IconMenu, IconX } from "@/components/icons";
import { RavenMark } from "@/components/raven-mark";
import { ReserveDialog } from "@/components/reserve-dialog";
import { restaurant } from "@/lib/restaurant";

const links = [
  { href: "#sobre", label: "Sobre" },
  { href: "#cardapio", label: "Cardápio" },
  { href: "#galeria", label: "Galeria" },
  { href: "#avaliacoes", label: "Avaliações" },
  { href: "#visitar", label: "Visitar" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [reserve, setReserve] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-gold/15 bg-ink/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#topo" className="flex items-center gap-3 text-paper">
            <RavenMark className="h-8 w-8" />
            <span className="font-display text-xl tracking-wide">
              {restaurant.name}
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-[11px] tracking-[0.22em] text-paper-dim uppercase lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setReserve(true)}
              className="btn-gold hidden px-5 py-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase sm:inline-flex"
            >
              Reservar mesa
            </button>
            <button
              type="button"
              className="p-2 text-paper lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <IconX className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="grid gap-1 border-t border-gold/15 px-5 py-4 lg:hidden">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-[0.18em] text-paper-dim uppercase"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setReserve(true);
              }}
              className="btn-gold mt-2 px-5 py-3 text-[11px] font-semibold tracking-[0.2em] uppercase"
            >
              Reservar mesa
            </button>
          </nav>
        )}
      </header>
      <ReserveDialog open={reserve} onClose={() => setReserve(false)} />
    </>
  );
}
