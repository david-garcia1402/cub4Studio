import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import { ArrowLeft, ArrowRight, Clock3, Expand } from 'lucide-react'
import { motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'
import { services, whatsappLink, type Service } from '../data/site'
import { SectionHeading } from './ui/SectionHeading'
import { Reveal } from './ui/Reveal'
import { WhatsAppIcon } from './ui/WhatsAppIcon'
import { usePhotoViewer } from './ui/usePhotoViewer'

export function Catalog() {
  return (
    <section id="catalogo" className="relative scroll-mt-20 overflow-hidden bg-wine-900 py-24 text-cream sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,162,74,0.16),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(156,51,80,0.35),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(201,162,74,0.6),transparent)]"
      />

      <div className="container-x relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Catálogo de procedimentos"
            title="Extensão de cílios para"
            highlight="cada olhar."
            description="Deslize para conhecer todos os modelos. Cada técnica é escolhida junto com você, priorizando conforto, saúde ocular e o resultado que você imagina."
            align="left"
            tone="dark"
          />
          <Reveal delay={0.2} className="shrink-0 lg:pb-1">
            <p className="font-display text-2xl font-medium tracking-tight text-gold sm:text-3xl">Todos os volumes</p>
          </Reveal>
        </div>
      </div>

      <div className="mt-12 sm:mt-16">
        <Carousel items={services} />
      </div>

      <Reveal delay={0.1} className="container-x mt-14">
        <div className="glass-dark flex flex-col items-start gap-4 rounded-3xl border border-cream/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-400">
              <Clock3 size={18} />
            </span>
            <div>
              <p className="font-display text-xl font-semibold text-cream sm:text-2xl">Manutenção de 15 a 23 dias</p>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-cream/70">
                Mantenha seus cílios sempre perfeitos. O ideal é retornar entre 15 e 23 dias. Depois desse prazo, o valor
                da manutenção é combinado no agendamento.
              </p>
            </div>
          </div>
          <a
            href={whatsappLink('Olá, Gabrieli! Gostaria de agendar uma manutenção dos meus cílios. 💗')}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-gold-400/50 px-5 py-3 text-xs font-medium tracking-[0.15em] text-gold-300 uppercase transition-all hover:bg-gold-400 hover:text-wine-900"
          >
            Agendar manutenção
          </a>
        </div>
      </Reveal>
    </section>
  )
}

function resetAutoplay(api: EmblaCarouselType) {
  const autoplay = api.plugins()?.autoplay
  if (autoplay && 'reset' in autoplay && typeof autoplay.reset === 'function') autoplay.reset()
}

function Carousel({ items }: { items: Service[] }) {
  const { photo, openPhoto } = usePhotoViewer()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: items.length > 3, align: 'start', skipSnaps: false, dragFree: false, duration: 28 },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })],
  )
  const [selected, setSelected] = useState(0)
  const [canPrev, setCanPrev] = useState(items.length > 1)
  const [canNext, setCanNext] = useState(items.length > 1)
  const [progress, setProgress] = useState(0)
  const snaps = emblaApi?.scrollSnapList() ?? []

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
    setCanPrev(emblaApi.canScrollPrev())
    setCanNext(emblaApi.canScrollNext())
  }, [emblaApi])

  const onScroll = useCallback(() => {
    if (!emblaApi) return
    setProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())))
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    // oxlint-disable-next-line react/set-state-in-effect -- sync the first snap once Embla is ready
    onSelect()
    // oxlint-disable-next-line react/set-state-in-effect -- sync progress once Embla is ready
    onScroll()
    emblaApi.on('select', onSelect).on('reInit', onSelect).on('scroll', onScroll).on('reInit', onScroll)
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect).off('scroll', onScroll).off('reInit', onScroll)
    }
  }, [emblaApi, onSelect, onScroll])

  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay
    if (!emblaApi || !autoplay || !('play' in autoplay) || !('stop' in autoplay)) return
    // Autoplay skips init when every slide fits; calling play() then crashes.
    if (emblaApi.scrollSnapList().length <= 1) return
    if (photo) autoplay.stop()
    else autoplay.play()
  }, [emblaApi, photo])

  const scrollPrev = () => {
    if (!emblaApi || !emblaApi.canScrollPrev()) return
    resetAutoplay(emblaApi)
    emblaApi.scrollPrev()
  }
  const scrollNext = () => {
    if (!emblaApi || !emblaApi.canScrollNext()) return
    resetAutoplay(emblaApi)
    emblaApi.scrollNext()
  }

  const openServicePhoto = (service: Service) => {
    openPhoto({
      src: service.image,
      alt: `Resultado de extensão de cílios ${service.name}`,
    })
  }

  return (
    <div className="relative">
      <div ref={emblaRef} className="mask-fade-x overflow-hidden" aria-roledescription="carrossel">
        <div className="ml-[calc((100vw-min(100vw,80rem))/2+1.25rem)] flex touch-pan-y touch-pinch-zoom sm:ml-[calc((100vw-min(100vw,80rem))/2+2rem)] lg:ml-[calc((100vw-min(100vw,80rem))/2+3rem)]">
          {items.map((s, i) => (
            <div
              key={s.slug}
              className="min-w-0 shrink-0 grow-0 basis-[82%] pr-4 sm:basis-[56%] sm:pr-6 md:basis-[46%] lg:basis-[33%] xl:basis-[30%]"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${items.length}: ${s.name}`}
            >
              <ServiceCard service={s} active={i === selected} index={i} onOpenPhoto={() => openServicePhoto(s)} />
            </div>
          ))}
        </div>
      </div>

      <div className="container-x relative z-10 mt-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            aria-label="Modelo anterior"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-all duration-300 hover:border-gold-400 hover:bg-gold-400 hover:text-wine-900 active:scale-95 disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            aria-label="Próximo modelo"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/20 text-cream transition-all duration-300 hover:border-gold-400 hover:bg-gold-400 hover:text-wine-900 active:scale-95 disabled:pointer-events-none disabled:opacity-35"
          >
            <ArrowRight size={18} />
          </button>
          <span className="font-display ml-2 hidden text-lg text-cream/70 tabular-nums sm:inline">
            <span className="text-cream">{String(selected + 1).padStart(2, '0')}</span>
            <span className="mx-1.5 text-cream/40">/</span>
            {String(items.length).padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="hidden gap-1.5 sm:flex" role="tablist" aria-label="Ir para modelo">
            {snaps.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === selected}
                aria-label={`Ir para o modelo ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === selected ? 'w-8 bg-gold-400' : 'w-1.5 bg-cream/30 hover:bg-cream/60'
                }`}
              />
            ))}
          </div>
          <div className="relative h-px w-full max-w-[9rem] overflow-hidden bg-cream/15 sm:hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gold-400 transition-[width] duration-200"
              style={{ width: `${Math.max(8, progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({
  service,
  active,
  index,
  onOpenPhoto,
}: {
  service: Service
  active: boolean
  index: number
  onOpenPhoto: () => void
}) {
  const msg = `Olá, Gabrieli! Gostaria de agendar o modelo *${service.name}*. 💗`
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: Math.min(index, 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border bg-[#3a0c14] transition-[transform,border-color,box-shadow] duration-700 ease-[var(--ease-luxe)] ${
        active
          ? 'border-gold-400/50 shadow-[0_30px_80px_-30px_rgba(201,162,74,0.35)]'
          : 'border-cream/10 lg:scale-[0.97] lg:opacity-90'
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={service.image}
          alt=""
          loading="lazy"
          decoding="async"
          draggable={false}
          className="pointer-events-none h-full w-full object-cover transition-transform duration-[1.4s] ease-[var(--ease-luxe)] group-hover:scale-[1.06]"
        />
        <button
          type="button"
          onClick={onOpenPhoto}
          aria-label={`Ampliar foto de ${service.name}`}
          className="absolute inset-0 z-[1] cursor-zoom-in touch-pan-y"
        />
        <span className="pointer-events-none absolute top-4 right-4 z-[2] inline-flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 bg-wine-900/45 text-cream backdrop-blur-md sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
          <Expand size={15} />
        </span>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(47,9,16,0)_40%,rgba(47,9,16,0.92)_100%)]" />
        <div className="pointer-events-none absolute top-4 left-4 z-[2] flex flex-wrap gap-1.5">
          {service.featured && (
            <span className="rounded-full bg-gold-400 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.2em] text-wine-900 uppercase">
              Mais pedido
            </span>
          )}
          {service.tags.slice(0, service.featured ? 1 : 2).map((t) => (
            <span
              key={t}
              className="rounded-full border border-cream/25 bg-wine-900/40 px-3 py-1 text-[0.62rem] font-medium tracking-[0.2em] text-cream uppercase backdrop-blur-md"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-5 sm:p-6">
          <p className="eyebrow text-gold-400">{service.tagline}</p>
          <h3 className="font-display mt-1.5 text-3xl leading-none font-semibold text-cream sm:text-[2.1rem]">{service.name}</h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="mb-6 text-sm leading-relaxed text-cream/75">{service.description}</p>

        <a
          href={whatsappLink(msg)}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-cream py-3.5 text-sm font-medium text-wine-800 transition-all duration-300 hover:bg-gold-300 active:scale-[0.98]"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Agendar este modelo
        </a>
      </div>
    </motion.article>
  )
}
