import { commitments, site } from "../data/site";
import { Reveal } from "./ui/Reveal";

export function About() {
  return (
    <section className="section section--alt" id="sobre">
      <div className="container about-grid">
        <Reveal className="about-copy">
          <p className="section-tag">Sobre o cub4Studio</p>
          <h2 className="section-title">
            Um estúdio nascido para <span className="text-gradient">criar com IA</span>, do jeito certo
          </h2>
          <p className="section-desc">
            O cub4Studio é um estúdio de criação focado em landing pages conversoras integradas com IA, criativos e
            vídeos/reels gerados por inteligência artificial. Acreditamos que a IA é a maior aceleradora de criatividade
            da nossa era — e trabalhamos para colocar essa tecnologia a serviço do resultado da sua marca, sem perder o
            toque humano na estratégia e na direção criativa.
          </p>
          <a href={site.instagram} target="_blank" rel="noopener" className="inline-link">
            Acompanhe os bastidores no Instagram <span aria-hidden="true">→</span>
          </a>
        </Reveal>
        <div className="commitments">
          {commitments.map((item) => (
            <Reveal key={item.num} className="commitment-item">
              <span className="commitment-num">{item.num}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
