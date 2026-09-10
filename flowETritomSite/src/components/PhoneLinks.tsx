import { PHONE_FIXO, PHONE_FIXO_TEL, PHONE_WHATSAPP, waLink } from "../data";
import { WhatsAppIcon } from "./WhatsAppButton";

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

type Props = {
  tone?: "light" | "dark";
  className?: string;
  /** Deixa explícito que o fixo é apenas para ligação (sem WhatsApp). */
  showHint?: boolean;
};

/**
 * Lista padronizada dos dois telefones:
 * - (47) 2033-4417 → fixo, SOMENTE ligação (não tem WhatsApp).
 * - (47) 99918-9698 → WhatsApp (e ligação).
 */
export function PhoneLinks({ tone = "light", className = "", showHint = true }: Props) {
  const dark = tone === "dark";
  const sub = dark ? "text-white/60" : "text-muted";
  return (
    <ul className={`space-y-2 text-sm ${className}`}>
      <li className="flex items-start gap-2">
        <span className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${dark ? "bg-white/10 text-yellow" : "bg-navy text-yellow"}`}>
          <PhoneIcon className="h-3.5 w-3.5" />
        </span>
        <span>
          <a href={`tel:${PHONE_FIXO_TEL}`} className="font-semibold">
            {PHONE_FIXO}
          </a>
          {showHint ? <span className={`block text-xs ${sub}`}>Telefone fixo · somente ligação (sem WhatsApp)</span> : null}
        </span>
      </li>
      <li className="flex items-start gap-2">
        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
          <WhatsAppIcon className="h-3.5 w-3.5" />
        </span>
        <span>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="font-semibold">
            {PHONE_WHATSAPP}
          </a>
          {showHint ? <span className={`block text-xs ${sub}`}>WhatsApp comercial · também atende ligação</span> : null}
        </span>
      </li>
    </ul>
  );
}
