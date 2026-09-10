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
      width={420}
      height={213}
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
  variant?: "navy" | "light" | "emblem";
};

export function LogoGrupoFVT({ className = "h-16 w-auto", variant = "navy" }: GrupoProps) {
  const src =
    variant === "light"
      ? "/logos/grupo-fvt-light.png"
      : variant === "emblem"
        ? "/logos/grupo-fvt-emblem.png"
        : "/logos/grupo-fvt-navy.png";
  const size =
    variant === "emblem"
      ? { width: 400, height: 400 }
      : { width: 1600, height: 640 };

  return (
    <img
      src={src}
      alt="Grupo FVT — Flow e Triton"
      className={`block object-contain ${className}`}
      width={size.width}
      height={size.height}
    />
  );
}

/** @deprecated use LogoGrupoFVT */
export const LogoGrupoFTV = LogoGrupoFVT;
