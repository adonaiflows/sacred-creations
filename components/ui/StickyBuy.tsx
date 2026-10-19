"use client";

import { useEffect, useState } from "react";
import { BuyButton } from "./BuyButton";
import { product } from "@/lib/site";

// Phone-only bar that appears once the hero CTA has scrolled away.
export function StickyBuy() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-cta");
    const footer = document.getElementById("final-cta");
    if (!hero || !footer) return;
    let heroGone = false;
    let footerIn = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroGone = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === footer) footerIn = e.isIntersecting;
      });
      setShow(heroGone && !footerIn);
    });
    io.observe(hero);
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-parchment/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "pointer-events-none invisible translate-y-full"
      }`}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="font-display text-lg">{product.name}</p>
          <p className="text-xs text-muted">{product.size} · {product.lasts}</p>
        </div>
        <BuyButton location="sticky" label="Buy" className="px-5" />
      </div>
    </div>
  );
}
