import { Reveal } from "@/components/Reveal";
import { restaurant } from "@/lib/data";

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 bg-linen px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
          </div>
          <div className="absolute inset-x-4 -bottom-8 max-w-xs rounded-3xl bg-ink p-6 text-cream shadow-2xl sm:inset-x-auto sm:-right-2 sm:left-auto md:right-6">
            <p className="font-display text-2xl leading-snug">
              “Ambiente caseiro, tudo muito limpo.”
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-brass">
              Frequentadores · Google
            </p>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pl-8">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.38em] text-ember">A casa</p>
            <h2 className="mt-3 font-display text-5xl leading-none text-ink md:text-6xl">
              Mesa farta, sem pose.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-6 text-lg leading-relaxed text-smoke">
              O {restaurant.shortName} é a casa em que o almoço de domingo vira
              ritual. Buffet quente, saladas de verdade, carnes grelhadas no ponto
              e sobremesa que pede repeteco. Atmosfera informal, atendimento
              cordial e o preço que Canoas reconhece: {restaurant.priceRange} por
              pessoa.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 leading-relaxed text-smoke">
              Os frequentadores falam da comida caseira, da variedade e do
              ambiente limpo e tranquilo. No andar de baixo, o Kiko segue com
              valores ainda mais em conta — a mesma casa, outro ritmo.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-smoke">Nota</dt>
                <dd className="mt-2 font-display text-4xl">4,2</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-smoke">Avaliações</dt>
                <dd className="mt-2 font-display text-4xl">1.250</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.2em] text-smoke">R$</dt>
                <dd className="mt-2 font-display text-4xl">20–40</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
