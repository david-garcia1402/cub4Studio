import { ReserveForm } from "@/components/reserve-form";
import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reservas",
  description:
    "Reserve mesa no Guacamole Cocina Mexicana em Porto Alegre pelo WhatsApp.",
};

export default function ReservasPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Mesa certa, noite certa
          </p>
          <h1 className="font-display mt-3 text-5xl text-paper md:text-6xl">
            Reserve em 30 segundos.
          </h1>
          <p className="mt-5 text-base leading-8 text-cream/75">
            Rodízio com valor promocional mediante reserva. Happy hour até 20h,
            mariachis e tequileiro a partir das 20h. A casa fecha à meia-noite.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-cream/75">
            <li>· {site.addressFull}</li>
            <li>· {site.hours}</li>
            <li>· WhatsApp {site.phoneDisplay}</li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink
              href={whatsappUrl("Olá! Quero reservar agora no Guacamole POA.")}
              target="_blank"
              rel="noreferrer"
              variant="chili"
            >
              WhatsApp direto
            </ButtonLink>
            <ButtonLink href={site.ifoodUrl} variant="ghost" target="_blank" rel="noreferrer">
              Prefiro delivery
            </ButtonLink>
          </div>
        </div>
        <div className="rounded-[2rem] border border-paper/10 bg-ink p-6 md:p-8">
          <ReserveForm />
        </div>
      </div>
    </div>
  );
}
