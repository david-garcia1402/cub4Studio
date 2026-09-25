import { trackLead, whatsappHref } from "../lib/whatsapp";
import { WhatsAppIcon } from "./ui/Icons";

export function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float"
      href={whatsappHref()}
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp do cub4Studio"
      onClick={() => trackLead("whatsapp", "flutuante")}
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
