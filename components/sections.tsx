import Image from "next/image";
import Link from "next/link";
import { BuyButton } from "@/components/ui/BuyButton";
import { DetailTabs } from "@/components/ui/DetailTabs";
import { GrowPhoto } from "@/components/ui/GrowPhoto";
import { LogoMark } from "@/components/ui/Logo";
import { Eyebrow } from "@/components/ui/Section";
import { Spirograph } from "@/components/ui/Spirograph";
import { WalkIn } from "@/components/ui/WalkIn";
import { affirmation, comingSoon, faqs, ingredients, liquidGold, ritual, stockists } from "@/lib/site";

const faq = (q: string) => faqs.find((f) => f.q === q)?.a;

/* THE SHOP WALL: a limewash wall with two reclaimed-wood shelves. Liquid Gold stands on the top
   shelf; the lower shelf holds tags for what's coming next. */
export function ShopWall() {
  return (
    <section id="shop" className="wall relative overflow-hidden" aria-labelledby="shop-title">
      <WalkIn className="mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-[11px] font-medium tracking-[0.28em] text-ink-soft uppercase sm:text-xs">The shop</p>
          <h2 id="shop-title" className="font-display text-4xl leading-tight text-ink md:text-5xl">
            One oil, <span className="accent text-copper-deep">given the whole shelf.</span>
          </h2>
          <p className="mt-4 text-ink-soft md:text-lg">
            Liquid Gold is our only product, on purpose, so all the focus goes into one oil.
          </p>
        </div>

        {/* Top shelf: Liquid Gold */}
        <div className="relative mx-auto mt-16 w-full max-w-4xl">
          <div className="relative flex items-end justify-center gap-6 px-4 sm:gap-12">
            {/* A still, straight-on photo of the real bottle, cut out so it stands on the shelf. */}
            <Image
              src="/images/bottle-front.webp"
              alt="Liquid Gold in frosted glass with a bamboo dropper. The label reads Sacred Creations, Liquid Gold, all-natural handcrafted skincare, and lists cold-pressed castor oil, cold-pressed jojoba oil, raw frankincense resin and frankincense essential oil."
              width={450}
              height={1400}
              sizes="(min-width: 640px) 170px, 130px"
              className="relative z-10 -mb-[4px] h-[min(44svh,400px)] w-auto drop-shadow-[0_14px_14px_rgba(50,25,10,0.35)] sm:h-[min(58svh,520px)]"
            />
            <div className="tag relative -mb-[2px] w-[min(44vw,230px)] rotate-[-2deg] rounded-sm p-4 text-ink sm:p-5">
              <p className="font-display text-xl leading-tight sm:text-2xl">{liquidGold.name}</p>
              <p className="mt-1 text-[11px] tracking-[0.18em] text-ink-soft uppercase">{liquidGold.kind} · {liquidGold.size}</p>
              <p className="mt-3 font-display text-2xl text-copper-deep">{liquidGold.price}</p>
              <Link href="/liquid-gold" className="mt-2 inline-block text-xs tracking-[0.16em] text-ink underline decoration-copper/50 underline-offset-4 uppercase hover:text-copper-deep">
                See inside
              </Link>
            </div>
          </div>
          <div className="shelf" />
          <div className="mt-24 flex justify-center">
            <BuyButton location="shop-shelf" />
          </div>
        </div>

        {/* Lower shelf: what's coming */}
        <div className="relative mx-auto mt-20 w-full max-w-4xl">
          <ul className="flex flex-wrap items-end justify-center gap-3 px-4 pb-1 sm:gap-6">
            {comingSoon.map((c, i) => (
              <li key={c} className={`tag rounded-sm px-4 py-3 text-center ${i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"}`}>
                <p className="font-display text-lg text-ink">{c}</p>
                <p className="text-[10px] tracking-[0.2em] text-ink-soft uppercase">Coming to the shelf</p>
              </li>
            ))}
          </ul>
          <div className="shelf" />
        </div>
      </WalkIn>
    </section>
  );
}

