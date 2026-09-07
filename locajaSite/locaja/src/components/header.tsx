"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { defaultWhatsApp } from "@/data/branches";
import { whatsappLink } from "@/lib/whatsapp";
import { IconClose, IconMenu } from "./icons";
import { Logo } from "./logo";
import { WhatsAppMark } from "./whatsapp-mark";

const links = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "A Locajá" },
  { href: "/equipamentos", label: "Equipamentos" },
  { href: "/unidades", label: "Unidades" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-3 max-w-6xl px-4">
        <div className="flex items-center justify-between rounded-2xl bg-ink px-3 py-2.5 text-white shadow-lg shadow-black/15 md:px-4">
          <a href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Logo className="h-12 w-auto sm:h-14" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm transition ${
                    active
                      ? "bg-white text-ink"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink(defaultWhatsApp, "Olá! Quero solicitar um orçamento de locação.")}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-full bg-locaja px-4 py-2 text-sm font-semibold text-white transition hover:bg-locaja-dark sm:inline-flex"
            >
              <WhatsAppMark size={18} />
              Orçar agora
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 lg:hidden"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Fechar menu" : "Abrir menu"}
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {open ? (
          <div className="mt-2 rounded-2xl bg-ink p-3 text-white shadow-xl lg:hidden">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm hover:bg-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href={whatsappLink(defaultWhatsApp, "Olá! Quero solicitar um orçamento de locação.")}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-locaja px-4 py-3 text-sm font-semibold"
            >
              <WhatsAppMark size={18} />
              Falar no WhatsApp
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
