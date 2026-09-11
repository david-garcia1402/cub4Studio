import { clinic, reviews } from "../data";
import { useReveal } from "../hooks";

export function Reviews() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="avaliacoes" ref={ref} className="reveal bg-cream px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[0.72rem] font-medium tracking-[0.32em] text-gold-deep uppercase">Google</p>
            <h2 className="font-display mt-3 text-4xl italic sm:text-5xl">O que os pacientes destacam</h2>
          </div>
          <p className="text-sm text-muted">
            Nota <strong className="text-ink">{clinic.rating}</strong> · {clinic.reviews} avaliações
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <blockquote
              key={review.name}
              className="flex flex-col justify-between rounded-[1.6rem] bg-ivory p-7 shadow-[0_12px_40px_rgba(26,22,18,0.04)]"
            >
              <p className="text-[0.98rem] leading-relaxed text-ink-soft">“{review.text}”</p>
              <footer className="mt-6 text-sm font-medium">{review.name}</footer>
            </blockquote>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted">
          Atendimento e acolhimento aparecem com frequência. Há também relatos sobre valores e
          cobertura de planos — vale confirmar previamente condições e investimentos.
        </p>
      </div>
    </section>
  );
}
