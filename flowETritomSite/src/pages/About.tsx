import { LogoFlow, LogoTriton } from "../components/Logos";
import { ADDRESS, HOURS } from "../data";

export function About() {
  return (
    <main>
      <section className="relative min-h-[40vh] overflow-hidden bg-navy text-white">
        <img src="/images/setor-construcao.webp" alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-yellow">Quem somos</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl sm:text-6xl">Durabilidade e confiança. Marcas do Grupo FVT.</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-navy">A maior distribuidora do Sul do Brasil</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            A Flow — equipamentos para poços artesianos — e a Triton — máquinas, compressores, mineração e sondagem —
            são marcas do Grupo FVT. Juntas oferecem soluções para a indústria de perfuração de rocha, com alta
            tecnologia e qualidade de mercado.
          </p>
          <p className="mt-4 text-base leading-7 text-muted">
            Há mais de uma década somos referência nacional, com entrega ágil, crédito na compra e garantia. Sede
            própria em Itapema - Santa Catarina, estoque diversificado e pronta entrega.
          </p>
          <p className="mt-4 text-sm font-semibold text-navy">{ADDRESS}</p>
          <p className="text-sm text-muted">{HOURS}</p>
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img
            src="/images/claudio.webp"
            alt="Claudio Patricio, fundador do Grupo FVT, com bit DTH no estoque de Itapema"
            className="h-full w-full object-cover"
            width={1080}
            height={1440}
          />
        </div>
      </section>

      <section className="bg-paper px-4 py-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-8">
            <LogoFlow className="h-16 w-auto sm:h-20" />
            <h3 className="mt-6 font-display text-2xl text-navy">Flow</h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Ferramentas e equipamentos para poços artesianos: martelos CIR, semi-turbinados e turbinados, bits,
              brocas PDC e tricônicas, hastes e motobombas.
            </p>
          </article>
          <article className="rounded-3xl bg-navy p-8 text-white">
            <LogoTriton variant="light" className="h-20 w-auto sm:h-24" />
            <h3 className="mt-6 font-display text-2xl">Triton</h3>
            <p className="mt-2 text-sm leading-6 text-white/80">
              Máquinas e compressores, perfuratrizes, desmonte de rochas, fundações, contenções e sondagem geotécnica.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
