"use client";

import { Logo } from "@/components/logo";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/#experiencia", label: "Experiência" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/#avaliacoes", label: "Avaliações" },
  { href: "/#visita", label: "Como chegar" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-night/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" aria-label={site.name}>
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-cream/80 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-gold-soft"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <ButtonLink href="/reservas" variant="gold">
            Reservar mesa
          </ButtonLink>
        </div>
        <button
          type="button"
          className="rounded-full border border-paper/15 p-2 text-paper md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-paper/10 bg-night px-5 py-5 md:hidden">
          <nav className="flex flex-col gap-4 text-lg">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-cream"
              >
                {link.label}
              </Link>
            ))}
            <ButtonLink href="/reservas">Reservar mesa</ButtonLink>
            <ButtonLink
              href={whatsappUrl("Olá! Quero reservar uma mesa no Guacamole Porto Alegre.")}
              variant="ghost"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
