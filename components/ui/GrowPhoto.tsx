"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  src: string;
  alt: string;
  objectPosition?: string;
  children?: React.ReactNode; // text that sits beside (desktop) or over (phone) the photo
};

// One photo that opens up from a small arch to the full screen height as you scroll.
// It sits in a tall wrapper with a sticky stage, so the page keeps scrolling normally.
export function GrowPhoto({ src, alt, objectPosition = "50% 50%", children }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom bottom", scrub: true },
      });
      tl.fromTo(
        frame.current,
        { clipPath: "inset(22% 24% 22% 24% round 999px 999px 28px 28px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "none", duration: 1 },
      ).fromTo(copy.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none", duration: 0.35 }, 0.6);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrap} className="relative h-[200svh]">
      <div className="sticky top-0 flex h-svh items-center justify-center overflow-hidden">
        <div ref={frame} className="relative h-full w-full md:w-[min(100%,56svh)]">
          <Image src={src} alt={alt} fill sizes="(min-width: 768px) 56vh, 100vw" className="object-cover" style={{ objectPosition }} />
        </div>
        <div ref={copy} className="absolute inset-0 flex items-end md:items-center">{children}</div>
      </div>
    </div>
  );
}
