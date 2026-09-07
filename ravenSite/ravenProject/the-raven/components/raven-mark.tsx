export function RavenMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M12 48c8-18 22-30 40-34 2 7-1 14-6 19 8-2 16 1 22 8-10 1-17 6-20 13 8 1 14 6 16 13-12-3-22 1-28 10-4-8-14-12-24-11 7-5 10-12 8-20-6 2-10 6-14 12 2-6 4-8 6-10z"
        fill="currentColor"
      />
      <circle cx="54" cy="28" r="2.2" fill="#c9a86a" />
    </svg>
  );
}
