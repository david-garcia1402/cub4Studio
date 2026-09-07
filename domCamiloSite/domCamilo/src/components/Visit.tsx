import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { HolidayNote } from "@/components/HoursBadge";
import { Reveal } from "@/components/Reveal";
import { hours, mapsEmbedSrc, mapsHref, restaurant, whatsappHref } from "@/lib/data";

export function Visit() {
  return (
    <section id="visite" className="scroll-mt-24 bg-ink px-5 py-24 text-cream md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.38em] text-brass">Visite</p>
            <h2 className="mt-3 font-display text-5xl leading-none md:text-6xl">
              Rua José do Patrocínio, 122.
            </h2>
            <p className="mt-5 text-cream/70">
              Niterói, Canoas — RS. Casa de almoço até 14:30. À noite, churrasco,
              pizza e refri livre: confirme o expediente pelo WhatsApp.
            </p>
          </Reveal>

          <Reveal delay={80} className="mt-8 space-y-4">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-2xl bg-white/5 p-4 transition hover:bg-white/8"
            >
              <MapPin className="mt-0.5 text-brass" size={18} />
              <span>
                <strong className="block text-cream">{restaurant.address}</strong>
                <span className="text-sm text-cream/55">{restaurant.plusCode}</span>
              </span>
            </a>
            <a
              href={restaurant.phoneHref}
              className="flex items-center gap-3 rounded-2xl bg-white/5 p-4 transition hover:bg-white/8"
            >
              <Phone className="text-brass" size={18} />
              {restaurant.phone}
            </a>
            <div className="flex items-start gap-3 rounded-2xl bg-white/5 p-4">
              <Clock className="mt-0.5 text-brass" size={18} />
              <div>
                <p className="font-medium">Almoço todos os dias · 11:00 – 14:30</p>
                <p className="text-sm text-cream/55">
                  Jantar e feriados: fale com a casa
                </p>
              </div>
            </div>
            <HolidayNote />
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ember px-6 py-3 text-sm uppercase tracking-[0.16em] text-cream hover:bg-ember-deep"
            >
              WhatsApp
            </a>
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.16em] text-cream hover:border-brass"
            >
              <Navigation size={14} />
              Rotas
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal>
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10">
              <iframe
                title="Mapa do Restaurante Dom Camilo"
                src={mapsEmbedSrc}
                className="h-[280px] w-full md:h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-4 bottom-4 rounded-full bg-ink/90 px-4 py-2 text-[11px] uppercase tracking-[0.16em] text-cream"
              >
                Abrir no Google Maps
              </a>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="mt-5 overflow-hidden rounded-[1.8rem] border border-white/10">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-left text-[11px] uppercase tracking-[0.18em] text-cream/50">
                  <tr>
                    <th className="px-5 py-3 font-medium">Dia</th>
                    <th className="px-5 py-3 font-medium">Almoço</th>
                    <th className="px-5 py-3 font-medium">Noite</th>
                  </tr>
                </thead>
                <tbody>
                  {hours.map((row) => (
                    <tr key={row.day} className="border-t border-white/8">
                      <td className="px-5 py-3 text-cream/90">{row.day}</td>
                      <td className="px-5 py-3">{row.lunch}</td>
                      <td className="px-5 py-3 text-cream/55">{row.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
