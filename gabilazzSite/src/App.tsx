import { About } from './components/About'
import { Catalog } from './components/Catalog'
import { PhotoViewerProvider } from './components/ui/PhotoViewer'
import { Cta } from './components/Cta'
import { Faq } from './components/Faq'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Reviews } from './components/Reviews'
import { Studio } from './components/Studio'
import { WhatsAppFloat } from './components/WhatsAppFloat'

export default function App() {
  return (
    <PhotoViewerProvider>
      <a
        href="#catalogo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-wine-600 focus:px-4 focus:py-2 focus:text-cream"
      >
        Pular para o catálogo
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Catalog />
        <Studio />
        <Reviews />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </PhotoViewerProvider>
  )
}
