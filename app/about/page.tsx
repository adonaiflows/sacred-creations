import type { Metadata } from "next";
import Image from "next/image";
import { RitualSection, StockistsBand } from "@/components/sections";
import { BuyButton } from "@/components/ui/BuyButton";
import { Header } from "@/components/ui/Header";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/Section";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { comingSoon, labelStory, people } from "@/lib/site";

export const metadata: Metadata = {
  title: "About | Sacred Creations",
  description: "Sacred Creations is a small, heart-crafted brand from New Mexico. Kaylee Romero makes every bottle of Liquid Gold by hand; Adonai runs the business.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <Reveal />
      <main id="top">
        <section className="wall relative overflow-hidden" aria-labelledby="about-title">
          <div className="mx-auto grid min-h-[90svh] max-w-6xl items-center gap-12 px-4 pt-32 pb-20 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
            <div data-reveal>
              <Eyebrow>About Sacred Creations</Eyebrow>
              <h1 id="about-title" className="font-display text-4xl leading-tight text-balance md:text-[3.4rem]">
                Intentional, natural, <span className="accent text-copper-deep">heart-crafted.</span>
              </h1>
              <p className="mt-6 max-w-lg text-ink-soft md:text-lg">
                Sacred Creations is a small brand from New Mexico. Right now it makes one thing, Liquid Gold, on purpose, so all the focus goes into one oil. {labelStory}
              </p>
            </div>
            <div className="niche relative mx-auto aspect-[4/5] w-full max-w-[400px] overflow-hidden rounded-t-[999px] rounded-b-md">
              {/* TODO: a photo of Kaylee making the oil, from the client. */}
              <Image
                src="/images/bottle-hand.jpg"
                alt="A hand holding a bottle of Liquid Gold"
                fill
                sizes="(min-width: 768px) 400px, 92vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>

        <section className="paper border-y border-ink/10" aria-labelledby="people-title">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-28">
            <Eyebrow>Who we are</Eyebrow>
            <h2 id="people-title" className="font-display text-4xl md:text-5xl">
              Two people, <span className="accent text-copper">one oil.</span>
            </h2>
            <ul className="mt-12 grid gap-6 md:grid-cols-2">
              {people.map((p) => (
                <li key={p.name} className="tag rounded-sm p-7 md:p-9" data-reveal>
                  <p className="text-xs tracking-[0.24em] text-ink-soft uppercase">{p.role}</p>
                  <h3 className="mt-2 font-display text-3xl">{p.name}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.body}</p>
                </li>
              ))}
            </ul>
            {/* TODO: the client's own words about how Sacred Creations began, and photos of the altar and the shop. */}
            <div className="mt-10 rounded-2xl border border-dashed border-copper/50 p-5 text-center text-sm text-muted" data-todo="about-story">
              <span className="font-medium text-copper">TODO: our story.</span> Kaylee&apos;s own words on how it began, plus photos of the altar and the making.
            </div>
          </div>
        </section>

        <RitualSection />

        <section className="wall" aria-labelledby="next-title">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 md:py-28" data-reveal>
            <Eyebrow>What&apos;s next</Eyebrow>
            <h2 id="next-title" className="font-display text-4xl leading-tight md:text-5xl">
              More than <span className="accent text-copper-deep">skincare.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-ink-soft md:text-lg">
              Sacred Creations is growing. {comingSoon.slice(0, -1).join(", ")} and a {comingSoon.at(-1)?.toLowerCase()} are on their way.
            </p>
            <BuyButton location="about" className="mt-10" />
          </div>
        </section>

        <StockistsBand />
      </main>
      <SiteFooter />
    </>
  );
}
