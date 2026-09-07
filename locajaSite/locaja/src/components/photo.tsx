type PhotoProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export function Photo({ src, alt, className, priority }: PhotoProps) {
  return (
    // Local files in /public — skip next/image so the dev server does not
    // re-optimize 100+ assets on every navigation.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={className}
    />
  );
}
