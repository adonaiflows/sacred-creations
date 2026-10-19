import { BuyButton } from "@/components/ui/BuyButton";
import { Header } from "@/components/ui/Header";
import { LogoMark } from "@/components/ui/Logo";
import { ParallaxPhoto } from "@/components/ui/ParallaxPhoto";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { Spirograph } from "@/components/ui/Spirograph";
import { StickyBuy } from "@/components/ui/StickyBuy";
import { BottleShowcase } from "@/components/three/BottleShowcase";
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

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <Header />
      <Reveal />
      <main id="top">
        {/* HERO */}
        <section className="sunwash relative overflow-hidden pt-24 md:pt-28" aria-labelledby="hero-title">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 sm:px-6 md:min-h-[min(880px,100svh)] md:grid-cols-[1.1fr_1fr] md:gap-12 md:pb-20">
            <div className="relative z-10">
              <Eyebrow>Liquid Gold · Frankincense face oil</Eyebrow>
              <h1 id="hero-title" className="font-display text-[2.7rem] leading-[1.05] text-balance sm:text-6xl lg:text-[4.4rem]">
                Deep hydration, <span className="text-copper">made with intention.</span>
              </h1>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-muted sm:text-lg">
                Cold-pressed organic castor and jojoba, steeped with raw frankincense resin and finished by hand in small batches. Two or three drops leave dry skin soft, supple and more even-looking.
              </p>
              <div id="hero-cta" className="mt-8 flex flex-col items-start gap-3">
                <BuyButton location="hero" />
                <p className="text-sm text-muted">
                  {product.size} · lasts {product.lasts} · in stock, made to order
                </p>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[460px]">
              <Spirograph className="pointer-events-none absolute -top-16 -right-24 h-[130%] w-[130%] text-copper/30 motion-safe:animate-[spin-slow_120s_linear_infinite]" />
              <ParallaxPhoto
                src="/images/bottle-fence.jpg"
                alt="A frosted bottle of Liquid Gold with a bamboo dropper and white bulb, resting on a weathered wooden fence post with mountains behind"
                sizes="(min-width: 768px) 460px, 92vw"
                priority
                objectPosition="52% 46%"
                className="aspect-[4/5] rounded-t-[999px] rounded-b-[28px] shadow-[0_40px_80px_-40px_rgba(46,30,20,0.55)] ring-1 ring-ink/10 md:aspect-[3/4]"
              />
            </div>
          </div>
        </section>

        {/* PROOF */}
        <section className="paper border-y border-ink/10" aria-labelledby="proof-title">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
            <h2 id="proof-title" className="sr-only">Liquid Gold at a glance</h2>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4" data-reveal>
              {[
                ["4", "ingredients, all named on the label"],
                ["21+", "days resting on the altar before it ships"],
                ["2–3", "drops per use, face, hands or body"],
                ["6–8", "weeks from one 1 oz bottle"],
              ].map(([n, label]) => (
                <div key={label} className="border-l border-copper/40 pl-4">
                  <dt className="font-display text-4xl text-copper md:text-5xl">{n}</dt>
                  <dd className="mt-1 text-sm leading-snug text-muted">{label}</dd>
                </div>
              ))}
            </dl>
            {/* TODO: real customer reviews with names and permission. Hidden from the live site until they exist. */}
            <div className="mt-10 rounded-2xl border border-dashed border-copper/50 p-5 text-center text-sm text-muted" data-todo="reviews">
              <span className="font-medium text-copper">TODO: customer reviews.</span> Two or three real reviews, with first name and permission, go here.
            </div>
          </div>
        </section>

        {/* STORY (from the label) */}
        <section className="relative overflow-hidden" aria-labelledby="story-title">
          <Spirograph className="pointer-events-none absolute top-1/2 left-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 text-copper/15" />
          <div className="relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 md:py-32" data-reveal>
            <LogoMark className="mx-auto mb-8 h-14 w-14 text-copper" />
            <h2 id="story-title" className="font-display text-3xl leading-snug text-balance md:text-[2.75rem]">
              {labelStory}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted md:text-lg">
              More than skincare, it is a ritual: a moment of presence, intention and self-honoring woven into the everyday.
            </p>
          </div>
        </section>

        {/* 3D BOTTLE */}
        <section id="bottle" className="paper relative overflow-hidden border-y border-ink/10" aria-labelledby="bottle-title">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-24">
            <div className="relative h-[460px] md:h-[620px]">
              <BottleShowcase />
            </div>
            <div data-reveal>
              <Eyebrow>The bottle</Eyebrow>
              <h2 id="bottle-title" className="font-display text-4xl leading-tight md:text-5xl">
                One ounce of <span className="text-copper">liquid gold.</span>
              </h2>
              <p className="mt-4 max-w-md text-muted md:text-lg">
                Frosted glass, a bamboo dropper and a parchment label you&apos;ll want to keep on display.
                <span className="hidden md:inline"> Drag the bottle to turn it.</span>
              </p>
              <dl className="mt-8 grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10">
                {[
                  ["Size", "1 fl oz"],
                  ["Lasts", "6–8 weeks daily"],
                  ["Use", "2–3 drops, AM or PM"],
                  ["Ships", "US, via USPS"],
                ].map(([k, v]) => (
                  <div key={k} className="bg-parchment p-4">
                    <dt className="text-xs tracking-[0.2em] text-muted uppercase">{k}</dt>
                    <dd className="mt-1 font-display text-xl">{v}</dd>
                  </div>
                ))}
              </dl>
              <BuyButton location="bottle" className="mt-8" />
            </div>
          </div>
        </section>

        {/* INGREDIENTS */}
        <section id="ingredients" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28" aria-labelledby="ingredients-title">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div className="md:sticky md:top-24 md:self-start" data-reveal>
              <Eyebrow>What&apos;s inside</Eyebrow>
              <h2 id="ingredients-title" className="font-display text-4xl leading-tight md:text-5xl">
                Four ingredients. <span className="text-copper">Nothing else.</span>
              </h2>
              <p className="mt-4 text-muted md:text-lg">All-natural, handcrafted, and every one printed on the label.</p>
              <ParallaxPhoto
                src="/images/bottle-trio.jpg"
                alt="Three bottles of Liquid Gold standing on red sandstone, glowing yellow in the afternoon light"
                sizes="(min-width: 768px) 440px, 92vw"
                objectPosition="50% 55%"
                depth={10}
                className="mt-10 aspect-[4/5] rounded-[28px] shadow-[0_30px_60px_-35px_rgba(46,30,20,0.5)]"
              />
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

        {/* RITUAL */}
        <section id="ritual" className="on-dark relative overflow-hidden bg-ink text-parchment" aria-labelledby="ritual-title">
          <Spirograph className="pointer-events-none absolute -top-40 -right-40 h-[640px] w-[640px] text-oil/15" />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.15fr] md:py-28">
            <div data-reveal>
              <p className="mb-4 text-xs font-medium tracking-[0.32em] text-oil uppercase">The Sacred Creations Standard</p>
              <h2 id="ritual-title" className="font-display text-4xl leading-tight md:text-5xl">
                Made slowly, <span className="text-oil">on purpose.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-parchment/75">
                Every bottle is made to order in Albuquerque, New Mexico, and passes through the same three steps before it reaches you.
              </p>
              <figure className="mt-10 border-l border-oil/50 pl-6">
                <p className="text-xs tracking-[0.28em] text-oil uppercase">Affirmation for daily ritual</p>
                <blockquote className="mt-3 font-display text-2xl leading-snug">&ldquo;{affirmation}&rdquo;</blockquote>
                <figcaption className="mt-3 text-sm text-parchment/70">From the Liquid Gold label</figcaption>
              </figure>
            </div>
            <ol className="space-y-6">
              {standard.map((s) => (
                <li key={s.title} className="flex gap-6 border-b border-parchment/10 pb-6" data-reveal>
                  <span className="font-display text-2xl text-oil">{s.step}</span>
                  <div>
                    <h3 className="font-display text-3xl">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-parchment/75">{s.body}</p>
                  </div>
                </li>
              ))}
              <li className="rounded-2xl bg-ink-soft p-6" data-reveal>
                <p className="text-xs tracking-[0.28em] text-oil uppercase">How to use</p>
                <p className="mt-2 font-display text-2xl leading-snug">Warm 2–3 drops in your palms and press into clean, slightly damp skin, morning or night.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* MID CTA */}
        <section className="sunwash" aria-labelledby="mid-cta-title">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-24">
            <ParallaxPhoto
              src="/images/bottle-woodchips.jpg"
              alt="Liquid Gold lying on cedar wood chips, its parchment label showing the flower of life logo and ingredient list"
              sizes="(min-width: 768px) 520px, 92vw"
              objectPosition="55% 50%"
              className="aspect-[4/5] rounded-[28px] shadow-[0_30px_60px_-35px_rgba(46,30,20,0.5)] md:order-2"
            />
            <div data-reveal>
              <h2 id="mid-cta-title" className="font-display text-4xl leading-tight text-balance md:text-5xl">
                Give your skin a moment that&apos;s <span className="text-copper">just for you.</span>
              </h2>
              <p className="mt-4 max-w-md text-muted md:text-lg">
                One {product.size} bottle, made to order and shipped within the US. Unopened bottles can be returned within 30 days.
              </p>
              <BuyButton location="mid" className="mt-8" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 md:py-28" aria-labelledby="faq-title">
          <Eyebrow>Questions</Eyebrow>
          <h2 id="faq-title" className="font-display text-4xl md:text-5xl">Before you buy</h2>
          <div className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden className="text-2xl leading-none text-copper transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="final-cta" className="on-dark relative overflow-hidden bg-copper-deep text-parchment" aria-labelledby="final-title">
          <Spirograph className="pointer-events-none absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-parchment/10" />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center sm:px-6 md:py-28">
            <LogoMark className="mb-6 h-14 w-14 text-oil" />
            <h2 id="final-title" className="font-display text-5xl leading-tight md:text-6xl">Ready when you are.</h2>
            <p className="mt-4 max-w-md text-parchment/80">I am grounded. I am pure. I am golden.</p>
            <BuyButton location="footer" variant="light" className="mt-8" />
            <p className="mt-4 text-sm text-parchment/75">Secure checkout on our Shopify store · Shop Pay, Apple Pay, PayPal and cards</p>
          </div>
        </section>
      </main>

      <footer className="on-dark bg-ink text-parchment/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 pt-10 pb-6 text-sm sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <LogoMark className="h-8 w-8 text-oil" />
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
