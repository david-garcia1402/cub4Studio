import { useEffect } from "react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Cta } from "./components/Cta";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { Portfolio } from "./components/Portfolio";
import { Process } from "./components/Process";
import { Services } from "./components/Services";
import { initAnalytics } from "./lib/analytics";

export default function App() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <>
      <div className="bg-glow bg-glow--one" aria-hidden="true" />
      <div className="bg-glow bg-glow--two" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Portfolio />
        <Services />
        <About />
        <Process />
        <Cta />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
