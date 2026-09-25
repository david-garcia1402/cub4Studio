import { Reveal } from './Reveal'

type Props = {
  eyebrow: string
  title: string
  highlight?: string
  description?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'center',
  tone = 'light',
  className = '',
}: Props) {
  const isCenter = align === 'center'
  const isDark = tone === 'dark'
  return (
    <div className={`${isCenter ? 'mx-auto text-center' : ''} max-w-2xl ${className}`}>
      <Reveal>
        <span className={`eyebrow ${isDark ? 'text-gold-400' : 'text-wine-600'}`}>{eyebrow}</span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2
          className={`font-display mt-4 text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl ${
            isDark ? 'text-cream' : 'text-ink'
          }`}
        >
          {title}{' '}
          {highlight && <em className={`font-normal italic ${isDark ? 'text-gold' : 'text-wine-600'}`}>{highlight}</em>}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className={`mt-5 text-base leading-relaxed text-pretty sm:text-lg ${isDark ? 'text-cream/75' : 'text-ink-soft'}`}>
            {description}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.2} className={isCenter ? 'mx-auto mt-6 w-24' : 'mt-6 w-24'}>
        <div className="gold-line" />
      </Reveal>
    </div>
  )
}
