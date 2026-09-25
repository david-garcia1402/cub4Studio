import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { policies, restrictions } from '../data/site'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const faqs = [
  {
    q: 'Quanto tempo dura o procedimento?',
    a: 'Em média 1h, podendo chegar a 2h dependendo da quantidade de cílios naturais de cada cliente. É um processo indolor e você pode relaxar durante todo o atendimento.',
  },
  {
    q: 'Como funciona a manutenção?',
    a: policies.maintenance,
  },
  {
    q: 'Quais são as restrições para fazer extensão de cílios?',
    a: `Não é indicado em casos de: ${restrictions.map((r) => r.toLowerCase()).join('; ')}. Em caso de dúvida, fale comigo antes de agendar.`,
  },
  {
    q: 'Vocês fazem remoção?',
    a: `Sim. ${policies.removal.join(' · ')}. Os valores são combinados no agendamento.`,
  },
  {
    q: 'Como devo me preparar para o dia?',
    a: 'Venha sem maquiagem (principalmente rímel), retire lentes de contato antes do procedimento e chegue no horário. A tolerância é de 10 minutos para não prejudicar a próxima cliente.',
  },
  {
    q: 'Como escolher o modelo ideal para mim?',
    a: 'Não se preocupe! Faço uma avaliação do seu olhar e indico a melhor técnica. Juntas definimos o modelo ideal, priorizando sempre o seu gosto.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="relative scroll-mt-20 overflow-hidden bg-blush/50 py-24 sm:py-32">
      <div aria-hidden className="pattern-swirl pointer-events-none absolute inset-0" />
      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Dúvidas frequentes"
            title="Tudo o que você"
            highlight="precisa saber."
            description="Políticas de manutenção, restrições e cuidados para o seu atendimento ser perfeito."
            align="left"
          />
          <Reveal delay={0.25} className="mt-8">
            <div className="rounded-3xl border border-wine-200/60 bg-white/70 p-6">
              <p className="eyebrow text-wine-600">Restrições</p>
              <ul className="mt-4 space-y-2.5">
                {restrictions.map((r) => (
                  <li key={r} className="flex items-start gap-3 text-sm text-ink-soft">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <ul className="lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Reveal as="li" key={f.q} delay={i * 0.05} className="border-b border-ink/8 first:border-t">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-display text-xl font-semibold transition-colors sm:text-2xl ${isOpen ? 'text-wine-600' : 'text-ink group-hover:text-wine-600'}`}>
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                      isOpen ? 'border-wine-600 bg-wine-600 text-cream' : 'border-ink/12 text-ink group-hover:border-wine-600 group-hover:text-wine-600'
                    }`}
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-16 text-base leading-relaxed text-ink-soft">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
