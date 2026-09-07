"use client";

import { useState } from "react";
import Image from "next/image";
import { IconStar } from "@/components/icons";
import { restaurant } from "@/lib/restaurant";
import { ReserveDialog } from "@/components/reserve-dialog";

export function Hero() {
  const [reserve, setReserve] = useState(false);

  return (
    <section
      id="topo"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <Image
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=80"
        alt="Salão aconchegante do The Raven"
        fill
        priority
        sizes="100vw"
        className="ken-burns object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,9,8,0.55)_70%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 md:px-8 md:pb-20">
        <p className="rise text-[11px] tracking-[0.42em] text-gold uppercase">
          Cidade Baixa · Porto Alegre
        </p>
        <h1 className="font-display rise mt-4 max-w-4xl text-[18vw] leading-[0.85] font-medium sm:text-8xl md:text-9xl">
          The
          <span className="italic text-gold"> Raven</span>
        </h1>
        <p className="rise mt-6 max-w-xl text-lg text-paper-dim md:text-xl">
          {restaurant.tagline}. Um mezanino intimista, iluminação baixa e a
          noite mediterrânea servida com precisão.
        </p>

        <div className="rise mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setReserve(true)}
            className="btn-gold px-7 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase"
          >
            Reservar mesa
          </button>
          <a
            href="#cardapio"
            className="border border-gold/35 px-7 py-3.5 text-xs tracking-[0.22em] text-paper uppercase transition-colors hover:border-gold hover:text-gold"
          >
            Ver cardápio
          </a>
          <div className="flex items-center gap-2 text-sm text-paper-dim">
            <IconStar className="h-4 w-4 text-gold" />
            <span className="text-paper">{restaurant.rating}</span>
            <span>· {restaurant.reviewCount.toLocaleString("pt-BR")} avaliações</span>
          </div>
        </div>
      </div>
      <ReserveDialog open={reserve} onClose={() => setReserve(false)} />
    </section>
  );
}
