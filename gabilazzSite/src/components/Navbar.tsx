import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { business, defaultWhatsappMessage, navLinks, whatsappLink } from '../data/site'
import { BrandLogo } from './ui/BrandLogo'
import { InstagramIcon } from './ui/InstagramIcon'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const onDark = !scrolled && !open

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
          scrolled ? 'glass shadow-soft py-2' : 'py-4'
        }`}
      >
        <nav className="container-x flex items-center justify-between gap-4" aria-label="Principal">
          <a
            href="#inicio"
            className="relative block h-8 aspect-[1587/392] shrink-0 sm:h-10 md:h-11"
            aria-label={`${business.name}, início`}
          >
            <BrandLogo
              tone="cream"
              labelled={false}
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${onDark ? 'opacity-100' : 'opacity-0'}`}
            />
            <BrandLogo
              labelled={false}
              className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${onDark ? 'opacity-0' : 'opacity-100'}`}
            />
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative text-[0.8rem] font-medium tracking-[0.18em] uppercase transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold-500 after:transition-all after:duration-300 hover:after:w-full ${
                    onDark ? 'text-cream/85 hover:text-cream' : 'text-ink-soft hover:text-wine-600'
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={business.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className={`hidden h-10 w-10 items-center justify-center rounded-full border transition-colors sm:inline-flex ${
                onDark
                  ? 'border-cream/25 text-cream hover:border-gold-400 hover:text-gold-300'
                  : 'border-ink/10 text-ink-soft hover:border-wine-600 hover:text-wine-600'
              }`}
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className={`hidden items-center gap-2 rounded-full px-5 py-2.5 text-[0.8rem] font-medium tracking-wide transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex ${
                onDark ? 'bg-cream text-wine-800 hover:bg-gold-300' : 'bg-wine-600 text-cream hover:bg-wine-700'
              }`}
            >
              <WhatsAppIcon className="h-4 w-4" />
              Agendar
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden ${
                onDark ? 'border-cream/25 text-cream' : 'border-ink/10 text-ink'
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-cream pt-24 lg:hidden"
          >
            <div className="pattern-swirl pointer-events-none absolute inset-0" />
            <nav className="container-x relative flex flex-1 flex-col" aria-label="Menu mobile">
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="font-display flex items-center justify-between border-b border-ink/8 py-4 text-3xl font-medium text-ink"
                    >
                      {l.label}
                      <span className="text-gold-500">✦</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-auto space-y-3 pb-10"
              >
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-wine-600 py-4 text-sm font-medium tracking-wide text-cream"
                >
                  <WhatsAppIcon className="h-5 w-5" /> Agendar pelo WhatsApp
                </a>
                <a
                  href={business.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full border border-ink/12 py-4 text-sm font-medium tracking-wide text-ink"
                >
                  <InstagramIcon size={18} /> {business.handle}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
