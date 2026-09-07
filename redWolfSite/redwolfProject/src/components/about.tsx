import { CoverImage } from "@/components/cover-image";
import { brand } from "@/lib/brand";
import { Reveal } from "@/components/reveal";

const pillars = [
  { label: "Longa fermentação", hint: "48 horas de massa" },
  { label: "DOC Certified", hint: "Selo de qualidade" },
  { label: "Maionese caseira", hint: "O extra mais pedido" },
];

export function About() {
  return (
    <section id="sobre" className="relative border-t border-ember/15 bg-ink">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 md:px-8 lg:grid-cols-12 lg:gap-16 lg:py-32">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.32em] text-ember-bright uppercase">
            A matilha
          </p>
          <h2 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
            {brand.motto}.
            <span className="italic text-ember-bright"> Nada mais.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-paper-dim">
            A Redwolf nasceu no Vale do Itapocu com pizza de fermentação lenta
            e burger de rua gourmet. O Instagram já fala pela casa — o site só
            organiza o pedido.
          </p>
          <div className="mt-10 grid gap-4">
            {pillars.map((item) => (
              <div
                key={item.label}
                className="flex items-start justify-between border-b border-ember/15 py-4"
              >
                <span className="text-paper">{item.label}</span>
                <span className="text-sm text-paper-dim">{item.hint}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative min-h-[420px] lg:col-span-7" delay={0.1}>
          <div className="absolute inset-0 overflow-hidden">
            <CoverImage
              src="https://images.unsplash.com/photo-1571066811602-716837d681de?auto=format&fit=crop&w=1800&q=80"
              alt="Massa de longa fermentação"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          </div>
          <div className="absolute right-6 bottom-6 left-6 border border-ember/25 bg-ink/70 p-5 backdrop-blur-md">
            <p className="font-display text-2xl italic text-ember-bright">
              DOC Certified Quality
            </p>
            <p className="mt-1 text-sm text-paper-dim">
              O mesmo selo que aparece no destaque do Instagram — agora no
              hero do site.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
