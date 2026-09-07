"use client";

import { FormEvent, useMemo, useState } from "react";
import { branches, defaultWhatsApp, type Branch } from "@/data/branches";
import { equipment } from "@/data/equipment";
import { branchWhatsApp, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppMark } from "./whatsapp-mark";

function quoteMessage(data: FormData, cityFallback?: string) {
  const name = String(data.get("name") || "");
  const phone = String(data.get("phone") || "");
  const city = String(data.get("city") || cityFallback || "");
  const item = String(data.get("equipment") || "");
  const period = String(data.get("period") || "");
  const quantity = String(data.get("quantity") || "1");
  const freight = String(data.get("freight") || "");
  const message = String(data.get("message") || "");

  return [
    name ? `Olá, sou ${name}.` : "Olá! Quero um orçamento.",
    item ? `Quero orçar: ${item}` : "Quero orçar equipamentos para a obra.",
    period ? `Período: ${period} · Qtd: ${quantity}` : "",
    city ? `Unidade: Locajá ${city}` : "",
    freight ? `Frete: ${freight}` : "",
    phone ? `Telefone: ${phone}` : "",
    message ? `Obs: ${message}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function QuoteForm({
  preset,
  selectedCity,
  onCityChange,
}: {
  preset?: string;
  selectedCity?: string;
  onCityChange?: (city: string) => void;
}) {
  const [sent, setSent] = useState(false);
  const [city, setCity] = useState(selectedCity ?? "");

  const currentCity = selectedCity ?? city;
  const target = useMemo(() => {
    const branch = branches.find((item) => item.city === currentCity);
    return branch ? branchWhatsApp(branch) : defaultWhatsApp;
  }, [currentCity]);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = quoteMessage(new FormData(event.currentTarget));
    setSent(true);
    window.open(whatsappLink(target, text), "_blank");
  }

  return (
    <form id="orcamento" onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome completo" name="name" required />
        <Field label="Telefone / WhatsApp" name="phone" required />
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Unidade ou cidade</span>
          <select
            name="city"
            required
            className="field"
            value={currentCity}
            onChange={(event) => {
              setCity(event.target.value);
              onCityChange?.(event.target.value);
            }}
          >
            <option value="">Selecione</option>
            {branches.map((branch) => (
              <option key={branch.id} value={branch.city}>
                Locajá {branch.city}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Equipamento</span>
          <select name="equipment" defaultValue={preset} required className="field">
            <option value="">Selecione</option>
            {equipment.map((item) => (
              <option key={item.slug} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5 text-sm">
          <span className="font-medium">Período</span>
          <select name="period" required className="field">
            <option value="Diário">Diário</option>
            <option value="Semanal">Semanal</option>
            <option value="Quinzenal">Quinzenal</option>
            <option value="Mensal">Mensal</option>
          </select>
        </label>
        <Field label="Quantidade" name="quantity" type="number" defaultValue="1" />
      </div>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">Necessita frete?</span>
        <select name="freight" className="field">
          <option>Sim</option>
          <option>Não, retiro na loja</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm">
        <span className="font-medium">Mensagem</span>
        <textarea name="message" rows={4} className="field resize-y" placeholder="Endereço da obra, prazo, detalhes..." />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-locaja px-5 py-4 text-sm font-semibold text-white hover:bg-locaja-dark"
      >
        <WhatsAppMark size={20} />
        {sent ? "Abrindo WhatsApp..." : "Enviar orçamento no WhatsApp"}
      </button>
    </form>
  );
}

export function openBranchQuote(branch: Branch, form?: HTMLFormElement | null) {
  const text = form
    ? quoteMessage(new FormData(form), branch.city)
    : `Olá! Quero um orçamento na unidade Locajá ${branch.city}.`;
  window.open(whatsappLink(branchWhatsApp(branch), text), "_blank");
}

function Field({
  label,
  name,
  required,
  type = "text",
  defaultValue,
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="grid gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input
        name={name}
        required={required}
        type={type}
        defaultValue={defaultValue}
        className="field"
      />
    </label>
  );
}
