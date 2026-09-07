import { Reveal } from "@/components/Reveal";
import { experiences } from "@/lib/data";

export function Experiences() {
  return (
    <section id="experiencias" className="scroll-mt-24 bg-ink px-5 py-24 text-cream md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.38em] text-brass">
            Três jeitos de sentar à mesa
          </p>
          <h2 className="mt-3 max-w-xl font-display text-5xl leading-none md:text-6xl">
            Do almoço de semana à noite de pizza.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {experiences.map((item, index) => (
            <Reveal key={item.id} delay={index * 90}>
              <article className="group overflow-hidden rounded-[1.8rem] bg-bark">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${item.image})` }}
                    role="img"
                    aria-label={item.alt}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-[11px] uppercase tracking-[0.28em] text-brass">
                    {item.eyebrow}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-3xl">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-cream/70">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
