import Link from "next/link";
import { BuyButton } from "./BuyButton";
import { Wordmark } from "./Logo";

const links = [
  { href: "/#shop", label: "Shop" },
  { href: "/liquid-gold", label: "Liquid Gold" },
  { href: "/liquid-gold#ritual", label: "Ritual" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// `light` is for pages that open on a dark photo (the home hero); other pages use dark text.
export function Header({ light = false }: { light?: boolean }) {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" aria-label="Sacred Creations, handmade with intention, home">
          <Wordmark light={light} className={light ? "text-parchment" : "text-ink"} />
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-7 rounded-full bg-parchment/85 py-1.5 pr-1.5 pl-7 text-[13px] tracking-[0.12em] text-muted uppercase shadow-[0_8px_30px_-12px_rgba(46,30,20,0.35)] backdrop-blur lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink">
              {l.label}
            </Link>
          ))}
          <BuyButton location="header" label="Buy" className="min-h-10 px-5 py-2 text-xs" />
        </nav>
        <details className="group relative lg:hidden">
          <summary className={`flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full px-4 text-xs tracking-[0.2em] uppercase [&::-webkit-details-marker]:hidden ${light ? "bg-parchment/20 text-parchment backdrop-blur" : "bg-ink/5 text-ink"}`}>
            Menu
          </summary>
          <nav aria-label="Main" className="absolute right-0 mt-2 flex w-56 flex-col rounded-2xl bg-parchment p-2 text-sm tracking-[0.12em] text-ink uppercase shadow-[0_20px_40px_-20px_rgba(46,30,20,0.5)] ring-1 ring-ink/10">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rounded-xl px-4 py-3 hover:bg-parchment-deep">
                {l.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
