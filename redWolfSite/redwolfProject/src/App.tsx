import { About } from "@/components/about";
import { CartDrawer } from "@/components/cart-drawer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Highlights } from "@/components/highlights";
import { MenuSection } from "@/components/menu-section";
import { OrderHub } from "@/components/order-hub";
import { PilotBanner } from "@/components/pilot-banner";
import { Promos } from "@/components/promos";
import { Reviews } from "@/components/reviews";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatsStrip } from "@/components/stats-strip";
import { Units } from "@/components/units";
import { Visit } from "@/components/visit";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { CartProvider } from "@/lib/cart";

export default function App() {
  return (
    <CartProvider>
      <div className="grain" aria-hidden="true" />
      <PilotBanner />
      <SiteHeader />
      <main>
        <Hero />
        <StatsStrip />
        <Highlights />
        <Units />
        <About />
        <MenuSection />
        <OrderHub />
        <Promos />
        <Gallery />
        <Reviews />
        <Visit />
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <CartDrawer />
    </CartProvider>
  );
}
