import { motion } from "framer-motion"
import { site } from "../data/content"
import { getOpenStatus } from "../lib/hours"

export function Hero() {
  const status = getOpenStatus()

  return (
    <section id="topo" className="relative isolate min-h-svh overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=2400&q=85"
        srcSet="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=1600&q=85 1600w, https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=2400&q=85 2400w, https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=3200&q=85 3200w"
        sizes="100vw"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/62 to-ink" />
      <div className="vignette absolute inset-0" />

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-end px-5 pb-16 pt-32 md:px-8 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-mono text-[11px] uppercase tracking-[0.32em] text-gold"
        >
          Centro Histórico · Porto Alegre
        </motion.p>

        <div className="relative mt-4">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 right-0 font-display text-[28vw] leading-none text-cream/5 md:-top-24 md:text-[12rem]"
          >
            11
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[18vw] leading-[0.85] text-cream md:text-[9.5rem]"
          >
            Onze
            <span className="italic text-gold-bright"> Bar</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-cream-dim md:text-xl"
        >
          {site.tagline} Drinks autorais, petiscos e uma casa que acolhe — no
          1172 da Fernando Machado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream-dim"
        >
          <span className="rounded-full border border-gold/35 px-3 py-1 text-gold-bright">
            {site.rating} · {site.reviews} avaliações
          </span>
          <span className="rounded-full border border-line px-3 py-1">
            {site.priceRange} por pessoa
          </span>
          <span
            className={`rounded-full border px-3 py-1 ${
              status.open
                ? "border-emerald-400/40 text-emerald-300"
                : "border-line text-cream-dim"
            }`}
          >
            {status.label}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#cardapio"
            className="rounded-full bg-gold px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-transform hover:scale-[1.02]"
          >
            Ver a carta
          </a>
          <a
            href="#visita"
            className="rounded-full border border-cream/25 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-cream hover:border-gold hover:text-gold-bright"
          >
            Como chegar
          </a>
        </motion.div>
      </div>
    </section>
  )
}
