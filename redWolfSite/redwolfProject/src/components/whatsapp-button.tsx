import { unitWhatsApp } from "@/lib/brand";
import { useCart } from "@/lib/cart";

export function WhatsAppButton() {
  const { unit } = useCart();

  return (
    <a
      href={unitWhatsApp(unit)}
      target="_blank"
      rel="noreferrer"
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition-transform hover:scale-105"
      aria-label="Pedir pelo WhatsApp"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.2L1 23l5.9-1.1A11 11 0 0 0 21.5 8.7a10.8 10.8 0 0 0-1-5.2zM12 20.2a9.1 9.2 0 0 1-4.6-1.3l-.3-.2-3.5.7.7-3.4-.2-.3A9.2 9.2 0 1 1 12 20.2zm5.3-6.9c-.3-.1-1.7-.8-2-.9s-.5-.1-.6.1-.8.9-.9 1.1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3 0-.4s-.6-1.5-.8-2-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3a2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3 3 10 10 0 0 0 3.2 1.3 3 3 0 0 0 1.9.1 2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c-.1-.1-.3-.2-.6-.3z" />
      </svg>
    </a>
  );
}
