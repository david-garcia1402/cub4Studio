import { site } from "../data/site";

export function whatsappMessage(service?: string) {
  const chosen = (service || "").trim();
  if (chosen) return `Oi, vi o site do cub4Studio e quero orçamento de ${chosen}.`;
  return "Oi, vi o site do cub4Studio e quero um orçamento.";
}

export function whatsappHref(service?: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappMessage(service))}`;
}

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

export function trackLead(source: string, service?: string) {
  const payload = { source, service: service || "" };
  const w = window as AnalyticsWindow;
  w.gtag?.("event", "generate_lead", { method: source, service: payload.service });
  w.fbq?.("track", "Lead", { content_name: payload.service || "orçamento", source });
}
