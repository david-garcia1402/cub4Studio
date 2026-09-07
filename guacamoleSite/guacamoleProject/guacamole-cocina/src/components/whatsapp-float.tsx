import { whatsappUrl } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

export function WhatsappFloat() {
  return (
    <a
      href={whatsappUrl("Olá! Vim pelo site do Guacamole Porto Alegre.")}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
