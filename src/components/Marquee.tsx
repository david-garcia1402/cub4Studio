import { useEffect, useRef } from "react";
import { marqueeItems } from "../data/site";

function Group({ clone = false }: { clone?: boolean }) {
  return (
    <div className="marquee-group" {...(clone ? { "data-clone": "" } : {})}>
      {marqueeItems.map((item) => (
        <span key={`${clone ? "c" : "o"}-${item}`}>
          {item}
          <span> • </span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const marquee = rootRef.current;
    const track = marquee?.querySelector<HTMLElement>(".marquee-track");
    const source = track?.querySelector<HTMLElement>(".marquee-group");
    if (!marquee || !track || !source) return;

    const fill = () => {
      track.querySelectorAll(".marquee-group[data-clone]").forEach((el) => el.remove());
      const groupWidth = source.offsetWidth;
      if (!groupWidth) return;
      const copies = Math.max(2, Math.ceil(marquee.offsetWidth / groupWidth) + 1);
      const existing = track.querySelectorAll(".marquee-group").length;
      for (let i = existing; i < copies; i += 1) {
        const clone = source.cloneNode(true) as HTMLElement;
        clone.setAttribute("data-clone", "");
        track.appendChild(clone);
      }
      track.style.setProperty("--marquee-distance", `${groupWidth}px`);
    };

    fill();
    window.addEventListener("resize", fill);
    return () => window.removeEventListener("resize", fill);
  }, []);

  return (
    <section className="marquee" aria-hidden="true" ref={rootRef}>
      <div className="marquee-track">
        <Group />
      </div>
    </section>
  );
}
