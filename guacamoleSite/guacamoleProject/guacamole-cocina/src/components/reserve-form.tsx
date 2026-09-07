"use client";

import { Button } from "@/components/ui/button";
import { whatsappUrl } from "@/lib/utils";
import { useMemo, useState } from "react";

const occasions = ["Jantar", "Happy hour", "Aniversário", "Grupo / eventos"];

export function ReserveForm() {
  const [name, setName] = useState("");
  const [people, setPeople] = useState("2");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("20:00");
  const [occasion, setOccasion] = useState(occasions[0]);

  const href = useMemo(() => {
    const message = [
      "Olá! Quero reservar uma mesa no Guacamole Porto Alegre.",
      `Nome: ${name || "—"}`,
      `Pessoas: ${people}`,
      `Data: ${date || "a combinar"}`,
      `Horário: ${time}`,
      `Ocasião: ${occasion}`,
    ].join("\n");
    return whatsappUrl(message);
  }, [name, people, date, time, occasion]);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      <label className="grid gap-2 text-sm">
        <span className="text-muted">Nome</span>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-2xl border border-paper/15 bg-night px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
          placeholder="Como devemos te chamar?"
        />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="text-muted">Pessoas</span>
          <input
            type="number"
            min={1}
            max={30}
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="rounded-2xl border border-paper/15 bg-night px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-muted">Ocasião</span>
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="rounded-2xl border border-paper/15 bg-night px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
          >
            {occasions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="text-muted">Data</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-2xl border border-paper/15 bg-night px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="text-muted">Horário</span>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-2xl border border-paper/15 bg-night px-4 py-3 text-paper outline-none ring-gold/40 focus:ring-2"
          />
        </label>
      </div>
      <Button type="submit" className="mt-2 w-full py-3.5">
        Enviar reserva no WhatsApp
      </Button>
      <p className="text-center text-xs text-muted">
        A reserva é confirmada pela equipe da casa. Happy hour até 20h ·
        mariachis a partir das 20h.
      </p>
    </form>
  );
}
