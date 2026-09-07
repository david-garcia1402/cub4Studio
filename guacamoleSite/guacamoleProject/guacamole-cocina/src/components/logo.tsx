import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="19" fill="#3d5c2e" />
        <path
          d="M12 24c2-8 6-13 8-14 2 1 6 6 8 14-2 4-5 6-8 6s-6-2-8-6z"
          fill="#6b8f3a"
        />
        <path
          d="M16 22c1.2-4 2.6-6.5 4-7.2 1.4.7 2.8 3.2 4 7.2"
          fill="none"
          stroke="#f4ead8"
          strokeWidth="1.2"
        />
        <circle cx="20" cy="16" r="1.3" fill="#d4a017" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-[1.15rem] tracking-tight text-paper">
          Guacamole
        </span>
        <span className="block font-script text-[1.35rem] leading-none text-gold-soft">
          Cocina Mexicana
        </span>
      </span>
    </span>
  );
}
