// The Sacred Creations mark (seed of life + hexagram), redrawn as SVG from the client's logo file
// (docs/assets/sacredcreations-logo1.png) so it stays crisp at any size.
export function LogoMark({ className = "", strokeWidth = 1.6 }: { className?: string; strokeWidth?: number }) {
  const r = 20;
  const c = 50;
  const centers = [[c, c], ...Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return [c + Math.cos(a) * r, c + Math.sin(a) * r];
  })];
  const tri = (offset: number) =>
    Array.from({ length: 3 }, (_, i) => {
      const a = ((2 * Math.PI) / 3) * i - Math.PI / 2 + offset;
      return `${(c + Math.cos(a) * 2 * r).toFixed(2)},${(c + Math.sin(a) * 2 * r).toFixed(2)}`;
    }).join(" ");
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" aria-hidden>
      {centers.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} strokeWidth={strokeWidth} />
      ))}
      <polygon points={tri(0)} strokeWidth={strokeWidth * 0.45} />
      <polygon points={tri(Math.PI)} strokeWidth={strokeWidth * 0.45} />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="h-9 w-9 text-copper" />
      <span className="flex flex-col leading-none">
        <span className="font-sans text-[15px] font-medium tracking-[0.32em] uppercase">Sacred Creations</span>
        <span className="mt-1 font-sans text-[9px] tracking-[0.34em] text-muted uppercase">Handmade with intention</span>
      </span>
    </span>
  );
}
