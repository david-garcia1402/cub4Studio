import useEmblaCarousel from 'embla-carousel-react'
import type { EmblaCarouselType } from 'embla-carousel'
import { ArrowLeft, ArrowRight, Heart, Quote, Star } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { business, reviews, type Review } from '../data/site'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

const stars = Array.from({ length: 5 })

export function Reviews() {
  return (
    <section id="depoimentos" className="relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Depoimentos"
            title="Quem faz,"
            highlight="volta sempre."
            description="Mensagens reais de clientes. Atendimento atencioso e resultado impecável, do jeito que você merece."
            align="left"
          />
          <Reveal delay={0.25} className="shrink-0">
            <a
              href={business.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-4 rounded-2xl border border-ink/8 bg-white/80 p-4 pr-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="font-display text-5xl leading-none font-semibold text-wine-600">{business.rating.value}</span>
              <span>
                <span className="flex gap-0.5 text-gold-500" aria-label="5 de 5 estrelas">
                  {stars.map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span className="mt-1 block text-xs text-ink-soft">
                  {business.rating.count} avaliações no Google ·{' '}
                  <span className="text-wine-600 underline-offset-2 group-hover:underline">ver todas</span>
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        <ReviewsCarousel />
      </div>
    </section>
  )
}

function ReviewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    loop: false,
    skipSnaps: false,
    duration: 28,
  })
  const [selected, setSelected] = useState(0)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(reviews.length > 1)
  const snaps = emblaApi?.scrollSnapList() ?? []
  const useCarousel = snaps.length === 0 ? reviews.length > 1 : snaps.length > 1

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelected(api.selectedScrollSnap())
    setCanPrev(api.canScrollPrev())
    setCanNext(api.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    // oxlint-disable-next-line react/set-state-in-effect -- sync the first snap once Embla is ready
    onSelect(emblaApi)
    emblaApi.on('select', onSelect).on('reInit', onSelect)
    return () => {
      emblaApi.off('select', onSelect).off('reInit', onSelect)
    }
  }, [emblaApi, onSelect])

  return (
    <div className="mt-12 sm:mt-16">
      <div ref={emblaRef} className="overflow-hidden" aria-roledescription="carrossel">
        <div className="flex touch-pan-y touch-pinch-zoom">
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className="flex min-w-0 shrink-0 grow-0 basis-[88%] pr-4 sm:basis-1/2 sm:pr-5 lg:basis-1/3 lg:pr-6"
              aria-roledescription="slide"
              aria-label={`${i + 1} de ${reviews.length}`}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>

      {useCarousel && (
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Depoimento anterior"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-300 hover:border-wine-600 hover:bg-wine-600 hover:text-cream active:scale-95 disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
              aria-label="Próximo depoimento"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 text-ink transition-all duration-300 hover:border-wine-600 hover:bg-wine-600 hover:text-cream active:scale-95 disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex gap-1.5" role="tablist" aria-label="Ir para depoimento">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === selected}
                aria-label={`Ir para o depoimento ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === selected ? 'w-8 bg-wine-600' : 'w-1.5 bg-ink/20 hover:bg-ink/40'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="relative flex w-full flex-1 flex-col rounded-3xl border border-ink/6 bg-white/85 p-7 shadow-soft">
      <Quote size={36} strokeWidth={1} className="absolute top-6 right-6 text-gold-400/70" aria-hidden />
      <span className="flex gap-0.5 text-gold-500" aria-label="5 de 5 estrelas">
        {stars.map((_, k) => (
          <Star key={k} size={13} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <blockquote className="font-display mt-5 text-xl leading-snug text-ink sm:text-2xl">“{review.text}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3 pt-6">
        {review.author ? (
          <>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-wine-600 text-sm font-semibold text-cream">
              {review.author.charAt(0)}
            </span>
            <span>
              <span className="block text-sm font-medium text-ink">{review.author}</span>
              <span className="block text-xs text-muted">Cliente · Google</span>
            </span>
          </>
        ) : (
          <>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blush text-wine-600">
              <Heart size={16} fill="currentColor" strokeWidth={0} aria-hidden />
            </span>
            <span className="text-sm font-medium text-ink">Cliente</span>
          </>
        )}
      </figcaption>
    </figure>
  )
}
