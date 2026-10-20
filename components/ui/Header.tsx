import { BuyButton } from "./BuyButton";
import { Wordmark } from "./Logo";

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="Sacred Creations, handmade with intention, back to top">
          <Wordmark light className="text-parchment" />
        </a>
        <nav aria-label="Main" className="hidden items-center gap-8 rounded-full bg-parchment/85 py-1.5 pr-1.5 pl-7 text-sm tracking-[0.12em] text-muted uppercase shadow-[0_8px_30px_-12px_rgba(46,30,20,0.35)] backdrop-blur md:flex">
          <a href="#bottle" className="hover:text-ink">The bottle</a>
          <a href="#ingredients" className="hover:text-ink">Ingredients</a>
          <a href="#ritual" className="hover:text-ink">Ritual</a>
          <a href="#details" className="hover:text-ink">Details</a>
          <BuyButton location="header" label="Buy" className="min-h-10 px-5 py-2 text-xs" />
        </nav>
      </div>
    </header>
  );
}
