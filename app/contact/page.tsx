import type { Metadata } from "next";
import { Header } from "@/components/ui/Header";
import { Eyebrow } from "@/components/ui/Section";
import { SiteFooter } from "@/components/ui/SiteFooter";
import { contact, stockists } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Sacred Creations",
  description: "Say hello to Sacred Creations by email, Instagram or TikTok, or find Liquid Gold in person in Albuquerque.",
  alternates: { canonical: "/contact" },
};

const link = "underline decoration-copper/50 underline-offset-4 hover:text-copper-deep";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="top" className="wall min-h-svh">
        <div className="mx-auto max-w-5xl px-4 pt-32 pb-24 sm:px-6">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="font-display text-4xl leading-tight md:text-[3.4rem]">
            Say <span className="accent text-copper-deep">hello.</span>
          </h1>
          <p className="mt-5 max-w-lg text-ink-soft md:text-lg">Questions about Liquid Gold, an order, or carrying it in your shop? Reach out any way you like.</p>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <section className="tag rounded-sm p-7" aria-labelledby="c-write">
              <h2 id="c-write" className="text-xs tracking-[0.24em] text-ink-soft uppercase">Write to us</h2>
              <p className="mt-3 font-display text-xl break-all">
                <a className={link} href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
              <p className="mt-3 text-sm text-ink-soft">
                Or use the <a className={link} href={contact.contactPage}>contact form on our store</a>.
              </p>
            </section>
            <section className="tag rounded-sm p-7" aria-labelledby="c-follow">
              <h2 id="c-follow" className="text-xs tracking-[0.24em] text-ink-soft uppercase">Follow along</h2>
              <ul className="mt-3 space-y-2 font-display text-xl">
                <li><a className={link} href={contact.instagram}>Instagram</a></li>
                <li><a className={link} href={contact.tiktok}>TikTok</a></li>
              </ul>
            </section>
            <section className="tag rounded-sm p-7" aria-labelledby="c-visit">
              <h2 id="c-visit" className="text-xs tracking-[0.24em] text-ink-soft uppercase">Find it in person</h2>
              <ul className="mt-3 space-y-3">
                {stockists.map((s) => (
                  <li key={s.name}>
                    <p className="font-display text-xl">{s.name}</p>
                    <p className="text-sm text-ink-soft">{s.place}</p>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="paper mt-6 rounded-[28px] p-7 ring-1 ring-ink/10 md:p-10" aria-labelledby="c-wholesale">
            <h2 id="c-wholesale" className="font-display text-3xl">Wholesale</h2>
            <p className="mt-3 max-w-xl text-ink-soft">
              Would you like Liquid Gold on your shelves? Email us with your shop&apos;s name and where you are.
            </p>
            <a className="mt-6 inline-flex min-h-12 items-center rounded-full bg-copper px-7 py-3.5 text-[15px] font-medium tracking-[0.08em] text-parchment uppercase hover:bg-copper-deep" href={`mailto:${contact.email}?subject=Wholesale%20enquiry`}>
              Email about wholesale
            </a>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
