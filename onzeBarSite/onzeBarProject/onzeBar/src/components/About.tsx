import { motion } from "framer-motion"
import { Heart, Music2, Sparkles } from "lucide-react"

const facts = [
  {
    icon: Sparkles,
    title: "Carta viva",
    text: "Coquetéis autorais que mudam, clássicos no ponto e o Onze Mule que virou pedido obrigatório.",
  },
  {
    icon: Music2,
    title: "Noite com trilha",
    text: "Setlists caprichadas e DJs. Ambiente animado, sem perder o aconchego de casa.",
  },
  {
    icon: Heart,
    title: "Casa que acolhe",
    text: "Empresa que acolhe a comunidade LGBTQ+. Segura, afetiva e com equipe de verdade.",
  },
]

export function About() {
  return (
    <section id="sobre" className="scroll-mt-24 px-5 py-24 md:px-8">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-gold">
            1172 · Fernando Machado
          </p>
          <h2 className="mt-3 font-display text-5xl leading-tight text-cream md:text-6xl">
            O ponto da rua.
            <span className="italic text-gold-bright"> A casa da noite.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-dim">
            No Centro Histórico, perto do Viaduto Otávio Rocha, o Onze é o bar
            que a galera trata como segunda casa: drinks autorais, petiscos
            quentes, cerveja gelada e um atendimento que as avaliações
            repetem pelo nome.
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-cream-dim">
            Terça a sábado, a partir das 18h. Às vezes, domingo. Uma casa
            LGBTQ+ friendly, com vibe de encontro — pra namorar, reunir os
            amigos ou só ficar na cadeira de praia até o próximo round.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {facts.map((fact) => (
              <motion.article
                key={fact.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="border-t border-line pt-4"
              >
                <fact.icon className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <h3 className="mt-3 font-display text-xl text-cream">
                  {fact.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-dim">
                  {fact.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative mb-8"
        >
          <div className="overflow-hidden rounded-[2rem] border border-line">
            <img
              src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1600&q=85"
              srcSet="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85 1200w, https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=85 2000w"
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt="Interior aconchegante de um bar à noite"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <figcaption className="absolute -bottom-5 left-6 right-6 rounded-2xl border border-line bg-ink-soft/90 px-5 py-4 backdrop-blur-md">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">
              Casa LGBTQ+
            </p>
            <p className="mt-1 text-sm text-cream">
              Acolhimento, música boa e equipe que chama pelo nome.
            </p>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
