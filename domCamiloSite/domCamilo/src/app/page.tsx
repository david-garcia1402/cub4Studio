import { About } from "@/components/About";
import { Experiences } from "@/components/Experiences";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MenuHighlights } from "@/components/MenuHighlights";
import { Reviews } from "@/components/Reviews";
import { TrustBar } from "@/components/TrustBar";
import { Visit } from "@/components/Visit";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <Experiences />
        <MenuHighlights />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
