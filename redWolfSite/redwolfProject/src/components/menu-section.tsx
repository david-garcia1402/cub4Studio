import { useMemo, useState } from "react";
import { CoverImage } from "@/components/cover-image";
import { formatBRL, menu, type MenuItem } from "@/lib/brand";
import { useCart } from "@/lib/cart";
import { Reveal } from "@/components/reveal";

const tabs = [
  { id: "pizzas", label: "Pizzas" },
  { id: "burgers", label: "Burgers" },
  { id: "extras", label: "Extras" },
] as const;

export function MenuSection() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("pizzas");
  const items = useMemo(
    () => menu.filter((item) => item.category === tab),
    [tab],
  );

  return (
    <section id="cardapio" className="border-t border-ember/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] tracking-[0.32em] text-ember-bright uppercase">
                Cardápio piloto
              </p>
              <h2 className="font-display mt-3 text-5xl md:text-6xl">
                Os mais pedidos
              </h2>
            </div>
            <p className="max-w-md text-paper-dim">
              Sabores citados pelos clientes: calabresa acebolada, quatro
              queijos com brie, alcatra barbecue e as Famosinhas.
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
                  ? "bg-ember text-paper"
                  : "border border-ember/25 text-paper-dim hover:text-paper"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <DishCard key={item.id} item={item} delay={index * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DishCard({ item, delay }: { item: MenuItem; delay: number }) {
  const { add } = useCart();

  return (
    <Reveal delay={delay}>
      <article className="group overflow-hidden border border-ember/15 bg-ink-soft">
        <div className="relative aspect-[4/3] overflow-hidden">
          <CoverImage
            src={item.image}
            alt={item.imageAlt}
            className="transition-transform duration-700 group-hover:scale-105"
          />
          {item.popular && (
            <span className="absolute top-3 left-3 bg-ember px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase">
              Mais pedido
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl">{item.name}</h3>
            <span className="shrink-0 text-ember-bright">
              {formatBRL(item.price)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-paper-dim">
            {item.description}
          </p>
          <button
            type="button"
            onClick={() => add(item)}
            className="btn-ember mt-5 w-full px-4 py-3 text-[11px] font-semibold tracking-[0.18em] uppercase"
          >
            Adicionar
          </button>
        </div>
      </article>
    </Reveal>
  );
}
