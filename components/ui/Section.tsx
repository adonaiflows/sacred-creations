export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mb-4 text-[11px] font-medium tracking-[0.22em] text-copper uppercase sm:text-xs sm:tracking-[0.32em] ${className}`}>{children}</p>
  );
}
