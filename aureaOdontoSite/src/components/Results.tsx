import { useReveal } from "../hooks";

export function Results() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="resultados" ref={ref} className="reveal bg-ink px-5 py-24 text-cream md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[0.72rem] font-medium tracking-[0.32em] text-gold-soft uppercase">Resultados</p>
          <h2 className="font-display mt-3 text-4xl italic leading-tight sm:text-5xl">
            Naturalidade que transforma sorrisos
          </h2>
          <p className="mt-5 text-cream/70">
            Casos reais publicados no perfil da clínica: lentes, facetas e reabilitação estética
            com acabamento preciso.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <figure className="overflow-hidden rounded-[1.8rem] bg-ink-soft">
            <picture>
              <source srcSet="/images/antes-depois.webp" type="image/webp" />
              <img
                src="/images/08-equipe.jpg"
                alt="Antes e depois de reabilitação estética do sorriso"
                className="aspect-[3/4] w-full object-cover"
                width={1200}
                height={1700}
                loading="lazy"
              />
            </picture>
            <figcaption className="px-6 py-5 text-sm text-cream/70">
              Antes e depois · reabilitação do sorriso
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[1.8rem] bg-ink-soft">
            <picture>
              <source srcSet="/images/caso-lente.webp" type="image/webp" />
              <img
                src="/images/06-espaco.jpg"
                alt="Caso clínico de lente de contato dental"
                className="aspect-[3/4] w-full object-cover object-top"
                width={1200}
                height={1300}
                loading="lazy"
              />
            </picture>
            <figcaption className="px-6 py-5 text-sm text-cream/70">
              Lente de contato · caso clínico da equipe
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-[1.8rem] bg-ink-soft">
            <picture>
              <source srcSet="/images/lentes.webp" type="image/webp" />
              <img
                src="/images/09-tratamento.jpg"
                alt="Lentes de contato dental em detalhe"
                className="aspect-[3/4] w-full object-cover"
                width={1200}
                height={1600}
                loading="lazy"
              />
            </picture>
            <figcaption className="px-6 py-5 text-sm text-cream/70">
              Lentes e facetas com acabamento natural
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
