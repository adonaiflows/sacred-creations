import Image, { getImageProps } from "next/image";
import { BuyButton } from "@/components/ui/BuyButton";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { GrowPhoto } from "@/components/ui/GrowPhoto";
import { Header } from "@/components/ui/Header";
import { LogoMark } from "@/components/ui/Logo";
import { ParallaxPhoto } from "@/components/ui/ParallaxPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { SpinViewer } from "@/components/ui/SpinViewer";
import { Spirograph } from "@/components/ui/Spirograph";
import { StickyBuy } from "@/components/ui/StickyBuy";
import { Ticker } from "@/components/ui/Ticker";
import { WalkIn } from "@/components/ui/WalkIn";
import { affirmation, BUY_URL, contact, faqs, ingredients, labelStory, product, standard } from "@/lib/site";

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Liquid Gold",
  description:
    "All-natural handcrafted face oil: cold-pressed organic castor and jojoba oils, raw organic frankincense resin and frankincense essential oil. 1 fl oz.",
  brand: { "@type": "Brand", name: "Sacred Creations" },
  offers: { "@type": "Offer", price: "66.00", priceCurrency: "USD", availability: "https://schema.org/InStock", url: BUY_URL },
};

const faq = (q: string) => faqs.find((f) => f.q === q)?.a;

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
      <Header />
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
                Cold-pressed organic castor and jojoba, steeped with raw frankincense resin. Two or three drops leave dry skin soft and supple.
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
          items={["Cold-pressed castor", "Organic jojoba", "Raw frankincense resin", "Non-comedogenic", "Albuquerque, New Mexico", "21 days on the altar", "Nourishment over noise"]}
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
                ["4", "ingredients, all named on the label"],
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

        {/* 03 · THE BOTTLE: the real bottle floating in a lit alcove on a limewash wall, drag to turn */}
        <section id="bottle" className="wall relative overflow-hidden" aria-labelledby="bottle-title">
          <WalkIn className="mx-auto grid min-h-svh max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
            <div className="niche relative mx-auto aspect-[3/5] w-full max-w-[400px] rounded-t-[999px] rounded-b-md">
              <SpinViewer className="absolute inset-x-[10%] top-[24%] bottom-[4%]" />
            </div>
            <div className="paper rounded-[28px] p-7 shadow-[0_30px_70px_-30px_rgba(46,30,20,0.6)] ring-1 ring-ink/10 md:p-10" data-reveal>
              <Eyebrow>Chapter one · The bottle</Eyebrow>
              <h2 id="bottle-title" className="font-display text-4xl leading-tight md:text-[3.2rem]">
                Golden from <span className="accent text-copper">every angle.</span>
              </h2>
              <p className="mt-5 max-w-md text-muted md:text-lg">
                Frosted glass, a bamboo dropper and a hand-finished parchment label made to be kept on display. Turn it around to read the back.
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
              <BuyButton location="bottle" className="mt-8" />
            </div>
          </WalkIn>
        </section>

        {/* 04 · INGREDIENTS: sticky heading with the bottle beside the numbered list */}
        <section id="ingredients" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28" aria-labelledby="ingredients-title">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start" data-reveal>
              <Eyebrow>Chapter two · What&apos;s inside</Eyebrow>
              <h2 id="ingredients-title" className="font-display text-4xl leading-tight md:text-5xl">
                Four ingredients. <span className="accent text-copper">Nothing else.</span>
              </h2>
              <p className="mt-4 text-muted md:text-lg">All-natural, non-comedogenic and handcrafted, with every ingredient printed on the label.</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-xs tracking-[0.16em] text-ink-soft uppercase">
                {["Non-comedogenic", "Organic oils", "Four ingredients"].map((t) => (
                  <li key={t} className="rounded-full border border-copper/40 bg-parchment/70 px-3 py-1.5">{t}</li>
                ))}
              </ul>
              <div className="relative mt-10 aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-t-[999px] rounded-b-[28px] shadow-[0_30px_60px_-35px_rgba(46,30,20,0.5)] ring-1 ring-ink/10">
                <Image
                  src="/images/label-closeup.jpg"
                  alt="Close-up of the Liquid Gold label listing cold-pressed castor oil, cold-pressed jojoba oil, raw frankincense resin and frankincense essential oil, all organic"
                  fill
                  sizes="(min-width: 768px) 420px, 92vw"
                  className="object-cover"
                  style={{ objectPosition: "50% 60%" }}
                />
              </div>
            </div>
            <ol className="divide-y divide-ink/10 border-y border-ink/10 md:mt-24">
              {ingredients.map((i, n) => (
                <li key={i.name} className="grid grid-cols-[auto_1fr] gap-6 py-8" data-reveal>
                  <span className="font-display text-2xl text-copper">0{n + 1}</span>
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl">{i.name}</h3>
                    <p className="mt-1 text-xs tracking-[0.2em] text-sage uppercase">{i.note}</p>
                    <p className="mt-3 leading-relaxed text-muted">{i.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 05 · RITUAL: the three-step standard as numbered cards */}
        <section id="ritual" className="on-dark relative overflow-hidden bg-ink text-parchment" aria-labelledby="ritual-title">
          <Spirograph className="pointer-events-none absolute -top-40 -right-40 h-[640px] w-[640px] text-sandstone/15" />
          <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
            <div className="max-w-2xl" data-reveal>
              <p className="mb-4 text-xs font-medium tracking-[0.32em] text-sandstone uppercase">Chapter three · The Sacred Creations Standard</p>
              <h2 id="ritual-title" className="font-display text-4xl leading-tight md:text-[3.4rem]">
                Made slowly, <span className="accent text-sandstone">on purpose.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-parchment/75">
                Every batch is made by hand in Albuquerque, New Mexico, and passes through the same three steps before it reaches you.
              </p>
            </div>
            <ol className="mt-14 grid gap-5 md:grid-cols-3">
              {standard.map((s) => (
                <li key={s.title} className="flex flex-col rounded-[28px] border border-parchment/15 bg-ink-soft/60 p-8" data-reveal>
                  <span className="font-display text-6xl text-sandstone/80">{s.step}</span>
                  <h3 className="mt-10 font-display text-3xl">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-parchment/75">{s.body}</p>
                </li>
              ))}
            </ol>
            <figure className="mt-16 max-w-3xl border-l border-sandstone/50 pl-6" data-reveal>
              <p className="text-xs tracking-[0.28em] text-sandstone uppercase">Affirmation for daily ritual</p>
              <blockquote className="mt-3 font-display text-2xl leading-snug md:text-3xl">&ldquo;{affirmation}&rdquo;</blockquote>
              <figcaption className="mt-3 text-sm text-parchment/70">From the Liquid Gold label</figcaption>
            </figure>
          </div>
        </section>

        {/* THE DROP: one photo opens up to full height as you scroll */}
        <section aria-label="How it goes on">
          <GrowPhoto
            src="/images/dropper-cheek-tall.jpg"
            alt="A glass dropper releasing a drop of Liquid Gold onto a cheek"
            objectPosition="50% 45%"
          >
            <div className="w-full bg-linear-to-t from-ink/80 to-transparent px-4 pt-24 pb-14 text-parchment sm:px-6 md:mx-auto md:flex md:max-w-6xl md:justify-between md:bg-none md:p-0 md:text-ink">
              <p className="font-display text-4xl leading-tight md:max-w-[15rem] md:text-5xl">Two or three drops.</p>
              <p className="accent text-4xl leading-tight md:max-w-[15rem] md:text-right md:text-5xl md:text-copper">Pressed into damp skin.</p>
            </div>
          </GrowPhoto>
        </section>

        {/* 06 · EDITORIAL: full-height photo beside a quiet call to buy */}
        <section className="grid md:min-h-svh md:grid-cols-2" aria-labelledby="moment-title">
          <div className="paper flex items-center justify-center px-4 py-12 sm:px-6 md:py-16">
            <Image
              src="/images/bottle-woodchips.jpg"
              alt="Close-up of Liquid Gold on wood chips: frosted glass with golden oil, a bamboo dropper and the parchment label"
              width={1800}
              height={3199}
              sizes="(min-width: 768px) 46svh, 90vw"
              className="h-auto w-full max-w-[420px] rounded-t-[999px] rounded-b-[28px] shadow-[0_40px_80px_-40px_rgba(46,30,20,0.6)] ring-1 ring-ink/10 md:h-[84svh] md:w-auto md:max-w-none"
            />
          </div>
          <div className="sunwash flex flex-col justify-center px-4 py-20 sm:px-6 md:px-12 lg:px-20" data-reveal>
            <Eyebrow>Chapter four · Your ritual</Eyebrow>
            <h2 id="moment-title" className="font-display text-4xl leading-tight text-balance md:text-[3.4rem]">
              Give your skin a moment <span className="accent text-copper">that&apos;s just for you.</span>
            </h2>
            <p className="mt-6 max-w-md text-muted md:text-lg">
              Warm 2–3 drops in your palms and press into clean, slightly damp skin, morning or night. One {product.size} bottle lasts {product.lasts}.
            </p>
            <BuyButton location="mid" className="mt-10 self-start" />
          </div>
        </section>

        {/* 07 · DETAILS: tabs instead of an FAQ list */}
        <section id="details" className="paper border-y border-ink/10" aria-labelledby="details-title">
          <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28">
            <Eyebrow>Before you buy</Eyebrow>
            <h2 id="details-title" className="font-display text-4xl md:text-5xl">
              The <span className="accent text-copper">details.</span>
            </h2>
            <div className="mt-10">
              <DetailTabs
                tabs={[
                  {
                    label: "Ingredients",
                    content: (
                      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                        <p className="font-display text-2xl leading-snug">Four ingredients, non-comedogenic, nothing else.</p>
                        <p className="leading-relaxed text-muted">{faq("What exactly is in it?")}</p>
                      </div>
                    ),
                  },
                  {
                    label: "How to use",
                    content: (
                      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                        <p className="font-display text-2xl leading-snug">2–3 drops, morning or night.</p>
                        <div className="space-y-4 leading-relaxed text-muted">
                          <p>{faq("How do I use it?")}</p>
                          <p>{faq("How long does one bottle last?")}</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: "Shipping",
                    content: (
                      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                        <p className="font-display text-2xl leading-snug">Shipped within the US by USPS.</p>
                        <div className="space-y-4 leading-relaxed text-muted">
                          <p>{faq("When will it ship?")}</p>
                          <p>{faq("What if it isn't right for me?")}</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    label: "Sensitive skin",
                    content: (
                      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
                        <p className="font-display text-2xl leading-snug">Patch test first.</p>
                        <p className="leading-relaxed text-muted">{faq("Is it okay for sensitive skin?")}</p>
                      </div>
                    ),
                  },
                ]}
              />
            </div>
            {/* TODO: real customer reviews with names and permission. Hidden from the live site until they exist. */}
            <div className="mt-14 rounded-2xl border border-dashed border-copper/50 p-5 text-center text-sm text-muted" data-todo="reviews">
              <span className="font-medium text-copper">TODO: customer reviews.</span> Two or three real reviews, with first name and permission, go here.
            </div>
          </div>
        </section>

        {/* 08 · FINAL CTA */}
        <section id="final-cta" className="on-dark relative flex min-h-[80svh] items-center overflow-hidden bg-copper-deep text-parchment" aria-labelledby="final-title">
          <Spirograph className="pointer-events-none absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-parchment/10" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6">
            <LogoMark className="mb-8 h-14 w-14 text-sandstone" />
            <h2 id="final-title" className="font-display text-5xl leading-tight md:text-7xl">
              Ready <span className="accent text-sandstone">when you are.</span>
            </h2>
            <p className="mt-5 max-w-md text-parchment/80">I am grounded. I am pure. I am golden.</p>
            <BuyButton location="footer" variant="light" className="mt-10" />
            <p className="mt-4 text-sm text-parchment/75">Secure checkout on our Shopify store · Shop Pay, Apple Pay, PayPal and cards</p>
          </div>
        </section>
      </main>

      <footer className="on-dark bg-ink text-parchment/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-10 pb-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8 text-sandstone" />
            <p className="tracking-[0.32em] text-parchment uppercase">Sacred Creations</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><a className="hover:text-parchment" href={`mailto:${contact.email}`}>{contact.email}</a></li>
            <li><a className="hover:text-parchment" href={contact.instagram}>Instagram</a></li>
            <li><a className="hover:text-parchment" href={contact.tiktok}>TikTok</a></li>
          </ul>
        </div>
        <p className="mx-auto max-w-6xl px-4 pb-28 text-xs text-parchment/60 sm:px-6 md:pb-10">
          Liquid Gold is a cosmetic and has not been evaluated by the FDA. It is not intended to diagnose, treat, cure or prevent any disease.
        </p>
      </footer>
      <StickyBuy />
    </>
  );
}
