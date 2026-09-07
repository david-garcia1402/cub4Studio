"use client";

import { useState } from "react";
import { branches, defaultWhatsApp } from "@/data/branches";
import { branchWhatsApp, whatsappLink } from "@/lib/whatsapp";
import { openBranchQuote, QuoteForm } from "./quote-form";
import { WhatsAppMark } from "./whatsapp-mark";

export function ContactView() {
  const [city, setCity] = useState("");
  const selected = branches.find((branch) => branch.city === city) ?? branches[0];

  function chooseBranch(cityName: string) {
    setCity(cityName);
    const branch = branches.find((item) => item.city === cityName);
    if (!branch) return;
    const form = document.getElementById("orcamento") as HTMLFormElement | null;
    openBranchQuote(branch, form);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja-dark">
          Fale conosco
        </p>
        <h1 className="display mt-2 text-5xl font-black md:text-6xl">Peça seu orçamento</h1>
        <p className="mt-4 text-steel">
          Escolha a filial à direita para abrir o WhatsApp dela na hora. Ou
          preencha o formulário e envie para a unidade selecionada.
        </p>
        <div className="mt-8 rounded-[2rem] bg-paper p-6 shadow-sm md:p-8">
          <QuoteForm selectedCity={city} onCityChange={setCity} />
        </div>
      </div>
      <aside className="lg:pt-16">
        <a
          href={whatsappLink(
            selected ? branchWhatsApp(selected) : defaultWhatsApp,
            `Olá! Quero um orçamento na unidade Locajá ${selected.city}.`,
          )}
          target="_blank"
          rel="noreferrer"
          className="block rounded-[2rem] bg-locaja p-6 text-white"
        >
          <div className="mb-3 flex items-center gap-2">
            <WhatsAppMark size={28} />
            <p className="text-xs uppercase tracking-[0.2em] text-white/70">WhatsApp da unidade</p>
          </div>
          <p className="display mt-2 text-4xl font-black">{branchWhatsApp(selected)}</p>
          <p className="mt-2 text-sm text-white/80">
            {selected.kind} · {selected.city}
          </p>
        </a>
        <div className="mt-5 grid gap-3">
          {branches.map((branch) => {
            const active = city === branch.city;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => chooseBranch(branch.city)}
                className={`rounded-2xl p-4 text-left transition ${
                  active ? "bg-ink text-white" : "bg-paper hover:bg-sand"
                }`}
              >
                <p className="text-[11px] uppercase tracking-[0.16em] opacity-70">{branch.kind}</p>
                <p className="font-semibold">{branch.city}</p>
                <p className={`text-sm ${active ? "text-white/75" : "text-steel"}`}>
                  {branchWhatsApp(branch)}
                </p>
                <p className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${active ? "text-white" : "text-locaja-dark"}`}>
                  <WhatsAppMark size={16} />
                  Abrir orçamento no WhatsApp
                </p>
              </button>
            );
          })}
        </div>
      </aside>
    </div>
  );
}
