import { useState } from "react"
import { motion } from "framer-motion"
import { menu } from "../data/content"

const tabs = [
  { id: "drinks", label: "Drinks" },
  { id: "food", label: "Petiscos" },
] as const

export function Menu() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("drinks")
  const items = menu[tab]

  return (
    <section id="cardapio" className="scroll-mt-24 bg-ink-soft px-5 py-24 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
              Carta & destaques
            </p>
            <h2 className="mt-3 font-display text-5xl text-cream md:text-6xl">
              O que a mesa pede.
            </h2>
          </div>
          <div className="flex gap-2 rounded-full border border-line p-1">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                  tab === item.id
                    ? "bg-gold text-ink"
                    : "text-cream-dim hover:text-cream"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05 }}
              className="group overflow-hidden rounded-[1.6rem] border border-line bg-ink"
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  srcSet={`${item.image} 1600w`}
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  alt={item.name}
                  className="aspect-[5/4] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur">
                  {item.tag}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-2xl text-cream">{item.name}</h3>
                  <span className="font-mono text-[11px] text-cream-dim">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-cream-dim">
                  {item.text}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-10 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-cream-dim">
          Cardápio vivo · confirme no bar ou no Instagram
        </p>
      </div>
    </section>
  )
}
