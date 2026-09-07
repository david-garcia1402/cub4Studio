import { ButtonLink } from "@/components/ui/button";
import { gallery } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";
import Image from "next/image";

export function Events() {
  return (
    <section className="bg-ink px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Aniversário no Guaca
          </p>
          <h2 className="font-display mt-3 text-4xl text-paper md:text-6xl">
            A festa já vem com tequila e churros.
          </h2>
          <ul className="mt-8 space-y-3 text-sm leading-7 text-cream/75">
            <li>— Shot de tequila com tequileiro</li>
            <li>— Sobremesa exclusiva de aniversário</li>
            <li>— Isenção de couvert nos dias de atração especial</li>
            <li>— Até R$ 150 em consumo para reservas com 10+ convidados</li>
          </ul>
          <p className="mt-5 text-xs text-muted">
            Desconto de 50% na comanda do aniversariante, limitado a R$ 150.
            Consulte datas comemorativas.
          </p>
          <div className="mt-8">
            <ButtonLink
              href={whatsappUrl(
                "Olá! Quero reservar uma mesa de aniversário no Guacamole Porto Alegre.",
              )}
              target="_blank"
              rel="noreferrer"
            >
              Fechar data
            </ButtonLink>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {gallery.map((photo, index) => (
            <figure
              key={photo.src}
              className={`relative overflow-hidden rounded-3xl ${
                index % 2 === 1 ? "mt-8" : ""
              } min-h-[220px]`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="40vw"
              />
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-night/70 px-3 py-1 text-[11px] uppercase tracking-wider text-cream">
                {photo.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
