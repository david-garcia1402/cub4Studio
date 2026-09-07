"use client";

import { useState, type FormEvent } from "react";
import { IconX } from "@/components/icons";
import { restaurant } from "@/lib/restaurant";

export function ReserveDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reserve-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg border border-gold/25 bg-ink-soft p-6 shadow-2xl sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-paper-dim transition-colors hover:text-paper"
          aria-label="Fechar"
        >
          <IconX className="h-5 w-5" />
        </button>

        {sent ? (
          <div className="py-8 text-center">
            <p className="font-display text-4xl italic text-gold">Reservado.</p>
            <p className="mt-3 text-sm text-paper-dim">
              Recebemos o seu pedido. Confirmamos por WhatsApp em instantes.
            </p>
            <a
              href={restaurant.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex btn-gold px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase"
            >
              Falar no WhatsApp
            </a>
          </div>
        ) : (
          <>
            <p className="text-[11px] tracking-[0.32em] text-gold uppercase">
              Mesa para a noite
            </p>
            <h2
              id="reserve-title"
              className="font-display mt-2 text-4xl italic"
            >
              Reservar
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <Field label="Nome" name="name" required />
              <Field label="WhatsApp" name="phone" type="tel" required />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Data" name="date" type="date" required />
                <Field label="Horário" name="time" type="time" required />
              </div>
              <label className="grid gap-2 text-xs tracking-[0.16em] text-paper-dim uppercase">
                Pessoas
                <select
                  name="guests"
                  className="border border-gold/20 bg-ink px-3 py-3 text-sm tracking-normal text-paper normal-case outline-none focus:border-gold"
                  defaultValue="2"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "pessoa" : "pessoas"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-xs tracking-[0.16em] text-paper-dim uppercase">
                Observações
                <textarea
                  name="notes"
                  rows={3}
                  className="border border-gold/20 bg-ink px-3 py-3 text-sm tracking-normal text-paper normal-case outline-none focus:border-gold"
                  placeholder="Aniversário, restrições, mezanino..."
                />
              </label>
              <button
                type="submit"
                className="btn-gold mt-2 px-6 py-3.5 text-xs font-semibold tracking-[0.24em] uppercase"
              >
                Confirmar reserva
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-xs tracking-[0.16em] text-paper-dim uppercase">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="border border-gold/20 bg-ink px-3 py-3 text-sm tracking-normal text-paper normal-case outline-none focus:border-gold"
      />
    </label>
  );
}
