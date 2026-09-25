import { Expand, Heart, Sparkles, ShieldCheck } from 'lucide-react'
import { motion } from 'motion/react'
import gabrieli from '../assets/gabrieli.webp'
import { business } from '../data/site'
import { usePhotoViewer } from './ui/usePhotoViewer'
import { Reveal } from './ui/Reveal'

const values = [
  { icon: Sparkles, title: 'Personalizado', text: 'Cada olhar é único: técnica e modelo escolhidos para você.' },
  { icon: ShieldCheck, title: 'Segurança', text: 'Higiene rigorosa e cuidado total com sua saúde ocular.' },
  { icon: Heart, title: 'Acolhimento', text: 'Atendimento atencioso, caprichoso e cheio de carinho.' },
]

const portraitAlt = 'Retrato de Gabrieli Lazzarotto'

export function About() {
  const { openPhoto } = usePhotoViewer()
  return (
    <section id="sobre" className="pattern-swirl relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
          <Reveal className="relative">
            <motion.div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-[conic-gradient(from_140deg,rgba(201,162,74,0.35),rgba(122,27,42,0.25),rgba(201,162,74,0.35))] blur-2xl"
              animate={{ rotate: [0, 6, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="group relative overflow-hidden rounded-[2rem] rounded-tl-[6rem] shadow-glow">
              <img
                src={gabrieli}
                alt=""
                width={540}
                height={810}
                loading="lazy"
                decoding="async"
                className="pointer-events-none aspect-[2/3] w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-luxe)] group-hover:scale-[1.04]"
              />
              <button
                type="button"
                aria-label={`Ampliar foto: ${portraitAlt}`}
                onClick={() => openPhoto({ src: gabrieli, alt: portraitAlt })}
                className="absolute inset-0 cursor-zoom-in"
              />
              <span className="pointer-events-none absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/40 bg-wine-900/40 text-cream backdrop-blur-md sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
                <Expand size={15} />
              </span>
              <div className="pointer-events-none absolute inset-0 rounded-[2rem] rounded-tl-[6rem] ring-1 ring-inset ring-gold-400/40" />
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:pl-8">
          <Reveal>
            <span className="eyebrow text-wine-600">Quem sou</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-4 text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Prazer, me chamo <em className="font-normal text-wine-600 italic">Gabrieli.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">
              Tenho 21 anos e sou apaixonada pela área da beleza. Meu objetivo é elevar sua autoestima e realçar
              ainda mais essa beleza que existe em você! Tenho como missão me dedicar ao máximo para lhe trazer o
              melhor resultado.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <blockquote className="mt-7 border-l-2 border-gold-500 pl-5">
              <p className="font-display text-2xl leading-snug text-ink italic sm:text-3xl">“{business.mission}”</p>
              <footer className="mt-2 text-xs tracking-[0.25em] text-muted uppercase">— Gabrieli Lazzarotto</footer>
            </blockquote>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={0.25 + i * 0.08}>
                <div className="group h-full rounded-2xl border border-ink/6 bg-white/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-gold-400/60 hover:shadow-soft">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-wine-50 text-wine-600 transition-colors group-hover:bg-wine-600 group-hover:text-cream">
                    <v.icon size={18} strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display mt-4 text-xl font-semibold">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
