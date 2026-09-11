import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { WhatsAppIcon } from "../components/WhatsAppButton";
import { PhoneIcon } from "../components/PhoneLinks";
import { Differentials } from "../components/Differentials";
import {
  ADDRESS,
  BRAZIL_STATES,
  EMAIL,
  HOURS,
  MAPS_EMBED,
  PHONE_FIXO,
  PHONE_FIXO_TEL,
  PHONE_WHATSAPP,
  categoriesByBrand,
  products,
  requestTypes,
  waLink,
  type Brand,
} from "../data";

const brandOptions: { id: Brand | "grupo"; label: string }[] = [
  { id: "flow", label: "Flow — perfuração, sondagens e bombeamento" },
  { id: "triton", label: "Triton — máquinas e compressores" },
  { id: "grupo", label: "Grupo FVT — ainda não sei qual marca" },
];

const fieldCls = "mt-1 w-full rounded-xl border border-navy/15 bg-white px-3 py-3 font-normal text-ink";

function isBrand(v: string | null): v is Brand {
  return v === "flow" || v === "triton";
}

export function Contact() {
  const [params] = useSearchParams();
  const [sent, setSent] = useState(false);

  // Campos pré-setados — podem vir preenchidos pela URL (ex.: botão "enviar pelo formulário" de um produto).
  const [brand, setBrand] = useState<Brand | "grupo">(() => (isBrand(params.get("marca")) ? params.get("marca") as Brand : "flow"));
  const [category, setCategory] = useState(() => params.get("categoria") || "");
  const [product, setProduct] = useState(() => params.get("produto") || "");
  const initialType = params.get("tipo");
  const [type, setType] = useState<string>(() =>
    initialType && (requestTypes as readonly string[]).includes(initialType) ? initialType : requestTypes[0],
  );

  const categories = brand === "grupo" ? [] : categoriesByBrand[brand];
  const selectedCategory = categories.find((c) => c.id === category);

  /** Itens da categoria: o que ela inclui (definição do cliente) + modelos já cadastrados no catálogo. */
  const productOptions = useMemo(() => {
    if (!selectedCategory || brand === "grupo") return [];
    const catalog = products.filter((p) => p.brand === brand && p.category === selectedCategory.id).map((p) => p.name);
    return Array.from(new Set([...catalog, ...selectedCategory.includes]));
  }, [brand, selectedCategory]);

  function onBrandChange(next: Brand | "grupo") {
    setBrand(next);
    setCategory("");
    setProduct("");
  }

  function onCategoryChange(next: string) {
    setCategory(next);
    setProduct("");
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") || "");
    const tel = String(data.get("telefone") || "");
    const empresa = String(data.get("empresa") || "");
    const uf = String(data.get("uf") || "");
    const qtd = String(data.get("quantidade") || "");
    const msg = String(data.get("mensagem") || "");
    const brandLabel = brandOptions.find((b) => b.id === brand)?.label ?? "Grupo FVT";

    const lines = [
      `Olá! Sou ${nome}${empresa ? ` (${empresa})` : ""}.`,
      `Telefone: ${tel}${uf ? ` · UF: ${uf}` : ""}`,
      `Solicitação: ${type}`,
      `Marca: ${brandLabel}`,
      selectedCategory ? `Categoria: ${selectedCategory.label}` : null,
      product ? `Item: ${product}${qtd ? ` · Qtd: ${qtd}` : ""}` : null,
      msg ? `Mensagem: ${msg}` : null,
    ].filter(Boolean);

    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <main>
      <section className="bg-navy px-4 py-16 text-white sm:px-6">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow">Contato</p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl">Envie sua solicitação</h1>
          <p className="mt-3 max-w-xl text-white/80">
            Atendimento técnico em Itapema-SC, envio para todo o Brasil e suporte técnico pós-venda.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-navy/10 p-6">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
                <PhoneIcon className="h-4 w-4" /> Telefone fixo
              </p>
              <a href={`tel:${PHONE_FIXO_TEL}`} className="mt-2 block text-2xl font-bold text-navy">
                {PHONE_FIXO}
              </a>
              <p className="mt-1 text-sm text-muted">Somente ligação — este número não tem WhatsApp.</p>
            </div>
            <div className="rounded-2xl border border-[#25D366]/40 bg-[#25D366]/5 p-6">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#128C4A]">
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </p>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="mt-2 block text-2xl font-bold text-navy">
                {PHONE_WHATSAPP}
              </a>
              <p className="mt-1 text-sm text-muted">Mensagens e ligações. Atendimento comercial e técnico.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-navy/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">E-mail</p>
            <p className="mt-2 font-semibold text-navy">{EMAIL}</p>
          </div>
          <div className="rounded-2xl border border-navy/10 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Endereço</p>
            <p className="mt-2 font-semibold text-navy">{ADDRESS}</p>
            <p className="mt-1 text-sm text-muted">{HOURS}</p>
          </div>
          <iframe
            title="Mapa Itapema"
            className="h-64 w-full rounded-2xl border-0"
            loading="lazy"
            src={MAPS_EMBED}
          />
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl bg-paper p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">O que você precisa</p>

          <label className="mt-3 block text-sm font-semibold text-navy">
            Tipo de solicitação
            <select name="tipo" value={type} onChange={(e) => setType(e.target.value)} className={fieldCls}>
              {requestTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="mt-4 block text-sm font-semibold text-navy">
            Marca
            <select name="marca" value={brand} onChange={(e) => onBrandChange(e.target.value as Brand | "grupo")} className={fieldCls}>
              {brandOptions.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.label}
                </option>
              ))}
            </select>
          </label>

          {brand !== "grupo" ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-navy">
                Categoria
                <select name="categoria" value={category} onChange={(e) => onCategoryChange(e.target.value)} className={fieldCls}>
                  <option value="">Selecione…</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-navy">
                Item / produto
                <select
                  name="produto"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  disabled={!selectedCategory}
                  className={`${fieldCls} disabled:cursor-not-allowed disabled:bg-sand/60 disabled:text-muted`}
                >
                  <option value="">{selectedCategory ? "Selecione…" : "Escolha a categoria"}</option>
                  {productOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                  {product && !productOptions.includes(product) ? <option value={product}>{product}</option> : null}
                </select>
              </label>
            </div>
          ) : null}

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-gold">Seus dados</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-semibold text-navy">
              Nome
              <input required name="nome" autoComplete="name" className={fieldCls} />
            </label>
            <label className="text-sm font-semibold text-navy">
              Telefone / WhatsApp
              <input required name="telefone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(47) 99999-9999" className={fieldCls} />
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_1fr_minmax(6rem,0.5fr)]">
            <label className="text-sm font-semibold text-navy">
              E-mail
              <input type="email" name="email" autoComplete="email" className={fieldCls} />
            </label>
            <label className="text-sm font-semibold text-navy">
              Empresa <span className="font-normal text-muted">(opcional)</span>
              <input name="empresa" autoComplete="organization" className={fieldCls} />
            </label>
            <label className="text-sm font-semibold text-navy">
              UF
              <select name="uf" defaultValue="SC" className={fieldCls}>
                {BRAZIL_STATES.map((uf) => (
                  <option key={uf} value={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(7rem,0.4fr)_1fr]">
            <label className="text-sm font-semibold text-navy">
              Quantidade
              <input name="quantidade" type="number" min={1} inputMode="numeric" placeholder="1" className={fieldCls} />
            </label>
            <label className="text-sm font-semibold text-navy">
              Mensagem <span className="font-normal text-muted">(opcional)</span>
              <textarea
                name="mensagem"
                rows={3}
                placeholder="Diâmetro, profundidade, pressão do compressor, prazo…"
                className={fieldCls}
              />
            </label>
          </div>
          <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-bold text-white hover:bg-[#1ebe5d]">
            <WhatsAppIcon className="h-5 w-5" />
            Enviar no WhatsApp
          </button>
          {sent ? <p className="mt-3 text-sm text-muted">Abrimos o WhatsApp com a sua mensagem.</p> : null}
        </form>
      </section>

      <Differentials layout="cards" className="border-t border-navy/10" />
    </main>
  );
}
