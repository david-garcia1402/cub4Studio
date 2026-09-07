type WhatsAppMarkProps = {
  size?: number;
  className?: string;
};

export function WhatsAppMark({ size = 22, className = "" }: WhatsAppMarkProps) {
  return (
    // Official WhatsApp mark provided by the client — not an icon drawing.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/brand/whatsapp.png"
      alt=""
      width={size}
      height={size}
      className={`inline-block shrink-0 rounded-full object-cover ${className}`}
    />
  );
}
