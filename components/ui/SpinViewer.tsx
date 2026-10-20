"use client";

import { useEffect, useRef, useState } from "react";

// A turntable of the real bottle: 40 evenly spaced frames (public/spin), cut out and straightened
// from the client's photos. It turns slowly on its own; drag, swipe or use the arrow keys to turn it.
// Two frames are cross-faded each paint so the turn reads as continuous rather than stepped.
const FRAMES = 40;
const IDLE_SPEED = FRAMES / 14; // frames per second: one full turn every 14s
const RESUME_AFTER = 3500; // ms after the last touch before the idle turn picks up again
const src = (i: number) => `/spin/${String(i).padStart(2, "0")}.webp`;
const wrap = (p: number) => ((p % FRAMES) + FRAMES) % FRAMES;

export function SpinViewer({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLImageElement>(null);
  const b = useRef<HTMLImageElement>(null);
  const pos = useRef(0);
  const vel = useRef(0);
  const lastTouch = useRef(-Infinity);
  const drag = useRef<{ x: number; pos: number; lastX: number; lastT: number } | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Load every frame once the viewer gets close to the screen.
  useEffect(() => {
    if (!inView || ready) return;
    let cancelled = false;
    Promise.all(
      Array.from({ length: FRAMES }, (_, i) => {
        const img = new Image();
        img.src = src(i);
        return img.decode().catch(() => undefined);
      }),
    ).then(() => !cancelled && setReady(true));
    return () => {
      cancelled = true;
    };
  }, [inView, ready]);

  const paint = () => {
    const p = wrap(pos.current);
    const i = Math.floor(p);
    const f = p - i;
    if (a.current && b.current) {
      const sa = src(i);
      const sb = src((i + 1) % FRAMES);
      if (!a.current.src.endsWith(sa)) a.current.src = sa;
      if (!b.current.src.endsWith(sb)) b.current.src = sb;
      b.current.style.opacity = f.toFixed(3);
    }
    box.current?.setAttribute("aria-valuenow", String(i + 1));
    box.current?.setAttribute("aria-valuetext", `View ${i + 1} of ${FRAMES}`);
  };

  useEffect(() => {
    if (!ready || !inView) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let prev = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!drag.current) {
        if (Math.abs(vel.current) > 0.05) {
          pos.current += vel.current * dt;
          vel.current *= Math.pow(0.04, dt); // ease out the flick
        } else if (!still && now - lastTouch.current > RESUME_AFTER) {
          pos.current += IDLE_SPEED * dt;
        }
      }
      paint();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ready, inView]);

  const step = () => Math.max(6, (box.current?.clientWidth ?? 300) / 22); // px of drag per frame

  const onPointerDown = (e: React.PointerEvent) => {
    setTouched(true);
    vel.current = 0;
    lastTouch.current = performance.now();
    drag.current = { x: e.clientX, pos: pos.current, lastX: e.clientX, lastT: performance.now() };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const now = performance.now();
    pos.current = d.pos - (e.clientX - d.x) / step();
    const dt = Math.max(1, now - d.lastT) / 1000;
    vel.current = -((e.clientX - d.lastX) / step()) / dt;
    d.lastX = e.clientX;
    d.lastT = now;
    lastTouch.current = now;
    if (!ready) paint();
  };
  const onPointerUp = () => {
    drag.current = null;
    lastTouch.current = performance.now();
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    setTouched(true);
    vel.current = 0;
    lastTouch.current = performance.now();
    pos.current = Math.round(pos.current) + (e.key === "ArrowRight" ? 2 : -2);
    paint();
  };

  const imgClass = "pointer-events-none absolute inset-0 h-full w-full object-contain object-bottom";

  return (
    <div
      ref={box}
      role="slider"
      tabIndex={0}
      aria-label="Liquid Gold bottle, turn to see the front and back label"
      aria-valuemin={1}
      aria-valuemax={FRAMES}
      aria-valuenow={1}
      aria-valuetext={`View 1 of ${FRAMES}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className={`group cursor-grab touch-pan-y select-none active:cursor-grabbing ${className}`}
    >
      {/* Bottle floats on its own; the soft contact shadow breathes with it. */}
      <div className="absolute inset-x-0 top-0 bottom-[13%] drop-shadow-[0_24px_30px_rgba(60,30,10,0.18)] motion-safe:animate-[float_6s_ease-in-out_infinite]">
        {/* eslint-disable-next-line @next/next/no-img-element -- transparent frames, swapped every paint */}
        <img
          ref={a}
          src={src(0)}
          alt="Liquid Gold in frosted glass with a bamboo dropper, photographed all the way around so both sides of the label show"
          width={400}
          height={1152}
          draggable={false}
          loading="lazy"
          decoding="async"
          className={imgClass}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- the next frame, faded in over the first */}
        <img ref={b} src={src(1)} alt="" aria-hidden width={400} height={1152} draggable={false} loading="lazy" decoding="async" className={imgClass} style={{ opacity: 0 }} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[9%] left-1/2 h-[4%] w-[52%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(52,28,12,0.42),rgba(52,28,12,0.12)_60%,transparent)] blur-[3px] motion-safe:animate-[shadow-breathe_6s_ease-in-out_infinite]"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 flex justify-center transition-opacity duration-700 ${touched ? "opacity-0" : "opacity-100"}`}
      >
        <span className="inline-flex items-center gap-3 rounded-full bg-parchment/80 px-4 py-2 text-[11px] font-medium tracking-[0.24em] text-ink uppercase backdrop-blur">
          <span className="text-copper">&larr;</span> Drag to turn <span className="text-copper">&rarr;</span>
        </span>
      </div>
    </div>
  );
}
