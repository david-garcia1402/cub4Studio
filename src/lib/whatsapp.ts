import { site } from "../data/site";

/** Como a pessoa chegou no WhatsApp — cada origem pede a coisa certa. */
export type WhatsAppIntent =
  | { kind: "contato" }
  | { kind: "orcamento" }
  | { kind: "ideia" }
  | { kind: "servico"; service?: string; name?: string; email?: string; project?: string }
  | { kind: "projeto"; title: string; tag?: string };

const servicePhrase: Record<string, string> = {
  "Landing Page Conversora": "uma landing page conversora",
  "Criativos com IA": "criativos com IA",
  "Vídeos & Reels com IA": "vídeos e reels com IA",
  "Estratégia & Automação com IA": "estratégia e automação com IA",
};

function clean(value?: string) {
  return (value || "").trim();
}

function phraseFor(service?: string) {
  const chosen = clean(service);
  if (!chosen || chosen === "Outro") return "";
  return servicePhrase[chosen] || chosen;
}

function lines(...parts: Array<string | false | undefined>) {
  return parts
    .filter((part): part is string => part !== false && part !== undefined)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function whatsappMessage(intent: WhatsAppIntent = { kind: "contato" }) {
  if (intent.kind === "orcamento") {
    return lines(
      "Oi! Vim pelo site do cub4Studio e quero um orçamento.",
      "",
      "Meu nome:",
      "O que preciso (landing page, criativos, vídeos ou automação):",
      "Marca e objetivo:",
    );
  }

  if (intent.kind === "ideia") {
    return lines(
      "Oi! Vim pelo site do cub4Studio e quero contar uma ideia.",
      "",
      "Meu nome:",
      "A ideia:",
      "Como o cub4Studio pode ajudar:",
    );
  }

  if (intent.kind === "projeto") {
    const title = clean(intent.title) || "um projeto do portfólio";
    const tag = clean(intent.tag);
    return lines(
      `Oi! Vi o projeto "${title}" no portfólio do cub4Studio e quero um trabalho parecido.`,
      tag ? `Referência: ${tag}.` : "",
      "",
      "Meu nome:",
      "Meu negócio:",
      "O que quero de parecido:",
    );
  }

  if (intent.kind === "servico") {
    const phrase = phraseFor(intent.service);
    const name = clean(intent.name);
    const email = clean(intent.email);
    const project = clean(intent.project);
    const pedido = phrase
      ? `quero orçamento de ${phrase} no cub4Studio.`
      : "quero um orçamento no cub4Studio.";
    const intro = name ? `Oi! Sou ${name} e ${pedido}` : `Oi! Vim pelo site do cub4Studio e ${pedido}`;
    const prompts = [
      !name ? "Meu nome:" : "",
      !project ? "Marca, público e objetivo:" : "",
      !project ? "Prazo:" : "",
    ].filter(Boolean);
    return lines(
      intro,
      email ? `E-mail: ${email}` : "",
      project ? `Sobre o projeto: ${project}` : "",
      prompts.length ? "" : false,
      ...prompts,
    );
  }

  return lines(
    "Oi! Vim pelo site do cub4Studio.",
    "",
    "Meu nome:",
    "Quero falar sobre (orçamento, dúvida ou uma ideia):",
  );
}

export function whatsappHref(intent?: WhatsAppIntent) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(whatsappMessage(intent))}`;
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
