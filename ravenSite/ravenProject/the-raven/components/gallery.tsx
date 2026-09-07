import Image from "next/image";
import { gallery } from "@/lib/restaurant";
import { Reveal } from "@/components/reveal";

export function Gallery() {
  return (
    <section id="galeria" className="border-t border-gold/10 bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8 lg:py-32">
        <Reveal>
          <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
            Fotos
          </p>
          <h2 className="font-display mt-3 text-5xl md:text-6xl">
            A noite em imagens
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gallery.map((photo, index) => (
            <Reveal
              key={photo.src}
              delay={index * 0.04}
              className={
                photo.span === "lg"
                  ? "col-span-2 row-span-2 min-h-[280px] md:min-h-[420px]"
                  : "min-h-[180px] md:min-h-[200px]"
              }
            >
              <figure className="group relative h-full overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    photo.span === "lg"
                      ? "(max-width: 768px) 100vw, 50vw"
                      : "(max-width: 768px) 50vw, 25vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4 text-xs tracking-[0.18em] text-paper uppercase">
                  {photo.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
