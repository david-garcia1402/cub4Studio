import { Reveal } from "@/components/Reveal";
import { menuItems, whatsappHref } from "@/lib/data";

export function MenuHighlights() {
  return (
    <section id="cardapio" className="scroll-mt-24 bg-cream px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="text-[11px] uppercase tracking-[0.38em] text-ember">
              Cardápio e destaques
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none text-ink md:text-6xl">
              O que a casa não larga.
            </h2>
          </Reveal>
          <Reveal>
            <p className="max-w-sm text-smoke">
              Mais pedidos no Google: mocotó e pizza. No buffet, o povo aponta
              grelhados, maionese e banana empanada.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <article className="overflow-hidden rounded-[1.6rem] bg-linen shadow-[0_20px_50px_-30px_rgba(22,17,13,0.45)]">
                <div
                  className="aspect-[16/10] bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.alt}
                />
                <div className="p-6">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-ember">
                    {item.badge}
                  </span>
                  <h3 className="mt-2 font-display text-3xl text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-smoke">{item.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-full bg-ink px-7 py-3.5 text-sm uppercase tracking-[0.16em] text-cream transition hover:bg-bark"
          >
            Pedir pelo WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}
