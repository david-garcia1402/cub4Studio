import { FormEvent, useState } from "react";
import { WhatsAppIcon } from "../components/WhatsAppButton";
import { PhoneIcon } from "../components/PhoneLinks";
import { Differentials } from "../components/Differentials";
import { ADDRESS, EMAIL, HOURS, MAPS_EMBED, PHONE_FIXO, PHONE_FIXO_TEL, PHONE_WHATSAPP, waLink } from "../data";

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
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy/10 p-6">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                <PhoneIcon className="h-4 w-4" /> Telefone fixo
              </p>
              <a href={`tel:${PHONE_FIXO_TEL}`} className="mt-2 block text-2xl font-bold text-navy">
                {PHONE_FIXO}
              </a>
              <p className="mt-1 text-sm text-muted">Somente ligação — este número não tem WhatsApp.</p>
            </div>
            <div className="rounded-2xl border border-[#25D366]/40 bg-[#25D366]/5 p-6">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#128C4A]">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-2 block text-2xl font-bold text-navy">
                {PHONE_WHATSAPP}
              </a>
              <p className="mt-1 text-sm text-muted">Mensagens e ligações. Atendimento comercial e técnico.</p>
            </div>
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

      <Differentials layout="cards" className="border-t border-navy/10" />
    </main>
  );
}
