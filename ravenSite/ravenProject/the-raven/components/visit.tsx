"use client";

import { useState } from "react";
import { IconClock, IconMapPin, IconPhone } from "@/components/icons";
import { hours, restaurant, sundayPeak } from "@/lib/restaurant";
import { Reveal } from "@/components/reveal";
import { ReserveDialog } from "@/components/reserve-dialog";

export function Visit() {
  const [reserve, setReserve] = useState(false);

  return (
    <section id="visitar" className="border-t border-gold/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
            Visitar
          </p>
          <h2 className="font-display mt-3 text-5xl md:text-6xl">
            Cidade Baixa,
            <span className="italic text-gold"> a partir das 19h</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          <Reveal className="space-y-8 lg:col-span-5">
            <div className="flex gap-4">
              <IconMapPin className="mt-1 h-5 w-5 text-gold" />
              <div>
                <p className="text-paper">{restaurant.address}</p>
                <p className="text-paper-dim">
                  {restaurant.city}, {restaurant.cep}
                </p>
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-gold underline-offset-4 hover:underline"
                >
                  Abrir rotas
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <IconPhone className="mt-1 h-5 w-5 text-gold" />
              <div>
                <a
                  href={restaurant.phoneHref}
                  className="text-paper hover:text-gold"
                >
                  {restaurant.phone}
                </a>
                <p className="text-sm text-paper-dim">
                  Reservas e pedidos para retirada
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <IconClock className="mt-1 h-5 w-5 text-gold" />
              <div className="w-full">
                <p className="mb-3 text-paper">Horários</p>
                <ul className="space-y-2">
                  {hours.map((row) => (
                    <li
                      key={row.day}
                      className="flex justify-between gap-4 border-b border-gold/10 pb-2 text-sm"
                    >
                      <span className="text-paper-dim">{row.day}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">
                Pico de domingo
              </p>
              <div className="mt-4 flex h-28 items-end gap-1.5">
                {sundayPeak.map((slot) => (
                  <div
                    key={slot.hour}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    <div
                      className="w-full bg-gradient-to-t from-gold/30 to-gold"
                      style={{ height: `${slot.value}%` }}
                    />
                    <span className="text-[10px] text-paper-dim">
                      {slot.hour}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setReserve(true)}
              className="btn-gold px-7 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase"
            >
              Reservar mesa
            </button>
          </Reveal>

          <Reveal className="min-h-[420px] overflow-hidden border border-gold/15 lg:col-span-7">
            <iframe
              title="Mapa do The Raven"
              src={restaurant.mapsEmbed}
              className="h-full min-h-[420px] w-full grayscale contrast-125"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </div>
      <ReserveDialog open={reserve} onClose={() => setReserve(false)} />
    </section>
  );
}
