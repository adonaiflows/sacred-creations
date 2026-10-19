"use client";

import { track } from "@vercel/analytics";
import { BUY_URL, product } from "@/lib/site";

type Props = {
  location: string;
  className?: string;
  label?: string;
  variant?: "copper" | "light";
};

// The one primary CTA on the page. Every instance goes to the Shopify product page
// and fires a `buy_click` conversion event tagged with where it was clicked.
const variants = {
  copper: "bg-copper text-parchment hover:bg-copper-deep shadow-[0_12px_30px_-12px_rgba(132,64,31,0.7)]",
  light: "bg-parchment text-copper-deep hover:bg-white shadow-[0_12px_30px_-12px_rgba(0,0,0,0.45)]",
};

export function BuyButton({ location, className = "", label, variant = "copper" }: Props) {
  return (
    <a
      href={BUY_URL}
      onClick={() => track("buy_click", { location })}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-7 py-3.5 text-[15px] font-medium tracking-[0.08em] uppercase transition active:translate-y-px ${variants[variant]} ${className}`}
    >
      <span>{label ?? `Buy ${product.name}`}</span>
      <span aria-hidden className="h-4 w-px bg-current opacity-40" />
      <span>{product.price}</span>
    </a>
  );
}
