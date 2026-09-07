import { IconSearch } from "./icons";

export function SearchBox({
  variant = "light",
  defaultValue = "",
}: {
  variant?: "light" | "dark";
  defaultValue?: string;
}) {
  const dark = variant === "dark";

  return (
    <form
      action="/equipamentos"
      method="get"
      className={`flex overflow-hidden rounded-2xl ${
        dark ? "bg-white shadow-2xl" : "border border-black/8 bg-white"
      }`}
    >
      <input
        name="q"
        defaultValue={defaultValue}
        placeholder="Ex: Furadeira, Betoneira, Lixadeira..."
        className="min-w-0 flex-1 bg-transparent px-5 py-4 text-sm text-ink outline-none placeholder:text-steel/70"
      />
      <button
        type="submit"
        className="m-1.5 inline-flex items-center gap-2 rounded-xl bg-locaja px-4 py-3 text-sm font-semibold text-white hover:bg-locaja-dark"
      >
        <IconSearch size={16} />
        Buscar
      </button>
    </form>
  );
}
