import { motion, useReducedMotion } from 'motion/react'
import { defaultWhatsappMessage, whatsappLink } from '../data/site'
import { WhatsAppIcon } from './ui/WhatsAppIcon'

export function WhatsAppFloat() {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href={whatsappLink(defaultWhatsappMessage)}
      target="_blank"
      rel="noreferrer"
      aria-label="Agendar pelo WhatsApp"
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-10px_rgba(37,211,102,0.7)] sm:right-6 sm:bottom-6"
    >
      {!reduce && <span className="animate-pulse-ring absolute inset-0 rounded-full bg-[#25D366]/60" aria-hidden />}
      <WhatsAppIcon className="relative h-7 w-7" />
    </motion.a>
  )
}
