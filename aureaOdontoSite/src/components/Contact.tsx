import { useState, type FormEvent } from "react";
import { clinic, hours, waLink } from "../data";
import { useReveal } from "../hooks";

export function Contact() {
  const ref = useReveal<HTMLElement>();
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("Avaliação / consulta");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const msg = `Olá! Sou ${name || "um paciente"} e gostaria de falar sobre: ${interest}.`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contato" ref={ref} className="reveal bg-ivory px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-[0.72rem] font-medium tracking-[0.32em] text-gold-deep uppercase">Visite</p>
          <h2 className="font-display mt-3 text-4xl italic sm:text-5xl">Centro de Jaraguá do Sul</h2>
          <p className="mt-5 max-w-lg text-muted">
            {clinic.address} — {clinic.neighborhood}, {clinic.city} - {clinic.state}, {clinic.cep}
          </p>

          <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-sand">
            <iframe
              title="Mapa da Áurea Odontologia Premium"
              src={clinic.mapsEmbed}
              className="h-80 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <ul className="mt-8 grid gap-5 sm:grid-cols-3">
            {hours.map((item) => (
              <li key={item.days}>
                <p className="text-[0.68rem] tracking-[0.2em] text-gold-deep uppercase">{item.days}</p>
                <p className="mt-1 font-medium">{item.time}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[2rem] bg-ink p-8 text-cream md:p-10">
          <h3 className="font-display text-3xl italic">Agende sua avaliação</h3>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            Confirmações, reagendamentos e suporte pelo WhatsApp. Horários públicos: semana até
            20h e sábado pela manhã.
          </p>
          <form className="mt-8 space-y-4" onSubmit={onSubmit}>
            <label className="block text-xs tracking-[0.16em] uppercase">
              Nome
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-cream/15 bg-ink-soft px-4 py-3 text-sm tracking-normal text-cream outline-none focus:border-gold"
                placeholder="Como podemos te chamar?"
              />
            </label>
            <label className="block text-xs tracking-[0.16em] uppercase">
              Interesse
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-cream/15 bg-ink-soft px-4 py-3 text-sm tracking-normal text-cream outline-none focus:border-gold"
              >
                <option>Avaliação / consulta</option>
                <option>Estética e lentes</option>
                <option>Implante</option>
                <option>Ortodontia</option>
                <option>Clareamento</option>
                <option>Outro tratamento</option>
              </select>
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-gold py-3.5 text-[0.78rem] font-semibold tracking-[0.16em] text-ink uppercase transition hover:bg-gold-soft"
            >
              Enviar no WhatsApp
            </button>
          </form>
          <div className="mt-8 space-y-2 text-sm text-cream/75">
            <p>
              <a href={`tel:${clinic.phoneTel}`} className="hover:text-gold-soft">
                {clinic.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={clinic.instagram} target="_blank" rel="noreferrer" className="hover:text-gold-soft">
                {clinic.instagramHandle}
              </a>
            </p>
            <p>
              <a href={clinic.bookingUrl} target="_blank" rel="noreferrer" className="hover:text-gold-soft">
                Agendar online
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
