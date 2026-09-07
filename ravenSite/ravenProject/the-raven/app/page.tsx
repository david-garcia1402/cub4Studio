import { About } from "@/components/about";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { JsonLd } from "@/components/json-ld";
import { MenuSection } from "@/components/menu-section";
import { Reviews } from "@/components/reviews";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatsStrip } from "@/components/stats-strip";
import { Visit } from "@/components/visit";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default function Home() {
  return (
    <>
      <JsonLd />
      <div className="grain" aria-hidden="true" />
      <SiteHeader />
      <main>
        <Hero />
        <StatsStrip />
        <About />
        <MenuSection />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
