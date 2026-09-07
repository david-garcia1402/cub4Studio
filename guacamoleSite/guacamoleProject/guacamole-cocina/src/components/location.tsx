import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";

export function Location() {
  return (
    <section id="visita" className="px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[2rem] border border-paper/10 bg-ink lg:grid-cols-2">
        <div className="p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">
            Como chegar
          </p>
          <h2 className="font-display mt-3 text-4xl text-paper md:text-5xl">
            Petrópolis, a uma mesa de distância.
          </h2>
          <dl className="mt-8 space-y-5 text-sm">
            <div>
              <dt className="uppercase tracking-[0.16em] text-muted">Endereço</dt>
              <dd className="mt-1 text-cream/85">{site.addressFull}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-muted">Horário</dt>
              <dd className="mt-1 text-cream/85">{site.hours}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-muted">Serviços</dt>
              <dd className="mt-1 text-cream/85">{site.services.join(" · ")}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.16em] text-muted">Telefone</dt>
              <dd className="mt-1 text-cream/85">{site.phoneDisplay}</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={site.mapsUrl} target="_blank" rel="noreferrer">
              Abrir rotas
            </ButtonLink>
            <ButtonLink href="/reservas" variant="ghost">
              Reservar agora
            </ButtonLink>
          </div>
        </div>
        <iframe
          title="Mapa do Guacamole Cocina Mexicana em Porto Alegre"
          className="min-h-[360px] w-full border-0 grayscale-[0.2] contrast-125"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://maps.google.com/maps?q=Rua%20Desembargador%20Augusto%20Loureiro%20Lima%20165%20Petropolis%20Porto%20Alegre&t=&z=16&ie=UTF8&iwloc=&output=embed"
        />
      </div>
    </section>
  );
}
