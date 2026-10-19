export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mb-4 text-xs font-medium tracking-[0.32em] text-copper uppercase ${className}`}>{children}</p>
  );
}
