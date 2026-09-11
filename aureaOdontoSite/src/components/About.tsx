import { clinic } from "../data";
import { useReveal } from "../hooks";

export function About() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="clinica" ref={ref} className="reveal bg-ivory px-5 py-24 md:px-8 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_80px_rgba(26,22,18,0.12)]">
            <picture>
              <source srcSet="/images/recepcao.webp" type="image/webp" />
              <img
                src="/images/02-interior.jpg"
                alt="Recepção da Áurea Odontologia Premium"
                className="aspect-[4/5] w-full object-cover object-[center_82%]"
                width={1400}
                height={1800}
                loading="lazy"
              />
            </picture>
          </div>
          <div className="absolute -right-3 -bottom-8 hidden w-56 overflow-hidden rounded-3xl border-8 border-ivory shadow-xl sm:block lg:-right-10">
            <img
              src="/images/logo-crop.webp"
              alt="Letreiro dourado Áurea Odontologia Premium"
              className="aspect-[5/4] w-full object-cover object-center"
              width={560}
              height={448}
              loading="lazy"
            />
          </div>
        </div>

        <div>
          <p className="text-[0.72rem] font-medium tracking-[0.32em] text-gold-deep uppercase">A clínica</p>
          <h2 className="font-display mt-3 text-4xl italic leading-tight sm:text-5xl">
            Um espaço pensado para acolher — e para durar
          </h2>
          <div className="gold-line mt-6 h-px w-24" />
          <p className="mt-7 text-[1.05rem] leading-relaxed text-muted">
            A Áurea Odontologia Premium fica no Centro de Jaraguá do Sul e funciona como
            consultório privado de saúde bucal. Pacientes descrevem o ambiente como sofisticado,
            limpo e organizado — com estrutura moderna e conforto durante toda a consulta.
          </p>
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
            O nome vem da proporção áurea: a harmonia entre dentes, gengiva e rosto. Da recepção
            ao procedimento, o atendimento é o ponto mais citado nas avaliações — acolhimento,
            atenção aos detalhes e acompanhamento de perto.
          </p>
          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-[0.68rem] tracking-[0.22em] text-gold-deep uppercase">Responsável técnica</dt>
              <dd className="mt-1 font-medium">
                {clinic.rt}
                <span className="mt-0.5 block text-sm font-normal text-muted">
                  {clinic.cro} · {clinic.epao}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[0.68rem] tracking-[0.22em] text-gold-deep uppercase">Diferenciais</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">
                Clínica liderada por mulheres, ambiente LGBTQ+ friendly, estacionamento exclusivo
                para clientes e canais para confirmação e reagendamento.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
