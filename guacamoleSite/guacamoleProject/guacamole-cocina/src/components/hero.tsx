import { ButtonLink } from "@/components/ui/button";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/utils";
import { ArrowDown, Star } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      <Image
        src="https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg?auto=compress&cs=tinysrgb&w=2200"
        alt="Tacos mexicanos no Guacamole Cocina Mexicana"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-night/90 via-night/55 to-night/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-night/30" />
      <div className="grain absolute inset-0" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <div className="animate-rise max-w-3xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-night/40 px-3 py-1 text-xs uppercase tracking-[0.22em] text-gold-soft">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {site.rating} · {site.reviews.toLocaleString("pt-BR")} avaliações
          </p>
          <p className="font-script text-4xl text-gold-soft md:text-5xl">
            Porto Alegre
          </p>
          <h1 className="font-display mt-2 text-5xl leading-[0.95] text-paper md:text-7xl lg:text-8xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-cream/80 md:text-lg">
            {site.description} Rodízio, tequila, mariachis e a noite mais
            caliente de Petrópolis.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/reservas" className="px-7 py-3.5">
              Reservar mesa
            </ButtonLink>
            <ButtonLink href="/cardapio" variant="ghost" className="px-7 py-3.5">
              Ver cardápio
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl(
                "Olá! Quero reservar uma mesa no Guacamole Porto Alegre.",
              )}
              variant="chili"
              className="px-7 py-3.5"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </ButtonLink>
          </div>
        </div>

        <div className="mt-14 flex items-center justify-between border-t border-paper/10 pt-6 text-xs uppercase tracking-[0.18em] text-muted">
          <span>{site.neighborhood} · {site.hoursShort}</span>
          <a href="#experiencia" className="inline-flex items-center gap-2 text-gold-soft">
            Descer
            <ArrowDown className="h-4 w-4 animate-float" />
          </a>
        </div>
      </div>
    </section>
  );
}
