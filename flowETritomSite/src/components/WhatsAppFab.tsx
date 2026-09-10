import { WhatsAppIcon } from "./WhatsAppButton";
import { waLink } from "../data";

export function WhatsAppFab() {
  return (
    <a
      href={waLink("Olá! Vim pelo site flowetriton.com.br e quero atendimento.")}
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-black/20"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Como posso te ajudar?</span>
    </a>
  );
}
