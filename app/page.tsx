import { getImageProps } from "next/image";
import { FinalCta, IngredientsSection, MomentSection, RitualSection, ShopWall, StockistsBand } from "@/components/sections";
import { BuyButton } from "@/components/ui/BuyButton";
import { Header } from "@/components/ui/Header";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { Spirograph } from "@/components/ui/Spirograph";
import { StickyBuy } from "@/components/ui/StickyBuy";
import { Ticker } from "@/components/ui/Ticker";
import { labelStory, product, productJsonLd } from "@/lib/site";

function HeroPicture() {
  const alt = "Two bottles of Liquid Gold on red sandstone with eucalyptus, baby's breath and soft linen";
  const { props: { srcSet: wide } } = getImageProps({ alt, src: "/images/hero-two-bottles.jpg", width: 2400, height: 1350, sizes: "100vw", quality: 75 });
  const { props: { srcSet: tall, ...img } } = getImageProps({ alt, src: "/images/bottle-sandstone.jpg", width: 1350, height: 2400, sizes: "100vw", quality: 75, preload: true });
  return (
    <picture className="absolute inset-0 -z-20">
      <source media="(min-width: 768px)" srcSet={wide} />
      <source srcSet={tall} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from getImageProps */}
      <img {...img} fetchPriority="high" className="h-full w-full object-cover object-[50%_30%] md:object-center" />
    </picture>
  );
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <Header light />
      <Reveal />
      <main id="top">
        {/* 01 · HERO: the store's own photo, full-bleed, with the words over it.
            Wide two-bottle shot on desktop, the tall single bottle on phones. */}
        <section className="on-dark relative isolate flex min-h-svh items-end overflow-hidden bg-ink text-parchment md:items-center" aria-labelledby="hero-title">
          <HeroPicture />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-linear-to-t from-ink/85 via-ink/20 to-transparent md:bg-[radial-gradient(42%_60%_at_50%_42%,rgba(46,30,20,0.62),rgba(46,30,20,0.25)_70%,rgba(46,30,20,0.1))]"
          />
          <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-12 sm:px-6 md:pb-28 md:text-center">
            <div className="md:mx-auto md:max-w-[34rem]">
              <p className="mb-4 text-[11px] font-medium tracking-[0.22em] text-parchment/90 uppercase sm:text-xs sm:tracking-[0.32em]">Liquid Gold · Frankincense face oil</p>
              <h1 id="hero-title" className="font-display text-[2.7rem] leading-[1.04] text-balance [text-shadow:0_2px_24px_rgba(46,30,20,0.45)] sm:text-6xl lg:text-[4.4rem]">
                Deep hydration, <span className="accent">made with intention.</span>
              </h1>
              <p className="mt-5 hidden text-lg leading-relaxed text-parchment/90 [text-shadow:0_1px_12px_rgba(46,30,20,0.5)] md:block">
                Certified organic castor and jojoba, steeped with raw frankincense resin. Two or three drops leave dry skin soft and supple.
              </p>
              <div id="hero-cta" className="mt-8 flex flex-col items-start gap-3 md:items-center">
                <BuyButton location="hero" variant="light" />
                <p className="text-sm text-parchment/85">
                  {product.size} · lasts {product.lasts} · in stock
                </p>
              </div>
            </div>
          </div>
        </section>

        <Ticker
          className="border-y border-ink/10 bg-parchment-deep py-4 font-display text-lg text-ink-soft md:text-xl"
          items={["Cold-pressed castor", "Certified organic jojoba", "Raw frankincense resin", "Non-comedogenic", "Albuquerque, New Mexico", "21 days on the altar", "Nourishment over noise"]}
        />

        {/* 02 · STORY: the label's own words */}
        <section className="relative flex min-h-svh items-center overflow-hidden" aria-labelledby="story-title">
          <Spirograph className="pointer-events-none absolute top-1/2 left-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 text-copper/15" />
          <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6" data-reveal>
            <LogoMark className="mx-auto mb-10 h-14 w-14 text-copper" />
            <h2 id="story-title" className="font-display text-[2rem] leading-snug text-balance md:text-[3.2rem]">
              {labelStory.replace("About nourishment over noise.", "")}
              <span className="accent text-copper">About nourishment over noise.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-xl text-muted md:text-lg">
              More than skincare, it is a ritual: a moment of presence, intention and self-honoring woven into the everyday.
            </p>
            <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-8 text-left md:grid-cols-4">
              {[
                ["3", "ingredients, all named on the label"],
                ["21+", "days resting on the altar before it ships"],
                ["2–3", "drops per use, face, hands or body"],
                ["6–8", "weeks from one 1 oz bottle"],
              ].map(([n, label]) => (
                <div key={label} className="border-l border-copper/40 pl-4">
                  <dt className="font-display text-4xl text-copper">{n}</dt>
                  <dd className="mt-1 text-sm leading-snug text-muted">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <ShopWall />
        <IngredientsSection chapter="Chapter one" />
        <RitualSection chapter="Chapter two" />
        <MomentSection chapter="Chapter three" />
        <StockistsBand />
        <FinalCta />
      </main>
      <SiteFooter />
      <StickyBuy />
    </>
  );
}
