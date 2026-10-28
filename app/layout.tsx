import type { Metadata, Viewport } from "next";
import { Jost, Marcellus } from "next/font/google";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Marcellus echoes the flared "LIQUID GOLD" caps on the label; Jost echoes the logo wordmark.
const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Liquid Gold Frankincense Face Oil | Sacred Creations",
  description:
    "Liquid Gold is a handmade face oil of certified organic castor and jojoba with raw frankincense resin. Non-comedogenic and hand-crafted in New Mexico. $66 for 1 oz.",
  openGraph: {
    title: "Liquid Gold Frankincense Face Oil | Sacred Creations",
    description:
      "Frankincense with certified organic jojoba and castor, hand-crafted in small batches with intention. $66 for 1 oz.",
    url: "/",
    siteName: "Sacred Creations",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "A frosted bottle of Liquid Gold face oil with a bamboo dropper on a weathered fence post" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f7f0e0",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${marcellus.variable} ${jost.variable}`}>
      <body className="font-sans">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