/* INGREDIENTS: sticky heading and label close-up beside the numbered list, with the client's
   own "for the skin" and "the subtle" copy for each. */
export function IngredientsSection({ chapter }: { chapter?: string }) {
  return (
    <section id="ingredients" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28" aria-labelledby="ingredients-title">
      <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="md:sticky md:top-24 md:self-start" data-reveal>
          <Eyebrow>{chapter ? `${chapter} · ` : ""}What&apos;s inside</Eyebrow>
          <h2 id="ingredients-title" className="font-display text-4xl leading-tight md:text-5xl">
            Three ingredients. <span className="accent text-copper">Nothing else.</span>
          </h2>
          <p className="mt-4 text-muted md:text-lg">Certified organic castor and jojoba, raw frankincense resin and its essential oil. Non-comedogenic and hand-crafted in small batches in New Mexico.</p>
          <ul className="mt-6 flex flex-wrap gap-2 text-xs tracking-[0.16em] text-ink-soft uppercase">
            {["Non-comedogenic", "Certified organic oils", "Small batch, NM"].map((t) => (
              <li key={t} className="rounded-full border border-copper/40 bg-parchment/70 px-3 py-1.5">{t}</li>
            ))}
          </ul>
          <div className="relative mt-10 aspect-[4/5] w-full max-w-[420px] overflow-hidden rounded-t-[999px] rounded-b-[28px] shadow-[0_30px_60px_-35px_rgba(46,30,20,0.5)] ring-1 ring-ink/10">
            <Image
              src="/images/label-closeup.jpg"
              alt="Close-up of the Liquid Gold label listing cold-pressed castor oil, cold-pressed jojoba oil, raw frankincense resin and frankincense essential oil"
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
                <p className="mt-1 text-xs tracking-[0.2em] text-sage uppercase">{i.note} · {i.nickname}</p>
                <dl className="mt-4 space-y-3 leading-relaxed">
                  <div>
                    <dt className="text-[11px] tracking-[0.2em] text-copper uppercase">For the skin</dt>
                    <dd className="text-muted">{i.skin}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.2em] text-copper uppercase">The subtle</dt>
                    <dd className="text-muted">{i.subtle}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* THE SACRED CREATION RITUAL: Opening, Creation, Refinement as numbered cards. */
export function RitualSection({ chapter }: { chapter?: string }) {
  return (
    <section id="ritual" className="on-dark relative overflow-hidden bg-ink text-parchment" aria-labelledby="ritual-title">
      <Spirograph className="pointer-events-none absolute -top-40 -right-40 h-[640px] w-[640px] text-sandstone/15" />
      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-center px-4 py-24 sm:px-6">
        <div className="max-w-2xl" data-reveal>
          <p className="mb-4 text-xs font-medium tracking-[0.32em] text-sandstone uppercase">{chapter ? `${chapter} · ` : ""}The Sacred Creation Ritual</p>
          <h2 id="ritual-title" className="font-display text-4xl leading-tight md:text-[3.4rem]">
            Made slowly, <span className="accent text-sandstone">on purpose.</span>
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-parchment/75">
            Liquid Gold is not simply manufactured skincare. Every bottle is made by hand in New Mexico and taken through the same three steps before it reaches you.
          </p>
        </div>
        <ol className="mt-14 grid gap-5 md:grid-cols-3">
          {ritual.map((s) => (
            <li key={s.title} className="flex flex-col rounded-[28px] border border-parchment/15 bg-ink-soft/60 p-8" data-reveal>
              <span className="font-display text-6xl text-sandstone/80">{s.step}</span>
              <p className="mt-10 text-xs tracking-[0.24em] text-sandstone uppercase">{s.phase}</p>
              <h3 className="mt-1 font-display text-3xl">{s.title}</h3>
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
  );
}

/* THE DROP: one photo opens up to full height as you scroll. */
export function DropSection() {
  return (
    <section aria-label="How it goes on">
      <GrowPhoto src="/images/dropper-cheek-tall.jpg" alt="A glass dropper releasing a drop of Liquid Gold onto a cheek" objectPosition="50% 45%">
        <div className="w-full bg-linear-to-t from-ink/80 to-transparent px-4 pt-24 pb-14 text-parchment sm:px-6 md:mx-auto md:flex md:max-w-6xl md:justify-between md:bg-none md:p-0 md:text-ink">
          <p className="font-display text-4xl leading-tight md:max-w-[15rem] md:text-5xl">Two or three drops.</p>
          <p className="accent text-4xl leading-tight md:max-w-[15rem] md:text-right md:text-5xl md:text-copper">Pressed into damp skin.</p>
        </div>
      </GrowPhoto>
    </section>
  );
}

/* A MOMENT FOR YOU: the woodchips photo whole, in an arch, beside a quiet call to buy. */
export function MomentSection({ chapter }: { chapter?: string }) {
  return (
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
        <Eyebrow>{chapter ? `${chapter} · ` : ""}Your ritual</Eyebrow>
        <h2 id="moment-title" className="font-display text-4xl leading-tight text-balance md:text-[3.4rem]">
          Give your skin a moment <span className="accent text-copper">that&apos;s just for you.</span>
        </h2>
        <p className="mt-6 max-w-md text-muted md:text-lg">
          Apply 2–3 drops to clean, slightly damp skin, morning or night. A little goes a long way: one {liquidGold.size} bottle typically lasts {liquidGold.lasts}.
        </p>
        <BuyButton location="mid" className="mt-10 self-start" />
      </div>
    </section>
  );
}

/* DETAILS: tabs instead of an FAQ list. */
export function DetailsSection() {
  const row = (lead: string, ...qs: string[]) => (
    <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
      <p className="font-display text-2xl leading-snug">{lead}</p>
      <div className="space-y-4 leading-relaxed text-muted">
        {qs.map((q) => (
          <p key={q}>{faq(q)}</p>
        ))}
      </div>
    </div>
  );
  return (
    <section id="details" className="paper border-y border-ink/10" aria-labelledby="details-title">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 md:py-28">
        <Eyebrow>Before you buy</Eyebrow>
        <h2 id="details-title" className="font-display text-4xl md:text-5xl">
          The <span className="accent text-copper">details.</span>
        </h2>
        <div className="mt-10">
          <DetailTabs
            tabs={[
              { label: "Ingredients", content: row("Three ingredients, nothing else.", "What exactly is in it?", "Will an oil clog my pores?") },
              { label: "How to use", content: row("2–3 drops, morning or night.", "How do I use it?", "How long does one bottle last?") },
              { label: "Shipping", content: row("Shipped within the US by USPS.", "When will it ship?", "What if it isn't right for me?") },
              { label: "Sensitive skin", content: row("Patch test first.", "Is it okay for sensitive skin?") },
            ]}
          />
        </div>
        {/* TODO: real customer reviews with names and permission. Hidden from the live site until they exist. */}
        <div className="mt-14 rounded-2xl border border-dashed border-copper/50 p-5 text-center text-sm text-muted" data-todo="reviews">
          <span className="font-medium text-copper">TODO: customer reviews.</span> Two or three real reviews, with first name and permission, go here.
        </div>
      </div>
    </section>
  );
}

/* STOCKISTS: where to find the oil in person. */
export function StockistsBand() {
  return (
    <section className="paper border-y border-ink/10" aria-labelledby="stockists-title">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Eyebrow>Find it in person</Eyebrow>
          <h2 id="stockists-title" className="font-display text-3xl md:text-4xl">
            On the shelf in <span className="accent text-copper">Albuquerque.</span>
          </h2>
        </div>
        <ul className="space-y-1 md:text-right">
          {stockists.map((s) => (
            <li key={s.name}>
              <p className="font-display text-2xl">{s.name}</p>
              <p className="text-sm tracking-[0.16em] text-muted uppercase">{s.place}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
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
  );
}
