import { Events } from "@/components/events";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Location } from "@/components/location";
import { MenuHighlights } from "@/components/menu-highlights";
import { Reviews } from "@/components/reviews";
import { TrustBar } from "@/components/trust-bar";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Experience />
      <MenuHighlights />
      <Reviews />
      <Events />
      <Location />
    </>
  );
}
