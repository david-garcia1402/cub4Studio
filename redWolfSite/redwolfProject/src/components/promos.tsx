import { promotions } from "@/lib/brand";
import { Reveal } from "@/components/reveal";

export function Promos() {
  return (
    <section id="promos" className="border-t border-ember/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-ember-bright uppercase">
            Destaque Promoções
          </p>
          <h2 className="font-display mt-3 text-5xl">No ar nesta semana</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {promotions.map((promo, index) => (
            <Reveal key={promo.title} delay={index * 0.07}>
              <article className="border border-ember/20 bg-ink-soft p-6">
                <span className="text-[10px] tracking-[0.2em] text-ember-bright uppercase">
                  {promo.tag}
                </span>
                <h3 className="font-display mt-3 text-3xl">{promo.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper-dim">
                  {promo.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
