"use client";

import { useState } from "react";
import Image from "next/image";
import { menu, type MenuItem } from "@/lib/restaurant";
import { Reveal } from "@/components/reveal";

const tabs = [
  { id: "principais", label: "Principais" },
  { id: "entradas", label: "Entradas" },
  { id: "sobremesas", label: "Sobremesas" },
] as const;

export function MenuSection() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("principais");
  const items = menu[tab];

  return (
    <section id="cardapio" className="border-t border-gold/10 bg-ink-soft">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
                Cardápio
              </p>
              <h2 className="font-display mt-3 text-5xl md:text-6xl">
                Os mais pedidos
              </h2>
            </div>
            <p className="max-w-md text-paper-dim">
              Mediterrâneo de alta gastronomia: frutos do mar, cortes nobres e
              sobremesas clássicas — do risoto de bacalhau ao crème brûlée.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 flex gap-2 overflow-x-auto no-scrollbar">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={`px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors ${
                tab === item.id
                  ? "bg-gold text-ink"
                  : "border border-gold/25 text-paper-dim hover:text-paper"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <DishCard key={item.name} item={item} delay={index * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DishCard({ item, delay }: { item: MenuItem; delay: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group overflow-hidden border border-gold/15 bg-ink">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {item.popular && (
            <span className="absolute top-3 left-3 bg-gold px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] text-ink uppercase">
              Mais pedido
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl">{item.name}</h3>
            <span className="shrink-0 text-gold">R$ {item.price}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-paper-dim">
            {item.description}
          </p>
        </div>
      </article>
    </Reveal>
  );
}
