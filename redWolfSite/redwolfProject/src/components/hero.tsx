import { CoverImage } from "@/components/cover-image";
import { IconStar } from "@/components/icons";
import { brand } from "@/lib/brand";
import { useCart } from "@/lib/cart";

export function Hero() {
  const { setDrawerOpen } = useCart();

  return (
    <section
      id="topo"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      <CoverImage
        src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=2400&q=80"
        alt="Pizza de longa fermentação da Redwolf"
        className="ken-burns"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/25 to-ink/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(7,7,8,0.35)_78%)]" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-16 md:px-8 md:pb-20">
        <p className="rise text-[11px] tracking-[0.42em] text-ember-bright uppercase">
          Jaraguá do Sul · Schroeder
        </p>
        <h1 className="font-display rise mt-4 max-w-5xl text-[16vw] leading-[0.86] font-semibold drop-shadow-[0_6px_30px_rgba(0,0,0,0.75)] sm:text-8xl md:text-9xl">
          RED
          <span className="text-ember-bright">WOLF</span>
        </h1>
        <p className="rise mt-2 font-display text-2xl tracking-[0.28em] text-paper-dim uppercase md:text-3xl">
          Pizzas
        </p>
        <p className="rise mt-6 max-w-xl text-lg text-paper-dim md:text-xl">
          {brand.tagline}. Massa alveolada, DOC Certified e o pedido no
          WhatsApp — sem caçar link na bio.
        </p>

        <div className="rise mt-8 flex flex-wrap items-center gap-4">
          <a
            href="#pedir"
            className="btn-ember px-7 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase"
          >
            Pedir agora
          </a>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="border border-ember/40 px-7 py-3.5 text-xs tracking-[0.22em] text-paper uppercase transition-colors hover:border-ember hover:text-ember-bright"
          >
            Montar pedido
          </button>
          <div className="flex items-center gap-2 text-sm text-paper-dim">
            <IconStar className="h-4 w-4 text-ember-bright" />
            <span className="text-paper">{brand.rating}</span>
            <span>· {brand.reviewCount} avaliações · {brand.followers}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
