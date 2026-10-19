"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showcaseState } from "./showcaseState";

const BottleScene = dynamic(() => import("./BottleScene"), { ssr: false });

function canRun3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Phones get the poster: it keeps scroll smooth and pages fast on mid-range devices.
  if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return false;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if ((nav.deviceMemory ?? 8) < 4 || (navigator.hardwareConcurrency ?? 8) < 4) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

// Poster first (a render of this same model); the live, drag-to-turn bottle loads only when the
// section approaches the viewport on a capable desktop, and fades in once its first frame is drawn.
export function BottleShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const capable = canRun3D();
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting && capable) setEnabled(true);
      },
      { rootMargin: "300px" },
    );
    io.observe(el);

    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onUpdate: (self) => (showcaseState.scroll = self.progress),
    });
    return () => {
      io.disconnect();
      st.kill();
    };
  }, []);

  // Mouse drag turns the bottle. Touch is ignored so the page always scrolls.
  const lastX = useRef(0);
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ready) return;
    showcaseState.dragging = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!showcaseState.dragging) return;
    showcaseState.dragVelocity = (e.clientX - lastX.current) * 0.008;
    lastX.current = e.clientX;
  };
  const endDrag = () => (showcaseState.dragging = false);

  return (
    <div
      ref={wrap}
      className={`relative h-full w-full ${ready ? "cursor-grab active:cursor-grabbing" : ""}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      style={{ touchAction: "pan-y" }}
    >
      <Image
        src="/posters/liquid-gold-3d.png"
        alt="The Liquid Gold bottle: frosted glass filled with golden oil, a bamboo dropper with a white bulb, and the parchment Sacred Creations label"
        fill
        sizes="(min-width: 768px) 45vw, 90vw"
        className={`object-contain transition-opacity duration-700 ${ready ? "opacity-0" : "opacity-100 motion-safe:animate-[float_7s_ease-in-out_infinite]"}`}
      />
      {enabled && (
        <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
          <BottleScene active={visible} onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
