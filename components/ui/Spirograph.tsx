// The nautilus of turning circles printed on the Liquid Gold label, as a decorative SVG.
export function Spirograph({ className = "", count = 54 }: { className?: string; count?: number }) {
  const circles = Array.from({ length: count }, (_, i) => {
    const r = 46 * Math.pow(0.955, i);
    const a = i * 0.21;
    return { cx: 50 + Math.cos(a) * r * 0.42, cy: 50 + Math.sin(a) * r * 0.42, r };
  });
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" aria-hidden>
      {circles.map((c, i) => (
        <circle key={i} cx={c.cx.toFixed(3)} cy={c.cy.toFixed(3)} r={c.r.toFixed(3)} strokeWidth={0.12} />
      ))}
    </svg>
  );
}
