export function WolfMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden="true">
      <circle cx="40" cy="40" r="38" fill="#070708" stroke="#c8102e" strokeWidth="2" />
      <path
        fill="#c8102e"
        d="M16 34 28 18l8 8 4-10 4 10 8-8 12 16-6 4-4-6-6 18H36l-6-18-4 6-10-4zm18 26c2 4 10 4 12 0 1 6-13 6-12 0z"
      />
    </svg>
  );
}
