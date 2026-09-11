import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Gallery } from "./components/Gallery";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Results } from "./components/Results";
import { Reviews } from "./components/Reviews";
import { Services } from "./components/Services";
import { WhatsAppFab } from "./components/WhatsAppFab";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Results />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
