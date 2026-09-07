import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-36 pb-24 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-locaja-dark">404</p>
      <h1 className="display mt-3 text-5xl font-black">Página não encontrada</h1>
      <p className="mt-3 text-steel">Esse endereço não existe no novo site da Locajá.</p>
      <Link href="/" className="mt-6 inline-flex rounded-full bg-locaja px-5 py-3 text-sm font-semibold text-white">
        Voltar ao início
      </Link>
    </div>
  );
}
