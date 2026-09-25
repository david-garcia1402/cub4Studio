import type { MouseEvent } from "react";

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.44 0 .07 5.37.07 11.96c0 2.11.55 4.17 1.6 6L0 24l6.19-1.62a11.93 11.93 0 0 0 5.85 1.49h.01c6.6 0 11.96-5.37 11.96-11.96 0-3.19-1.24-6.2-3.49-8.43ZM12.05 21.85h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.67.96.98-3.58-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.13 1.03 7 2.9a9.82 9.82 0 0 1 2.9 6.98c0 5.45-4.44 9.88-9.95 9.88Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a8.96 8.96 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.6.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.9 4.9 0 0 1 1.772 1.153 4.9 4.9 0 0 1 1.153 1.772c.248.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.217 1.79-.465 2.428a4.9 4.9 0 0 1-1.153 1.772 4.9 4.9 0 0 1-1.772 1.153c-.637.248-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.217-2.428-.465a4.9 4.9 0 0 1-1.772-1.153 4.9 4.9 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.01 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428A4.9 4.9 0 0 1 3.678 3.678 4.9 4.9 0 0 1 5.45 2.525c.637-.248 1.363-.415 2.428-.465C8.944 2.01 9.283 2 12 2Zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.857.344-.467.182-.8.399-1.15.748-.35.35-.566.683-.748 1.15-.137.352-.3.881-.344 1.857-.05 1.054-.06 1.37-.06 4.04s.01 2.986.06 4.04c.045.976.207 1.505.344 1.857.182.467.399.8.748 1.15.35.35.683.566 1.15.748.352.137.881.3 1.857.344 1.054.05 1.37.06 4.04.06s2.986-.01 4.04-.06c.976-.045 1.505-.207 1.857-.344.467-.182.8-.399 1.15-.748.35-.35.566-.683.748-1.15.137-.352.3-.881.344-1.857.05-1.054.06-1.37.06-4.04s-.01-2.986-.06-4.04c-.045-.976-.207-1.505-.344-1.857a3.1 3.1 0 0 0-.748-1.15 3.1 3.1 0 0 0-1.15-.748c-.352-.137-.881-.3-1.857-.344-1.054-.05-1.37-.059-4.04-.059ZM12 7.351A4.649 4.649 0 1 1 12 16.65a4.649 4.649 0 0 1 0-9.298Zm0 1.802a2.847 2.847 0 1 0 0 5.694 2.847 2.847 0 0 0 0-5.694Zm5.919-2.005a1.11 1.11 0 1 1-2.221 0 1.11 1.11 0 0 1 2.221 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Chevron({ dir }: { dir: "left" | "right" }) {
  const d = dir === "left" ? "M15 5 8 12l7 7" : "m9 5 7 7-7 7";
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d={d} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Brand({ href = "#topo" }: { href?: string }) {
  function goToTop(event: MouseEvent<HTMLAnchorElement>) {
    if (href !== "#topo") return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    if (window.location.hash !== "#topo") {
      history.pushState(null, "", "#topo");
    }
  }

  return (
    <a href={href} className="brand" aria-label="cub4Studio - início" onClick={goToTop}>
      <img src="/img/icon-transparent.png" alt="" className="brand-icon" />
      <span className="brand-wordmark">
        cub<span className="brand-accent">4</span>Studio
      </span>
    </a>
  );
}
