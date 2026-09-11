import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { gallery } from "../data";
import { useReveal } from "../hooks";

export function Gallery() {
  const ref = useReveal<HTMLElement>();
  const [active, setActive] = useState<number | null>(null);
  const photo = active !== null ? gallery[active] : null;

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="espaco" ref={ref} className="reveal bg-ivory px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <p className="text-[0.72rem] font-medium tracking-[0.32em] text-gold-deep uppercase">O espaço</p>
            <h2 className="font-display mt-3 text-4xl italic leading-tight sm:text-5xl">
              Moderno, limpo e organizado
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted">
            Fotos reais da clínica no Google Maps — fachada, recepção, consultório e detalhes do
            ambiente no Centro de Jaraguá do Sul.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Ampliar: ${item.alt}`}
              className={`group relative overflow-hidden rounded-[1.4rem] ${
                item.wide ? "col-span-2" : ""
              } ${i === 0 ? "aspect-[16/10] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[28rem]" : "aspect-[4/5]"}`}
            >
              <picture>
                <source srcSet={item.src} type="image/webp" />
                <img
                  src={item.fallback}
                  alt={item.alt}
                  className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${item.pos}`}
                  width={item.wide ? 1600 : 900}
                  height={item.wide ? 1000 : 1125}
                  loading="lazy"
                />
              </picture>
              <span className="absolute inset-0 bg-ink/0 transition group-hover:bg-ink/20" />
            </button>
          ))}
        </div>
      </div>

      {photo &&
        createPortal(
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/88 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Foto ampliada"
          >
            <button
              type="button"
              className="absolute top-5 right-5 rounded-full border border-cream/30 px-4 py-2 text-xs tracking-[0.2em] text-cream uppercase"
              onClick={() => setActive(null)}
            >
              Fechar
            </button>
            <picture onClick={(e) => e.stopPropagation()}>
              <source srcSet={photo.src} type="image/webp" />
              <img
                src={photo.fallback}
                alt={photo.alt}
                className="max-h-[88vh] max-w-full rounded-2xl object-contain"
              />
            </picture>
          </div>,
          document.body,
        )}
    </section>
  );
}
