import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'gold' | 'ghost' | 'ghost-dark' | 'whatsapp'
type Size = 'md' | 'lg'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: Size
  children: ReactNode
  icon?: ReactNode
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-medium tracking-wide transition-all duration-300 ease-[var(--ease-luxe)] will-change-transform active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary:
    'bg-wine-600 text-cream shadow-glow hover:bg-wine-700 hover:shadow-[0_24px_60px_-18px_rgba(122,27,42,0.7)] hover:-translate-y-0.5',
  gold:
    'text-wine-900 bg-[linear-gradient(100deg,#a98330_0%,#eed9a3_45%,#c9a24a_70%,#a98330_100%)] bg-[length:200%_auto] hover:bg-[position:100%_0] shadow-[0_18px_50px_-18px_rgba(201,162,74,0.7)] hover:-translate-y-0.5',
  ghost:
    'border border-ink/15 text-ink hover:border-wine-600 hover:text-wine-600 hover:-translate-y-0.5 bg-transparent',
  'ghost-dark':
    'border border-cream/30 text-cream hover:border-gold-400 hover:text-gold-300 hover:-translate-y-0.5 bg-transparent backdrop-blur-sm',
  whatsapp:
    'bg-[#25D366] text-[#062d1b] hover:bg-[#1fbd5a] shadow-[0_18px_50px_-18px_rgba(37,211,102,0.8)] hover:-translate-y-0.5',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm sm:text-base',
}

export function Button({ variant = 'primary', size = 'md', className = '', children, icon, ...rest }: Props) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {icon && <span className="shrink-0 transition-transform duration-300 group-hover:scale-110">{icon}</span>}
      <span>{children}</span>
    </a>
  )
}
