"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, restaurant, whatsappHref } from "@/lib/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "border-b border-white/10 bg-ink/92 text-cream shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent text-cream"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
        <a href="#topo" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-brass/70 bg-ink/40 font-display text-sm tracking-[0.18em] text-brass">
            DC
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl tracking-wide">
              {restaurant.shortName}
            </span>
            <span className="mt-1 block text-[10px] uppercase tracking-[0.28em] text-cream/60">
              Canoas · RS
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] uppercase tracking-[0.18em] lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-cream/75 transition hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-ember px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream transition hover:bg-ember-deep sm:inline-flex"
          >
            Reservar mesa
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="min-h-[calc(100svh-5rem)] border-t border-white/10 bg-ink px-5 py-8 lg:hidden">
          <nav className="flex flex-col gap-5 font-display text-3xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-cream/90"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex rounded-full bg-ember px-6 py-3 text-sm uppercase tracking-[0.16em] text-cream"
          >
            Reservar mesa
          </a>
        </div>
      ) : null}
    </header>
  );
}
