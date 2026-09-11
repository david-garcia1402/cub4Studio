export function Logo({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  const color = light ? "#F7F1E8" : "#1A1612";
  const gold = "#C4A46A";

  return (
    <a href="#inicio" className="group inline-flex items-center gap-3" aria-label="Áurea Odontologia Premium">
      <svg viewBox="0 0 36 36" className="h-9 w-9 shrink-0" aria-hidden="true">
        <circle cx="18" cy="18" r="17" fill="none" stroke={gold} strokeWidth="1.2" />
        <path
          d="M18 7.2c4.1 5.6 6.6 11 6.6 16.1 0 5.6-2.8 10.5-6.6 10.5s-6.6-4.9-6.6-10.5c0-5.1 2.5-10.5 6.6-16.1z"
          fill={gold}
        />
      </svg>
      <span className="leading-none">
        <span
          className="font-display block text-[1.7rem] italic leading-none tracking-tight"
          style={{ color }}
        >
          Áurea
        </span>
        {!compact && (
          <span
            className="mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.28em]"
            style={{ color: gold }}
          >
            Odontologia Premium
          </span>
        )}
      </span>
    </a>
  );
}
