import { whatsappHref } from "@/lib/data";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition hover:scale-105 md:right-8 md:bottom-8"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 2.1 17.1L1 23l6.1-1.1A11 11 0 0 0 20.5 3.5Zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.6.7.7-3.5-.2-.4A9 9 0 1 1 12 20.5Zm5-6.7c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.2-.7.9-.8 1-.3.2-.6 0a7.4 7.4 0 0 1-2.2-1.4 8.1 8.1 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.2-.3a.5.5 0 0 0 0-.5c0-.1-.6-1.5-.8-2s-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-1 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.5 4 10 10 0 0 0 2.4.9 4 4 0 0 0 1.9.1 3.1 3.1 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3Z" />
      </svg>
    </a>
  );
}
