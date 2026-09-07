import { cn } from "@/lib/utils";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const variants = {
  gold:
    "bg-gold text-night hover:bg-gold-soft shadow-[0_10px_30px_-12px_rgba(212,160,23,0.8)]",
  chili: "bg-chili text-paper hover:bg-[#a8321d]",
  ghost:
    "border border-paper/20 bg-paper/5 text-paper hover:border-gold/50 hover:bg-paper/10",
  dark: "bg-night text-paper hover:bg-ink",
} as const;

export function Button({
  className,
  variant = "gold",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition duration-300 disabled:opacity-60",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "gold",
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: keyof typeof variants;
  href: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-wide transition duration-300",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
