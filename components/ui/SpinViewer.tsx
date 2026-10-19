"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// A turntable of 20 real photos of the bottle (public/spin, aligned from the client's photos).
// Drag or use the arrow keys to turn it; it turns slowly on its own until someone touches it.
const FRAMES = 20;
const src = (i: number) => `/spin/${String(i).padStart(2, "0")}.webp`;

export function SpinViewer({ className = "" }: { className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; frame: number } | null>(null);
  const [frame, setFrame] = useState(0);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [touched, setTouched] = useState(false);

  // Load the other 19 frames once the viewer gets close to the screen.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "300px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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

  // Slow idle turn, only while visible, loaded and untouched.
  useEffect(() => {
    if (!ready || !inView || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % FRAMES), 220);
    return () => window.clearInterval(id);
  }, [ready, inView, touched]);

  const turn = useCallback((by: number) => setFrame((f) => (((f + by) % FRAMES) + FRAMES) % FRAMES), []);

  const onPointerDown = (e: React.PointerEvent) => {
    setTouched(true);
    drag.current = { x: e.clientX, frame };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !box.current) return;
    const step = Math.max(10, box.current.clientWidth / 18);
    const next = drag.current.frame - Math.round((e.clientX - drag.current.x) / step);
    setFrame(((next % FRAMES) + FRAMES) % FRAMES);
  };
  const onPointerUp = () => {
    drag.current = null;
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      setTouched(true);
      turn(e.key === "ArrowRight" ? 1 : -1);
    }
  };

  return (
    <div
      ref={box}
      role="slider"
      tabIndex={0}
      aria-label="Liquid Gold bottle, turn to see the front and back label"
      aria-valuemin={1}
      aria-valuemax={FRAMES}
      aria-valuenow={frame + 1}
      aria-valuetext={`View ${frame + 1} of ${FRAMES}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onKeyDown={onKeyDown}
      className={`group relative cursor-grab touch-pan-y select-none active:cursor-grabbing ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- frames are pre-sized WebP, swapped every few ms */}
      <img
        src={src(ready ? frame : 0)}
        alt="Liquid Gold in frosted glass with a bamboo dropper, photographed all the way around so both sides of the label show"
        width={600}
        height={992}
        draggable={false}
        loading="lazy"
        decoding="async"
        className="pointer-events-none h-full w-full object-cover"
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-5 flex justify-center transition-opacity duration-700 ${touched ? "opacity-0" : "opacity-100"}`}
      >
        <span className="inline-flex items-center gap-3 rounded-full bg-parchment/85 px-4 py-2 text-[11px] font-medium tracking-[0.24em] text-ink uppercase backdrop-blur">
          <span className="text-copper">&larr;</span> Drag to turn <span className="text-copper">&rarr;</span>
        </span>
      </div>
    </div>
  );
}
