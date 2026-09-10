import { FormEvent, useState } from "react";
import { WhatsAppIcon } from "../components/WhatsAppButton";
import { ADDRESS, EMAIL, HOURS, MAPS_EMBED, PHONE_ALT, PHONE_DISPLAY, waLink } from "../data";

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") || "");
    const tel = String(data.get("telefone") || "");
    const msg = String(data.get("mensagem") || "");
    const marca = String(data.get("marca") || "Flow & Triton");
    window.open(
      waLink(`Olá! Sou ${nome}. Telefone: ${tel}. Marca de interesse: ${marca}. ${msg}`),
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  }

  return (
    <main>
      <section className="bg-navy px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow">Contato</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Envie sua solicitação</h1>
          <p className="mt-3 max-w-xl text-white/80">Atendimento técnico em Itapema-SC, com envio para todo o Brasil.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="rounded-2xl border border-navy/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Telefone / WhatsApp</p>
            <p className="mt-2 text-2xl font-bold text-navy">{PHONE_DISPLAY}</p>
            <p className="text-sm text-muted">{PHONE_ALT}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">E-mail</p>
            <p className="mt-2 font-semibold text-navy">{EMAIL}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Endereço</p>
            <p className="mt-2 font-semibold text-navy">{ADDRESS}</p>
            <p className="mt-1 text-sm text-muted">{HOURS}</p>
          </div>
          <iframe
            title="Mapa Itapema"
            className="h-64 w-full rounded-2xl border-0"
            loading="lazy"
            src={MAPS_EMBED}
          />
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl bg-paper p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">
              Nome
              <input required name="nome" className="mt-1 w-full rounded-xl border border-navy/15 bg-white px-3 py-3 font-normal" />
            </label>
            <label className="text-sm font-semibold text-navy">
              Telefone
              <input required name="telefone" className="mt-1 w-full rounded-xl border border-navy/15 bg-white px-3 py-3 font-normal" />
            </label>
          </div>
          <label className="mt-4 block text-sm font-semibold text-navy">
            E-mail
            <input type="email" name="email" className="mt-1 w-full rounded-xl border border-navy/15 bg-white px-3 py-3 font-normal" />
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy">
            Marca
            <select name="marca" className="mt-1 w-full rounded-xl border border-navy/15 bg-white px-3 py-3 font-normal">
              <option>Grupo FVT</option>
              <option>Flow — poços e DTH</option>
              <option>Triton — máquinas e compressores</option>
              <option>As três marcas</option>
            </select>
          </label>
          <label className="mt-4 block text-sm font-semibold text-navy">
            Mensagem
            <textarea required name="mensagem" rows={5} className="mt-1 w-full rounded-xl border border-navy/15 bg-white px-3 py-3 font-normal" />
          </label>
          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-bold text-white hover:bg-[#1ebe5d]">
            <WhatsAppIcon className="h-5 w-5" />
            Enviar no WhatsApp
          </button>
          {sent ? <p className="mt-3 text-sm text-muted">Abrimos o WhatsApp com a sua mensagem.</p> : null}
        </form>
      </section>
    </main>
  );
}
