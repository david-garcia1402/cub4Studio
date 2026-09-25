import { whatsappHref } from "../lib/whatsapp";
import { WhatsAppIcon } from "./ui/Icons";

export function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container hero-container">
        <img src="/img/logo-badge.jpg" alt="Mascote do cub4Studio" className="hero-mascot" />
        <div className="hero-inner">
          <p className="eyebrow">
            <span className="dot"></span> Estúdio de criação impulsionado por IA
          </p>
          <h1>
            Criamos <span className="text-gradient">experiências digitais</span>
            <br />
            que convertem, com o poder da <span className="text-gradient">Inteligência Artificial</span>.
          </h1>
          <p className="lead">
            O <strong>cub4Studio</strong> une estratégia, design e IA generativa para criar landing pages que vendem,
            criativos que chamam atenção e vídeos/reels que fazem sua marca ser lembrada.
          </p>
          <div className="hero-cta">
            <a href="#contato" className="btn btn--primary">
              Quero minha empresa na internet!
            </a>
            <a className="btn btn--ghost" href={whatsappHref("Landing Page Conversora")} target="_blank" rel="noopener">
              <WhatsAppIcon />
              Orçamento no WhatsApp
            </a>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">focado em IA aplicada</span>
            </div>
            <div className="stat">
              <span className="stat-num">Conversão</span>
              <span className="stat-label">no centro de cada decisão</span>
            </div>
            <div className="stat">
              <span className="stat-num">Do zero ao ar</span>
              <span className="stat-label">estratégia, design e código</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
