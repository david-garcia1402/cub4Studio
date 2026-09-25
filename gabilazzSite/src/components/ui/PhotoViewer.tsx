import { X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useId, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { PhotoViewerContext, type Photo } from './usePhotoViewer'

export function PhotoViewerProvider({ children }: { children: ReactNode }) {
  const [photo, setPhoto] = useState<Photo | null>(null)
  const openPhoto = useCallback((next: Photo) => setPhoto(next), [])
  const closePhoto = useCallback(() => setPhoto(null), [])

  return (
    <PhotoViewerContext.Provider value={{ photo, openPhoto, closePhoto }}>
      {children}
      <PhotoLightbox photo={photo} onClose={closePhoto} />
    </PhotoViewerContext.Provider>
  )
}

function PhotoLightbox({ photo, onClose }: { photo: Photo | null; onClose: () => void }) {
  const titleId = useId()

  useEffect(() => {
    if (!photo) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
      }
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [photo, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {photo && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Fechar foto"
            className="absolute inset-0 bg-wine-900/88 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-full max-w-full flex-col items-center"
          >
            <p id={titleId} className="sr-only">
              {photo.alt}
            </p>
            <img
              src={photo.src}
              alt={photo.alt}
              className="max-h-[min(86dvh,920px)] w-auto max-w-[min(94vw,1100px)] rounded-2xl object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.65)]"
            />
            <button
              type="button"
              onClick={onClose}
              autoFocus
              className="fixed top-[max(1rem,env(safe-area-inset-top))] right-[max(1rem,env(safe-area-inset-right))] z-20 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 bg-wine-900/80 text-cream transition-colors hover:border-gold-400 hover:bg-gold-400 hover:text-wine-900"
              aria-label="Fechar foto"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
