import { gallery } from "../data/content"

export function Gallery() {
  return (
    <section id="casa" className="scroll-mt-24 px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
          Ambiente
        </p>
        <h2 className="mt-3 max-w-2xl font-display text-5xl text-cream md:text-6xl">
          Luz baixa, copo cheio,{" "}
          <span className="italic text-gold-bright">música no ponto.</span>
        </h2>

        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
          {gallery.map((photo) => (
            <figure
              key={photo.src}
              className={`overflow-hidden rounded-3xl border border-line ${
                photo.span === "wide"
                  ? "col-span-2"
                  : photo.span === "tall"
                    ? "row-span-2"
                    : ""
              }`}
            >
              <img
                src={photo.src}
                srcSet={`${photo.src} 2000w`}
                sizes={photo.span === "wide" ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
