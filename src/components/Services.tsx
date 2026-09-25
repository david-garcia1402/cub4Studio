import { services } from "../data/site";
import { Reveal } from "./ui/Reveal";

function Icon({ name }: { name: string }) {
  if (name === "layout") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M4 4h16v4H4V4Zm0 6h16v10H4V10Zm3 3h6v2H7v-2Z" fill="currentColor" />
      </svg>
    );
  }
  if (name === "image") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Zm12 3 6-3v14l-6-3V8Z" fill="currentColor" />
      </svg>
    );
  }
  if (name === "play") {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M8 5v14l11-7-11-7Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2 2 7l10 5 10-5-10-5Zm0 8-10 5 10 5 10-5-10-5Z" fill="currentColor" />
    </svg>
  );
}

export function Services() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <p className="section-tag">Serviços</p>
        <h2 className="section-title">
          Tudo que sua marca precisa para <span className="text-gradient">vender mais</span> com IA
        </h2>
        <p className="section-desc">
          Combinamos estratégia de conversão com produção acelerada por inteligência artificial — sem perder qualidade,
          criatividade ou identidade de marca.
        </p>
        <div className="cards-grid">
          {services.map((service) => (
            <Reveal key={service.title} className="card">
              <div className="card-icon">
                <Icon name={service.icon} />
              </div>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul className="card-list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
