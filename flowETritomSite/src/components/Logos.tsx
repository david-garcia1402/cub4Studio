type LogoProps = {
  className?: string;
  variant?: "dark" | "light";
};

export function LogoFlow({ className = "h-11", variant = "dark" }: LogoProps) {
  const src = variant === "light" ? "/logos/flow-light.png" : "/logos/flow-dark.png";
  return (
    <img
      src={src}
      alt="flow. soluções para perfuração de rocha"
      className={`block w-auto object-contain object-left ${className}`}
      width={1572}
      height={895}
    />
  );
}

export function LogoTriton({ className = "h-12", variant = "dark" }: LogoProps) {
  const src = variant === "light" ? "/logos/triton-light.png" : "/logos/triton-dark.png";
  return (
    <img
      src={src}
      alt="Triton máquinas e compressores"
      className={`block w-auto object-contain ${className}`}
      width={320}
      height={243}
    />
  );
}

type GrupoProps = {
  className?: string;
  /** Mantido por compatibilidade; o emblema circular é a única marca do grupo. */
  variant?: "navy" | "light" | "emblem";
  loading?: "eager" | "lazy";
};

/**
 * Emblema circular do Grupo FVT (GRUPO / FVT / 11 ANOS).
 * SVG vetorial com texto convertido em paths: nítido em qualquer tamanho e sem depender de fontes.
 * Funciona sobre fundo claro ou escuro (o círculo é preenchido em navy).
 */
export function LogoGrupoFVT({ className = "h-24 w-24", loading = "eager" }: GrupoProps) {
  return (
    <img
      src="/logos/grupo-fvt-emblem.svg"
      alt="Grupo FVT — 11 anos"
      className={`block aspect-square object-contain ${className}`}
      width={1000}
      height={1000}
      loading={loading}
      decoding="async"
    />
  );
}

/** @deprecated use LogoGrupoFVT */
export const LogoGrupoFTV = LogoGrupoFVT;
