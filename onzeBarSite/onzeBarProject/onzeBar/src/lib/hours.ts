const OPEN_MIN = 18 * 60
const CLOSE_MIN = 24 * 60

function minutesNow(date: Date) {
  return date.getHours() * 60 + date.getMinutes()
}

function isServiceDay(day: number) {
  return day >= 2 && day <= 6
}

export function getOpenStatus(now = new Date()) {
  const day = now.getDay()
  const mins = minutesNow(now)

  if (isServiceDay(day) && mins >= OPEN_MIN && mins < CLOSE_MIN) {
    return { open: true, label: "Aberto agora · fecha à meia-noite" }
  }

  if (day === 1) {
    return { open: false, label: "Fechado · abre terça às 18:00" }
  }

  if (day === 0) {
    return { open: false, label: "Domingo variável · confira no Instagram" }
  }

  if (isServiceDay(day) && mins < OPEN_MIN) {
    return { open: false, label: "Fechado · abre hoje às 18:00" }
  }

  if (day === 6 && mins >= CLOSE_MIN) {
    return { open: false, label: "Fechado · às vezes abre domingo" }
  }

  return { open: false, label: "Fechado · abre amanhã às 18:00" }
}
