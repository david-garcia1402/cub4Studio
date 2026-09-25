import { whatsappHref } from "../lib/whatsapp";
import { Reveal } from "./ui/Reveal";

export function Cta() {
  return (
    <section className="cta-banner" id="cta">
      <Reveal className="container cta-banner-inner">
        <h2>Tem dúvidas? Nos diga sua ideia pelo WhatsApp!</h2>
        <a className="btn btn--primary btn--lg" href={whatsappHref("Landing Page Conversora")} target="_blank" rel="noopener">
          Falar no WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
