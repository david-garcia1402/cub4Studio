import type { Metadata } from "next";
import { IconClock, IconPhone, IconPin } from "@/components/icons";
import { branches } from "@/data/branches";
import { WhatsAppMark } from "@/components/whatsapp-mark";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Unidades",
  description:
    "Seis unidades Locajá em Santa Catarina: Jaraguá do Sul, São Bento do Sul, Itapema, Itajaí, Porto Belo e Penha.",
};

export default function UnitsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-28 pb-20">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-locaja-dark">
        Onde estamos
      </p>
      <h1 className="display mt-2 text-5xl font-black md:text-6xl">Unidades Locajá</h1>
      <p className="mt-4 max-w-2xl text-steel">
        Atendemos o Vale do Itajaí e o Litoral Norte. Escolha a filial mais
        próxima da obra — o mapa abaixo abre a rota no Google Maps.
      </p>

      <div className="mt-10 grid gap-8">
        {branches.map((branch) => (
          <article
            key={branch.id}
            id={branch.id}
            className="overflow-hidden rounded-[2rem] border border-black/5 bg-paper shadow-sm"
          >
            <div className="grid lg:grid-cols-2">
              <div className="p-6 md:p-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-locaja-dark">
                  {branch.kind}
                </p>
                <h2 className="display mt-1 text-4xl font-black">{branch.city}</h2>
                <div className="mt-5 grid gap-3 text-sm text-steel">
                  <p className="flex gap-2">
                    <IconPin size={18} />
                    {branch.address}, {branch.neighborhood} — {branch.state}
                  </p>
                  <p className="flex gap-2">
                    <IconPhone size={18} />
                    {branch.phone}
                    {branch.mobile ? ` · ${branch.mobile}` : ""}
                  </p>
                  <p className="flex gap-2">
                    <IconClock size={18} />
                    {branch.hours}
                    {branch.saturday ? ` · ${branch.saturday}` : ""}
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Abrir no Google Maps
                  </a>
                  <a
                    href={whatsappLink(
                      branch.mobile ?? branch.phone,
                      `Olá! Quero falar com a unidade de ${branch.city}.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-locaja px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    <WhatsAppMark size={18} />
                    WhatsApp desta unidade
                  </a>
                </div>
              </div>
              <iframe
                title={`Mapa Locajá ${branch.city}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(branch.mapQuery)}&z=16&output=embed`}
                className="min-h-[280px] w-full border-0 lg:min-h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
