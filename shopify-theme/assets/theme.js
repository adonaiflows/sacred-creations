/* Sacred Creations theme behaviour. No libraries: reveal on scroll, the walk-in scale, the growing
   photo, the bottle turntable, the details tabs and the phone buy bar. Everything is readable
   without this file; it only adds motion and interaction. */
(() => {
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

  /* Fade up [data-reveal] elements as they enter (skipped for anything already on screen). */
  function reveal() {
    if (still || !("IntersectionObserver" in window)) return;
    const els = [...document.querySelectorAll("[data-reveal]")].filter((el) => el.getBoundingClientRect().top > innerHeight);
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.style.opacity = "1";
          e.target.style.transform = "none";
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(28px)";
      el.style.transition = "opacity .9s cubic-bezier(.2,.7,.2,1), transform .9s cubic-bezier(.2,.7,.2,1)";
      io.observe(el);
    });
  }

  /* Scroll-linked effects, run together on one animation frame. */
  const scrubbers = [];
  function onScroll() {
    let ticking = false;
    const run = () => {
      ticking = false;
      scrubbers.forEach((f) => f());
    };
    addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(run);
      }
    }, { passive: true });
    addEventListener("resize", run);
    run();
  }

  /* [data-walk-in]: the scene scales up slightly as it scrolls into view, like stepping toward the display. */
  function walkIn() {
    if (still) return;
    document.querySelectorAll("[data-walk-in]").forEach((el) => {
      el.style.willChange = "transform";
      scrubbers.push(() => {
        const top = el.getBoundingClientRect().top;
        const t = clamp((innerHeight - top) / (innerHeight * 0.85), 0, 1);
        el.style.transform = `scale(${0.86 + 0.14 * t})`;
        el.style.opacity = String(0.6 + 0.4 * t);
      });
    });
  }

  /* [data-grow]: one photo opens from a small arch to the full screen height as you scroll. */
  function grow() {
    if (still) return;
    document.querySelectorAll("[data-grow]").forEach((wrap) => {
      const frame = wrap.querySelector("[data-grow-frame]");
      const copy = wrap.querySelector("[data-grow-copy]");
      scrubbers.push(() => {
        const r = wrap.getBoundingClientRect();
        const t = clamp(-r.top / (r.height - innerHeight), 0, 1);
        const k = 1 - t;
        const round = 999 * k;
        frame.style.clipPath = `inset(${22 * k}% ${24 * k}% ${22 * k}% ${24 * k}% round ${round}px ${round}px ${28 * k}px ${28 * k}px)`;
        const c = clamp((t - 0.6) / 0.35, 0, 1);
        copy.style.opacity = String(c);
        copy.style.transform = `translateY(${30 * (1 - c)}px)`;
      });
    });
  }

  /* [data-spin]: the bottle turntable. Two stacked frames are cross-faded each paint so the turn
     reads as continuous. Turns slowly on its own; drag, swipe or arrow keys turn it by hand. */
  function spin(box) {
    const FRAMES = Number(box.dataset.frames || 40);
    const IDLE_SPEED = FRAMES / 14; // one full turn every 14s
    const RESUME_AFTER = 3500;
    const first = box.dataset.first;
    const src = (i) => first.replace("spin-00.webp", `spin-${String(i).padStart(2, "0")}.webp`);
    const wrap = (p) => ((p % FRAMES) + FRAMES) % FRAMES;
    const a = box.querySelector("[data-spin-a]");
    const b = box.querySelector("[data-spin-b]");
    const hint = box.querySelector("[data-spin-hint]");
    let pos = 0, vel = 0, lastTouch = -Infinity, drag = null, ready = false, inView = false, raf = 0;

    const paint = () => {
      const p = wrap(pos);
      const i = Math.floor(p);
      const sa = src(i), sb = src((i + 1) % FRAMES);
      if (a.getAttribute("src") !== sa) a.setAttribute("src", sa);
      if (b.getAttribute("src") !== sb) b.setAttribute("src", sb);
      b.style.opacity = (p - i).toFixed(3);
      box.setAttribute("aria-valuenow", String(i + 1));
      box.setAttribute("aria-valuetext", `View ${i + 1} of ${FRAMES}`);
    };
    let prev = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      if (!drag) {
        if (Math.abs(vel) > 0.05) {
          pos += vel * dt;
          vel *= Math.pow(0.04, dt);
        } else if (!still && now - lastTouch > RESUME_AFTER) {
          pos += IDLE_SPEED * dt;
        }
      }
      paint();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      cancelAnimationFrame(raf);
      if (ready && inView) {
        prev = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const touched = () => {
      if (hint) hint.style.opacity = "0";
      vel = 0;
      lastTouch = performance.now();
    };
    new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !ready) {
        Promise.all(Array.from({ length: FRAMES }, (_, i) => {
          const img = new Image();
          img.src = src(i);
          return img.decode().catch(() => undefined);
        })).then(() => {
          ready = true;
          start();
        });
      }
      start();
    }, { rootMargin: "300px 0px" }).observe(box);

    const step = () => Math.max(6, box.clientWidth / 22);
    box.addEventListener("pointerdown", (e) => {
      touched();
      drag = { x: e.clientX, pos, lastX: e.clientX, lastT: performance.now() };
      box.setPointerCapture(e.pointerId);
    });
    box.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const now = performance.now();
      pos = drag.pos - (e.clientX - drag.x) / step();
      vel = -((e.clientX - drag.lastX) / step()) / (Math.max(1, now - drag.lastT) / 1000);
      drag.lastX = e.clientX;
      drag.lastT = now;
      lastTouch = now;
      if (!ready) paint();
    });
    const up = () => {
      drag = null;
      lastTouch = performance.now();
    };
    box.addEventListener("pointerup", up);
    box.addEventListener("pointercancel", up);
    box.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      touched();
      pos = Math.round(pos) + (e.key === "ArrowRight" ? 2 : -2);
      paint();
    });
  }

  /* [data-tabs]: WAI-ARIA tabs; arrow keys move between tabs. */
  function tabs(root) {
    const list = [...root.querySelectorAll('[role="tab"]')];
    const select = (i) => {
      list.forEach((t, j) => {
        const on = i === j;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
    };
    list.forEach((t, i) => {
      t.addEventListener("click", () => select(i));
      t.addEventListener("keydown", (e) => {
        const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!dir) return;
        e.preventDefault();
        const next = (i + dir + list.length) % list.length;
        select(next);
        list[next].focus();
      });
    });
  }

  /* [data-sticky-buy]: shows once #hero-cta has scrolled away, hides at #final-cta. */
  function stickyBuy() {
    const bar = document.querySelector("[data-sticky-buy]");
    const hero = document.getElementById("hero-cta");
    const footer = document.getElementById("final-cta");
    if (!bar || !hero || !footer) return;
    let heroGone = false, footerIn = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) heroGone = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (e.target === footer) footerIn = e.isIntersecting;
      });
      const show = heroGone && !footerIn;
      bar.classList.toggle("translate-y-full", !show);
      bar.classList.toggle("invisible", !show);
      bar.classList.toggle("pointer-events-none", !show);
      bar.toggleAttribute("inert", !show);
      bar.setAttribute("aria-hidden", String(!show));
    });
    io.observe(hero);
    io.observe(footer);
  }

  function init() {
    reveal();
    walkIn();
    grow();
    onScroll();
    document.querySelectorAll("[data-spin]").forEach(spin);
    document.querySelectorAll("[data-tabs]").forEach(tabs);
    stickyBuy();
  }
  // Theme editor: wire up a section again when the merchant edits it.
  document.addEventListener("shopify:section:load", (e) => {
    e.target.querySelectorAll("[data-spin]").forEach(spin);
    e.target.querySelectorAll("[data-tabs]").forEach(tabs);
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
