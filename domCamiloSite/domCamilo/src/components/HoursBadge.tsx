"use client";

import { useEffect, useState } from "react";
import { getLunchStatus, isIndependenceDay } from "@/lib/hours";

export function HoursBadge() {
  const [status, setStatus] = useState(() => getLunchStatus());
  const [holiday, setHoliday] = useState(false);

  useEffect(() => {
    const now = new Date();
    setStatus(getLunchStatus(now));
    setHoliday(isIndependenceDay(now));
  }, []);

  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`h-2 w-2 rounded-full ${status.open ? "bg-emerald-400" : "bg-cream/40"}`}
      />
      {status.label}
      {holiday ? (
        <span className="hidden text-brass sm:inline">· Feriado: confirme o horário</span>
      ) : null}
    </span>
  );
}

export function HolidayNote() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isIndependenceDay());
  }, []);

  if (!show) return null;

  return (
    <p className="rounded-2xl border border-brass/30 bg-brass/10 px-4 py-3 text-sm text-cream/80">
      O Dia da Independência pode alterar o expediente. Confirme pelo WhatsApp
      antes de sair de casa.
    </p>
  );
}
