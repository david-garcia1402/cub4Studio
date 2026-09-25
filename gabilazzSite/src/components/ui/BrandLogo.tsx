import logo from '../../assets/brand/logo.svg'

type BrandLogoProps = {
  tone?: 'ink' | 'cream'
  className?: string
  labelled?: boolean
  loading?: 'eager' | 'lazy'
}

export function BrandLogo({ tone = 'ink', className = '', labelled = true, loading = 'eager' }: BrandLogoProps) {
  return (
    <img
      src={logo}
      alt={labelled ? 'Gabrieli Lazzarotto · Lash Designer' : ''}
      width={1587}
      height={392}
      decoding="async"
      loading={loading}
      draggable={false}
      className={`object-contain object-left ${tone === 'cream' ? 'brightness-0 invert' : ''} ${className}`}
    />
  )
}
