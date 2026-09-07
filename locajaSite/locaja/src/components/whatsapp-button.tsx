import { defaultWhatsApp } from "@/data/branches";
import { whatsappLink } from "@/lib/whatsapp";
import { WhatsAppMark } from "./whatsapp-mark";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink(defaultWhatsApp, "Olá! Preciso de um equipamento para a obra.")}
      target="_blank"
      rel="noreferrer"
      className="fixed right-5 bottom-5 z-40 flex items-center gap-3 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-ink shadow-xl shadow-black/20 transition hover:scale-105"
    >
      <WhatsAppMark size={44} />
      <span className="hidden text-left leading-tight sm:block">
        <span className="block text-[11px] text-steel">Resposta em 15 min</span>
        <span className="block text-sm font-semibold">Podemos ajudar?</span>
      </span>
    </a>
  );
}
