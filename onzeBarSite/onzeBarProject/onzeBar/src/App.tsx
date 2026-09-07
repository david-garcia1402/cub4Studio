import { About } from "./components/About"
import { Footer } from "./components/Footer"
import { Gallery } from "./components/Gallery"
import { Header } from "./components/Header"
import { Hero } from "./components/Hero"
import { Marquee } from "./components/Marquee"
import { Menu } from "./components/Menu"
import { Reviews } from "./components/Reviews"
import { Visit } from "./components/Visit"

export default function App() {
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Menu />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <Footer />
    </div>
  )
}
