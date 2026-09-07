import { highlights } from "@/lib/site";
import { Music2, Sparkles, UtensilsCrossed } from "lucide-react";

const icons = [UtensilsCrossed, Sparkles, Music2];

export function Experience() {
  return (
    <section id="experiencia" className="papel relative px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.24em] text-gold">
          A noite no Guaca
        </p>
        <h2 className="font-display mt-3 max-w-2xl text-4xl leading-tight text-paper md:text-6xl">
          Comida, música e mesa cheia. Nada de meia-noite tímida.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-8 text-cream/75">
          Inaugurado em 2013 em Porto Alegre, o Guacamole é um pedaço do México
          em Petrópolis: rodízio, happy hour até 20h e mariachis quando a noite
          esquenta.
        </p>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {highlights.map((item, index) => {
            const Icon = icons[index];
            return (
              <article
                key={item.title}
                className="group rounded-3xl border border-paper/10 bg-ink/80 p-7 transition hover:-translate-y-1 hover:border-gold/40"
              >
                <Icon className="h-6 w-6 text-gold" />
                <p className="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
                  {item.note}
                </p>
                <h3 className="font-display mt-2 text-3xl text-paper">
                  {item.title}
                </h3>
                <p className="mt-3 font-display text-2xl text-gold-soft">
                  {item.price}
                  {"was" in item && item.was ? (
                    <span className="ml-2 text-base text-muted line-through">
                      {item.was}
                    </span>
                  ) : null}
                </p>
                <p className="mt-4 text-sm leading-7 text-cream/70">{item.copy}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
