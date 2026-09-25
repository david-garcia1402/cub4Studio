import { useEffect, useState } from "react";
import { About } from "./components/About";
import { Campaign } from "./components/Campaign";
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

function isCampaignView() {
  const { hash, pathname, search } = window.location;
  return hash === "#campanha" || pathname.replace(/\/$/, "").endsWith("/campanha") || new URLSearchParams(search).has("campanha");
}

export default function App() {
  const [campaign, setCampaign] = useState(isCampaignView);

  useEffect(() => {
    initAnalytics();
    const sync = () => setCampaign(isCampaignView());
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
    };
  }, []);

  if (campaign) return <Campaign />;

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
