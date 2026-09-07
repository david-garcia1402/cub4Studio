import { Clock, MapPin, Phone } from "lucide-react"
import { hours, services, site } from "../data/content"
import { getOpenStatus } from "../lib/hours"
import { InstagramIcon } from "./InstagramIcon"

export function Visit() {
  const status = getOpenStatus()

  return (
    <section id="visita" className="scroll-mt-24 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
          Visite
        </p>
        <h2 className="mt-3 font-display text-5xl text-cream md:text-6xl">
          Fernando Machado, 1172.
        </h2>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[1.8rem] border border-line bg-ink-soft p-7 md:p-9">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 text-gold" strokeWidth={1.5} />
              <div>
                <p className="font-display text-2xl text-cream">{site.address}</p>
                <p className="mt-1 text-cream-dim">
                  {site.neighborhood}
                  <br />
                  CEP {site.cep} · {site.plusCode}
                </p>
              </div>
            </div>

            <div className="gold-rule my-8" />

            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-4 w-4 text-gold" strokeWidth={1.5} />
              <div className="w-full">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                  {status.label}
                </p>
                <ul className="mt-4 space-y-2">
                  {hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-cream">{row.day}</span>
                      <span className="font-mono text-[12px] text-cream-dim">
                        {row.time}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-cream-dim">
                  Feriados podem alterar o horário. Confirme no Instagram.
                </p>
              </div>
            </div>

            <div className="gold-rule my-8" />

            <div className="flex flex-col gap-3">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-3 text-cream hover:text-gold-bright"
              >
                <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
                {site.phone}
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-cream hover:text-gold-bright"
              >
                <InstagramIcon className="h-4 w-4 text-gold" />
                {site.instagramHandle}
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {services.map((service) => (
                <span
                  key={service}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cream-dim"
                >
                  {service}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gold px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
              >
                WhatsApp
              </a>
              <a
                href={site.maps}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cream/25 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream"
              >
                Rotas
              </a>
            </div>
          </div>

          <div className="min-h-[420px] overflow-hidden rounded-[1.8rem] border border-line">
            <iframe
              title="Mapa do Onze Bar"
              src={site.mapsEmbed}
              className="h-full min-h-[420px] w-full grayscale contrast-125 invert-[0.88] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
