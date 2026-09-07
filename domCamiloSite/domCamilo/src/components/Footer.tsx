import { restaurant, whatsappHref } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-[#100c09] px-5 py-16 text-cream md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-4xl">{restaurant.shortName}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/55">
            {restaurant.description}
          </p>
        </div>
        <div className="flex flex-col gap-2 text-sm text-cream/70">
          <a href={restaurant.phoneHref} className="hover:text-brass">
            {restaurant.phone}
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brass"
          >
            WhatsApp
          </a>
          <p>{restaurant.address}</p>
        </div>
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-white/8 pt-6 text-xs text-cream/40">
        © {new Date().getFullYear()} {restaurant.name}. Casa de almoço e
        rodízio em Canoas.
      </div>
    </footer>
  );
}
