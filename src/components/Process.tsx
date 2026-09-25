import { processSteps } from "../data/site";
import { Reveal } from "./ui/Reveal";

export function Process() {
  return (
    <section className="section" id="processo">
      <div className="container">
        <p className="section-tag">Como trabalhamos</p>
        <h2 className="section-title">
          Do briefing ao <span className="text-gradient">go-live</span>, em 4 etapas
        </h2>
        <div className="process-grid">
          {processSteps.map((step) => (
            <Reveal key={step.num} className="process-step">
              <span className="process-num">{step.num}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
