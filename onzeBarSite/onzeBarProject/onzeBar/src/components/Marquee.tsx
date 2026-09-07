const items = [
  "Drinks autorais",
  "Cerveja gelada",
  "DJ sets",
  "Petiscos",
  "Casa LGBTQ+",
  "Centro Histórico",
  "Onze Mule",
  "Fernando Machado",
]

export function Marquee() {
  const loop = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-line bg-ink-soft py-4">
      <div className="marquee-track flex w-max gap-10 pr-10">
        {loop.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 font-mono text-[11px] uppercase tracking-[0.28em] text-gold"
          >
            {item}
            <span className="text-cream/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
