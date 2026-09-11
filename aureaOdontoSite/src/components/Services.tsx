import { services } from "../data";
import { useReveal } from "../hooks";

export function Services() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="especialidades" ref={ref} className="reveal bg-cream px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-[0.72rem] font-medium tracking-[0.32em] text-gold-deep uppercase">Especialidades</p>
          <h2 className="font-display mt-3 text-4xl italic leading-tight sm:text-5xl">
            Odontologia completa, com olhar estético
          </h2>
          <p className="mt-5 text-muted">
            Do cuidado preventivo à reabilitação do sorriso — as áreas mais procuradas na Áurea,
            conforme o perfil público da clínica e o totem da fachada.
          </p>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((item, i) => (
            <li
              key={item.title}
              className="group rounded-[1.6rem] border border-sand bg-ivory p-7 transition duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_50px_rgba(26,22,18,0.06)]"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span className="font-display text-3xl text-gold-deep/80">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
