import { ButtonLink } from "@/components/ui/button";
import { menu } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cardápio",
  description:
    "Rodízio mexicano do Guacamole Porto Alegre: tacos, burritos, quesadillas, molhos e drinks.",
};

export default function CardapioPage() {
  return (
    <div className="px-5 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">
          Rodízio mexicano
        </p>
        <h1 className="font-display mt-3 text-5xl text-paper md:text-7xl">
          Cardápio da casa
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-cream/75">
          A sequência que o Google já conhece de cor: nachos, tacos, guacamole,
          quesadillas e a jarra de margarita. Preços de rodízio sob consulta na
          reserva.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/reservas">Reservar mesa</ButtonLink>
          <ButtonLink href="/#visita" variant="ghost">
            Como chegar
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl border border-paper/10 bg-ink p-7">
            <h2 className="font-display text-3xl text-paper">{menu.sauces.title}</h2>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-cream/75">
              {menu.sauces.items.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </article>
          <article className="rounded-3xl border border-paper/10 bg-ink p-7">
            <h2 className="font-display text-3xl text-paper">{menu.combo.title}</h2>
            <ul className="mt-5 space-y-2 text-sm text-cream/75">
              {menu.combo.items.map((item) => (
                <li key={item}>· {item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="mt-8 space-y-8">
          {menu.sections.map((section) => (
            <section key={section.title} className="rounded-3xl border border-paper/10 bg-ink p-7 md:p-10">
              <h2 className="font-display text-4xl text-gold-soft">{section.title}</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {section.items.map((item) => (
                  <article key={item.name}>
                    <h3 className="text-lg font-semibold text-paper">{item.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-cream/70">{item.desc}</p>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
