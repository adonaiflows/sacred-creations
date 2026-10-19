"use client";

import { useRef } from "react";
import { ParallaxPhoto } from "./ParallaxPhoto";

type Props = React.ComponentProps<typeof ParallaxPhoto>;

// A real photo that tilts a few degrees toward the mouse, for depth without a 3D model.
// Mouse only, so touch scrolling is untouched; reduced-motion users get a still photo.
export function TiltPhoto(props: Props) {
  const card = useRef<HTMLDivElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !card.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.current.style.transform = `rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (card.current) card.current.style.transform = "";
  };

  return (
    <div className="[perspective:1200px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={card} className="transition-transform duration-500 ease-out will-change-transform">
        <ParallaxPhoto {...props} />
      </div>
    </div>
  );
}
