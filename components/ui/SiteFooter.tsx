import Link from "next/link";
import { LogoMark } from "./Logo";
import { contact, stockists } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-ink text-parchment/70">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-14 pb-8 text-sm sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <LogoMark className="h-9 w-9 text-sandstone" />
            <p className="tracking-[0.32em] text-parchment uppercase">Sacred Creations</p>
          </div>
          <p className="mt-4 max-w-xs leading-relaxed">Intentional, natural, heart-crafted. Made in small batches in New Mexico.</p>
        </div>
        <div>
          <p className="text-xs tracking-[0.24em] text-parchment uppercase">Visit</p>
          <ul className="mt-4 space-y-2">
            <li><Link className="hover:text-parchment" href="/liquid-gold">Liquid Gold</Link></li>
            <li><Link className="hover:text-parchment" href="/about">About</Link></li>
            <li><Link className="hover:text-parchment" href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.24em] text-parchment uppercase">Find us in person</p>
          <ul className="mt-4 space-y-2">
            {stockists.map((s) => (
              <li key={s.name}>
                {s.name}
                <br />
                <span className="text-parchment/60">{s.place}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs tracking-[0.24em] text-parchment uppercase">Say hello</p>
          <ul className="mt-4 space-y-2">
            <li><a className="break-all hover:text-parchment" href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><a className="hover:text-parchment" href={contact.instagram}>Instagram</a></li>
            <li><a className="hover:text-parchment" href={contact.tiktok}>TikTok</a></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto max-w-6xl border-t border-parchment/10 px-4 pt-6 pb-28 text-xs text-parchment/60 sm:px-6 md:pb-10">
        Liquid Gold is a cosmetic and has not been evaluated by the FDA. It is not intended to diagnose, treat, cure or prevent any disease.
      </p>
    </footer>
  );
}
