import Image from "next/image";
import { restaurant, services } from "@/lib/restaurant";
import { Reveal } from "@/components/reveal";

export function About() {
  return (
    <section id="sobre" className="relative border-t border-gold/10 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
            A casa
          </p>
          <h2 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
            Noite baixa,
            <span className="italic text-gold"> mesa longa</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper-dim">
            {restaurant.blurb} Aqui o jantar é um ritual: pão de entrada, vinhos
            bem escolhidos e pratos que vão do polvo do chef à picanha de
            cordeiro.
          </p>
          <div className="mt-10 grid gap-4">
            {services.map((service) => (
              <div
                key={service.label}
                className="flex items-start justify-between border-b border-gold/15 py-4"
              >
                <span className="text-paper">{service.label}</span>
                <span className="text-sm text-paper-dim">{service.hint}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative min-h-[420px] lg:col-span-7" delay={0.1}>
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1800&q=80"
              alt="Mezanino intimista do The Raven"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          </div>
          <div className="absolute right-6 bottom-6 left-6 border border-gold/25 bg-ink/70 p-5 backdrop-blur-md">
            <p className="font-display text-2xl italic text-gold">Mezanino</p>
            <p className="mt-1 text-sm text-paper-dim">
              O recanto mais pedido para jantares a dois e conversas longas.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
