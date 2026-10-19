// A slow, endless strip of words. The list is rendered twice so the loop has no seam;
// the copy is hidden from screen readers so it is only read once.
export function Ticker({ items, className = "" }: { items: string[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 pr-10 whitespace-nowrap">
          <span>{t}</span>
          <span aria-hidden className="text-copper">&#10022;</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max motion-safe:animate-[ticker_60s_linear_infinite]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
