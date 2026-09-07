import { Photo } from "./photo";

export function Logo({
  className = "h-11 w-auto",
}: {
  className?: string;
}) {
  return (
    <Photo
      src="/brand/logo-b.png"
      alt="Locajá — Locadora de equipamentos para construção civil"
      priority
      className={`${className} mix-blend-screen`}
    />
  );
}
