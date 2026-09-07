import { highlights } from "@/lib/brand";
import { Reveal } from "@/components/reveal";

export function Highlights() {
  return (
    <section className="border-t border-ember/15 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-ember-bright uppercase">
            Como no Instagram
          </p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">Destaques</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
          {highlights.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <a
                href={item.href}
                className="group glow-ring flex flex-col items-center gap-3 border border-ember/20 bg-ink-soft px-3 py-6 text-center transition-colors hover:border-ember"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full border border-ember bg-ink font-display text-lg text-ember-bright">
                  {item.label.slice(0, 1)}
                </span>
                <span className="text-[11px] tracking-[0.18em] uppercase">
                  {item.label}
                </span>
                <span className="text-xs text-paper-dim">{item.hint}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
