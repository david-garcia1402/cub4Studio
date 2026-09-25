import { motion, useReducedMotion } from 'motion/react'
import { business, defaultWhatsappMessage, whatsappLink } from '../data/site'
import { Button } from './ui/Button'
import { Reveal } from './ui/Reveal'
import { InstagramIcon } from './ui/InstagramIcon'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

export function Cta() {
  const reduce = useReducedMotion()
  return (
    <section id="contato" className="relative scroll-mt-20 overflow-hidden bg-wine-900 py-28 text-cream sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(156,51,80,0.55),transparent_60%)]"
      />
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-gold-400/20"
      />
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute top-1/2 left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-400/15"
      />

      <div className="container-x relative text-center">
        <Reveal>
          <span className="eyebrow text-gold-400">Agende seu horário</span>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display mx-auto mt-5 max-w-3xl text-5xl leading-[0.98] font-medium tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Pronta para <em className="text-gold font-normal italic">realçar</em> o seu olhar?
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cream/75 sm:text-lg">
            Me chame no WhatsApp para agendar, tirar dúvidas ou escolher o modelo perfeito para você. Vai ser um
            prazer cuidar de você!
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              variant="gold"
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              Agendar pelo WhatsApp
            </Button>
            <Button
              href={business.instagram}
              target="_blank"
              rel="noreferrer"
              variant="ghost-dark"
              size="lg"
              icon={<InstagramIcon size={18} />}
            >
              {business.handle}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
