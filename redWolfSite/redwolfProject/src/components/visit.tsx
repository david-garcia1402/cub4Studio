import { IconClock, IconMapPin, IconPhone } from "@/components/icons";
import { hours, units } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/reveal";

export function Visit() {
  const { unit } = useCart();
  const selected = units[unit];

  return (
    <section id="visitar" className="border-t border-ember/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-ember-bright uppercase">
            Destaque Horários
          </p>
          <h2 className="font-display mt-3 text-5xl md:text-6xl">
            Quarta a domingo,
            <span className="italic text-ember-bright"> a partir das 18h</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="space-y-8 lg:col-span-5">
            <div className="flex gap-4">
              <IconMapPin className="mt-1 h-5 w-5 text-ember-bright" />
              <div>
                <p className="text-paper">{selected.city}</p>
                <p className="text-paper-dim">
                  {selected.address} · {selected.cep}
                </p>
                <a
                  href={selected.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-ember-bright underline-offset-4 hover:underline"
                >
                  Abrir rotas
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <IconPhone className="mt-1 h-5 w-5 text-ember-bright" />
              <div>
                <p className="text-paper">{selected.whatsappDisplay}</p>
                <p className="text-sm text-paper-dim">
                  WhatsApp de reservas e delivery
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <IconClock className="mt-1 h-5 w-5 text-ember-bright" />
              <div className="w-full">
                <p className="mb-3 text-paper">Salão e delivery</p>
                <ul className="space-y-2">
                  {hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex justify-between gap-4 border-b border-ember/10 pb-2 text-sm"
                    >
                      <span className="text-paper-dim">{row.day}</span>
                      <span>
                        {row.salon} · {row.delivery}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal className="min-h-[420px] overflow-hidden border border-ember/15 lg:col-span-7">
            <iframe
              title={`Mapa da Redwolf em ${selected.city}`}
              src={selected.mapsEmbed}
              className="h-full min-h-[420px] w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
