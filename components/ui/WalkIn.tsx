"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scales its scene up slightly as the section scrolls into view, so it feels like stepping
// toward the display rather than scrolling past it.
export function WalkIn({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.fromTo(
      el.current,
      { scale: 0.86, opacity: 0.6 },
      { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: el.current, start: "top bottom", end: "top 15%", scrub: true } },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div ref={el} className={`origin-center will-change-transform ${className}`}>
      {children}
    </div>
  );
}
