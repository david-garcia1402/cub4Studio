const LUNCH_OPEN = 11 * 60;
const LUNCH_CLOSE = 14 * 60 + 30;

function minutesNow(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function getLunchStatus(date = new Date()) {
  const minutes = minutesNow(date);

  if (minutes < LUNCH_OPEN) {
    return { open: false, label: "Abre às 11:00", detail: "Almoço até 14:30" };
  }

  if (minutes < LUNCH_CLOSE) {
    return { open: true, label: "Aberto · Fecha 14:30", detail: "Almoço servindo agora" };
  }

  return { open: false, label: "Fechado para almoço", detail: "Almoço até 14:30" };
}

export function isIndependenceDay(date = new Date()) {
  return date.getMonth() === 8 && date.getDate() === 7;
}
