import { ButtonLink } from "@/components/ui/button";
import { dishes } from "@/lib/site";
import Image from "next/image";

export function MenuHighlights() {
  return (
    <section id="cardapio" className="bg-ink px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-gold">
              Mais pedidos
            </p>
            <h2 className="font-display mt-3 text-4xl text-paper md:text-6xl">
              O que a mesa pede primeiro.
            </h2>
          </div>
          <ButtonLink href="/cardapio" variant="ghost">
            Cardápio completo
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish, index) => (
            <article
              key={dish.name}
              className={`group relative overflow-hidden rounded-3xl ${
                index === 0 ? "sm:col-span-2 lg:col-span-2 min-h-[380px]" : "min-h-[320px]"
              }`}
            >
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night via-night/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="rounded-full bg-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-night">
                  {dish.tag}
                </span>
                <h3 className="font-display mt-3 text-3xl text-paper">{dish.name}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-cream/75">
                  {dish.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
