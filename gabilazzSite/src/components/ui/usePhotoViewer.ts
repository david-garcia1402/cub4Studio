import { createContext, useContext } from 'react'

export type Photo = {
  src: string
  alt: string
}

export type PhotoViewerContextValue = {
  photo: Photo | null
  openPhoto: (photo: Photo) => void
  closePhoto: () => void
}

export const PhotoViewerContext = createContext<PhotoViewerContextValue | null>(null)

export function usePhotoViewer() {
  const ctx = useContext(PhotoViewerContext)
  if (!ctx) throw new Error('usePhotoViewer must be used within PhotoViewerProvider')
  return ctx
}
