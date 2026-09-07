"use client";

import { FormEvent, useState } from "react";
import { defaultWhatsApp } from "@/data/branches";
import { WhatsAppMark } from "@/components/whatsapp-mark";
import { whatsappLink } from "@/lib/whatsapp";

export default function JobsPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = [
      `Candidatura — Trabalhe conosco`,
      `Nome: ${data.get("name")}`,
      `Cidade: ${data.get("city")}`,
      `Área: ${data.get("area")}`,
      `Telefone: ${data.get("phone")}`,
      `E-mail: ${data.get("email")}`,
      `${data.get("message") || ""}`,
    ].join("\n");
    setSent(true);
    window.open(whatsappLink(defaultWhatsApp, text), "_blank");
  }

  return (
    <div className="mx-auto max-w-3xl px-4 pt-28 pb-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja-dark">
        Carreira
      </p>
      <h1 className="display mt-2 text-5xl font-black">Trabalhe conosco</h1>
      <p className="mt-4 text-steel">
        A Locajá cresce com gente que gosta de obra, atendimento e operação.
        Envie seu interesse e falamos com você.
      </p>
      <form onSubmit={onSubmit} className="mt-8 grid gap-4 rounded-[2rem] bg-paper p-6 md:p-8">
        <label className="grid gap-1.5 text-sm">
          Nome
          <input name="name" required className="field" />
        </label>
        <label className="grid gap-1.5 text-sm">
          E-mail
          <input name="email" type="email" required className="field" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Telefone
          <input name="phone" required className="field" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Cidade
          <input name="city" className="field" />
        </label>
        <label className="grid gap-1.5 text-sm">
          Área de interesse
          <select name="area" className="field">
            <option>Atendimento</option>
            <option>Logística e entrega</option>
            <option>Manutenção</option>
            <option>Administrativo</option>
            <option>Outra</option>
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          Mensagem
          <textarea name="message" rows={4} className="field" />
        </label>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-locaja py-4 text-sm font-semibold text-white">
          <WhatsAppMark size={20} />
          {sent ? "Abrindo WhatsApp..." : "Enviar candidatura"}
        </button>
      </form>
    </div>
  );
}
