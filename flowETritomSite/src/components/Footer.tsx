import { Link } from "react-router-dom";
import { LogoFlow, LogoGrupoFVT, LogoTriton } from "./Logos";
import { ADDRESS, EMAIL, FACEBOOK, INSTAGRAM, MAPS_EMBED, MAPS_URL, PHONE_ALT, PHONE_DISPLAY } from "../data";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="h-1 hairline" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4">
        <div className="space-y-4">
          <LogoGrupoFVT className="h-auto w-full max-w-[280px] rounded-xl border border-gold/30" />
          <div className="flex flex-wrap items-end gap-8">
            <LogoFlow variant="light" className="h-14 w-auto" />
            <LogoTriton variant="light" className="h-16 w-auto" />
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/75">
            Flow e Triton pertencem ao Grupo FVT. Distribuição de equipamentos para poços artesianos, mineração e
            sondagem, com sede própria em Itapema-SC.
          </p>
        </div>
        <div>
          <h2 className="font-display text-sm tracking-[0.2em] text-yellow">INSTITUCIONAL</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/grupo-fvt">Grupo FVT</Link></li>
            <li><Link to="/sobre">Sobre nós</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm tracking-[0.2em] text-yellow">SEGMENTOS</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link to="/flow">Flow — poços e DTH</Link></li>
            <li><Link to="/triton">Triton — máquinas e compressores</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm tracking-[0.2em] text-yellow">CONTATO</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>{PHONE_DISPLAY}</li>
            <li>{PHONE_ALT}</li>
            <li>{EMAIL}</li>
            <li>{ADDRESS}</li>
            <li>
              <a className="underline decoration-yellow/40" href={INSTAGRAM} target="_blank" rel="noreferrer">
                @flowequipamentos
              </a>
            </li>
            <li>
              <a className="underline decoration-yellow/40" href={FACEBOOK} target="_blank" rel="noreferrer">
                facebook.com/flowcomercial
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-yellow">Localização</p>
        <div className="overflow-hidden rounded-2xl border border-white/15">
          <iframe
            title="Grupo FVT no Google Maps — Itapema"
            className="h-64 w-full border-0 grayscale-[0.15] sm:h-80"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={MAPS_EMBED}
          />
        </div>
        <p className="mt-2 text-sm text-white/70">
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-yellow/40">
            {ADDRESS}
          </a>
        </p>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50">
        Grupo FVT · Flow & Triton © {new Date().getFullYear()} · Itapema-SC · www.flowetriton.com.br
      </div>
    </footer>
  );
}
