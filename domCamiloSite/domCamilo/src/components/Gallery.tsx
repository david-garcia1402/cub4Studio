import { Reveal } from "@/components/Reveal";
import { gallery } from "@/lib/data";

export function Gallery() {
  return (
    <section className="bg-linen px-5 py-20 md:px-8">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.38em] text-ember">
            Fotos da casa
          </p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">
            Fogo, mesa e o ritmo do almoço.
          </h2>
        </Reveal>

        <div className="mt-10 grid auto-rows-[180px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-4">
          {gallery.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={index * 60}
              className={`overflow-hidden rounded-3xl ${photo.className}`}
            >
              <div
                className="h-full min-h-[180px] bg-cover bg-center"
                style={{ backgroundImage: `url(${photo.src})` }}
                role="img"
                aria-label={photo.alt}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
