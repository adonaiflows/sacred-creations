"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { showcaseState } from "./showcaseState";

const BottleScene = dynamic(() => import("./BottleScene"), { ssr: false });

type Mode = "auto" | "tap" | "poster";

// Desktop loads the live bottle automatically. Phones show the poster with a "Turn it in 3D" button,
// so the page stays fast and the 3D only loads for people who ask for it.
function hasWebGL2() {
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

// Creating a test WebGL context is costly on phones, so it only happens for desktops and on tap.
function pickMode(): Mode {
  if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return "tap";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "tap";
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return "tap";
  if ((nav.deviceMemory ?? 8) < 4 || (navigator.hardwareConcurrency ?? 8) < 4) return "tap";
  return hasWebGL2() ? "auto" : "poster";
}

export function BottleShowcase() {
  const wrap = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("poster");
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const m = pickMode();
    setMode(m);
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting && m === "auto") setEnabled(true);
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

  // Sideways drag turns the bottle. touch-action: pan-y leaves vertical swipes to the page, so a
  // phone can always scroll past it.
  const lastX = useRef(0);
  const onPointerDown = (e: React.PointerEvent) => {
    if (!ready) return;
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
          <BottleScene active={visible} mobile={mode === "tap"} onReady={() => setReady(true)} />
        </div>
      )}
      {mode === "tap" && !enabled && (
        <button
          type="button"
          onClick={() => (hasWebGL2() ? setEnabled(true) : setMode("poster"))}
          className="absolute bottom-2 left-1/2 inline-flex min-h-11 -translate-x-1/2 items-center gap-2 rounded-full border border-copper/40 bg-parchment/90 px-5 text-sm tracking-[0.12em] text-copper-deep uppercase shadow-sm backdrop-blur"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
            <path d="M3 12a9 4 0 1 0 18 0 9 4 0 1 0-18 0" />
            <path d="M18 9l3 3-3 3" />
          </svg>
          Turn it in 3D
        </button>
      )}
      {enabled && !ready && (
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted" role="status">Loading 3D…</p>
      )}
      {mode === "tap" && ready && (
        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs tracking-[0.12em] text-muted uppercase">Swipe sideways to turn</p>
      )}
    </div>
  );
}
