import { ArrowDown, MapPin, Star } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import heroImg from '../assets/hero.webp'
import { business, defaultWhatsappMessage, whatsappLink } from '../data/site'
import { Button } from './ui/Button'
import { usePhotoViewer } from './ui/usePhotoViewer'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

const ease = [0.22, 1, 0.36, 1] as const

const heroAlt = 'Gabrieli Lazzarotto, lash designer, segurando escovinhas de cílios sob um ring light'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { openPhoto } = usePhotoViewer()
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '35%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-wine-900 text-cream"
    >
      <motion.div style={{ y: imgY }} className="absolute inset-0 -z-10 lg:left-[18%]">
        <motion.img
          src={heroImg}
          alt=""
          width={1081}
          height={1441}
          fetchPriority="high"
          decoding="async"
          initial={{ scale: 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease }}
          className="hero-photo pointer-events-none h-full w-full object-cover object-[62%_20%] sm:object-[center_20%]"
        />
        <div className="hero-shade pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(47,9,16,0.35)_0%,rgba(47,9,16,0.15)_35%,rgba(47,9,16,0.85)_75%,#2f0910_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(122,27,42,0.55),transparent_60%)]" />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-[linear-gradient(90deg,#2f0910_0%,rgba(47,9,16,0.7)_18%,transparent_45%)] lg:block"
      />

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] -z-10 h-[38rem] w-[38rem] rounded-full border border-gold-400/25 md:right-[8%]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        <span className="absolute top-1/2 -left-1 h-2 w-2 -translate-y-1/2 rounded-full bg-gold-400 shadow-[0_0_20px_4px_rgba(201,162,74,0.6)]" />
      </motion.div>

      <button
        type="button"
        aria-label={`Ampliar foto: ${heroAlt}`}
        onClick={() => openPhoto({ src: heroImg, alt: heroAlt })}
        className="absolute inset-0 z-0 cursor-zoom-in"
      />

      <motion.div style={{ y: textY, opacity: fade }} className="pointer-events-none container-x relative z-10 w-full pt-40 pb-20 sm:pb-24 lg:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="mb-6 inline-flex items-center gap-3 rounded-full border border-cream/15 bg-cream/8 px-4 py-2 text-xs tracking-wide backdrop-blur-md"
        >
          <span className="flex items-center gap-0.5 text-gold-400" aria-label="5 estrelas">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="text-cream/85">
            <strong className="font-semibold text-cream">{business.rating.value}</strong> no Google
          </span>
          <span className="h-3 w-px bg-cream/25" />
          <span className="inline-flex items-center gap-1 text-cream/75">
            <MapPin size={12} /> Jaraguá do Sul · SC
          </span>
        </motion.div>

        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease }}
            className="eyebrow text-gold-400"
          >
            Lash Designer
          </motion.p>
          <h1 className="font-display mt-4 text-[2.9rem] leading-[0.98] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            {['Realçando a beleza', 'que já existe', 'em você.'].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 + i * 0.12, ease }}
                  className={`block ${i === 2 ? 'text-gold italic font-normal' : ''}`}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 text-pretty sm:text-lg"
          >
            Extensão de cílios personalizada para o seu olhar. Técnicas que unem volume, leveza e naturalidade.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25, ease }}
            className="pointer-events-auto mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              variant="gold"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Agendar meu horário
            </Button>
            <Button href="#catalogo" variant="ghost-dark" size="lg">
              Ver catálogo de cílios
            </Button>
          </motion.div>
        </div>

        <motion.a
          href="#sobre"
          aria-label="Rolar para baixo"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="pointer-events-auto absolute right-5 bottom-8 hidden flex-col items-center gap-2 text-[0.65rem] tracking-[0.3em] text-cream/60 uppercase sm:right-8 md:flex lg:right-12"
        >
          <span className="[writing-mode:vertical-rl]">Explorar</span>
          <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ArrowDown size={14} />
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  )
}
