import type { Metadata } from "next";
import { DetailsSection, DropSection, FinalCta, IngredientsSection, MomentSection, RitualSection } from "@/components/sections";
import { BuyButton } from "@/components/ui/BuyButton";
import { Header } from "@/components/ui/Header";
import { Reveal } from "@/components/ui/Reveal";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { SpinViewer } from "@/components/ui/SpinViewer";
import { StickyBuy } from "@/components/ui/StickyBuy";
import { WalkIn } from "@/components/ui/WalkIn";
import { liquidGold, productJsonLd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Liquid Gold Frankincense Face Oil | Sacred Creations",
  description:
    "Hand-crafted face oil of certified organic castor and jojoba with raw frankincense resin. Non-comedogenic. Smoke-cleansed, made by hand and charged on the altar for 21 days. $66 for 1 oz.",
  alternates: { canonical: "/liquid-gold" },
};

export default function LiquidGoldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <Header />
      <Reveal />
      <main id="top">
        {/* The real bottle in a lit alcove on the limewash wall. Drag to turn. */}
        <section className="wall relative overflow-hidden" aria-labelledby="product-title">
          <WalkIn className="mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-4 pt-28 pb-20 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
            <div className="niche relative mx-auto aspect-[3/5] w-full max-w-[380px] rounded-t-[999px] rounded-b-md">
              <SpinViewer className="absolute inset-x-[10%] top-[24%] bottom-[4%]" />
            </div>
            <div className="paper rounded-[28px] p-7 shadow-[0_30px_70px_-30px_rgba(46,30,20,0.6)] ring-1 ring-ink/10 md:p-10">
              <p className="mb-4 text-[11px] font-medium tracking-[0.22em] text-copper uppercase sm:text-xs sm:tracking-[0.32em]">{liquidGold.kind}</p>
              <h1 id="product-title" className="font-display text-5xl leading-tight md:text-[3.6rem]">
                {liquidGold.name}
              </h1>
              <p className="mt-2 font-display text-2xl text-copper-deep">
                {liquidGold.price} <span className="text-base text-muted">· {liquidGold.size}</span>
              </p>
              <p className="mt-5 max-w-md text-muted md:text-lg">
                Deep hydration, made with intention. Certified organic castor and jojoba, steeped with raw frankincense resin and finished with frankincense essential oil. Non-comedogenic.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                {[
                  ["Lasts", "6–8 weeks daily"],
                  ["Use", "2–3 drops, AM or PM"],
                  ["Skin feel", "Non-comedogenic"],
                  ["Ships", "US, via USPS"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-parchment/90 p-4">
                    <dt className="text-xs tracking-[0.2em] text-muted uppercase">{k}</dt>
                    <dd className="mt-1 font-display text-xl">{v}</dd>
                  </div>
                ))}
              </dl>
              <div id="hero-cta" className="mt-8">
                <BuyButton location="product" />
              </div>
            </div>
          </WalkIn>
        </section>
        <IngredientsSection />
        <RitualSection />
        <DropSection />
        <MomentSection />
        <DetailsSection />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyBuy />
    </>
  );
}
