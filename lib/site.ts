// Every fact here comes from the client brief (docs/client-brief.md) or the client's own copy on
// sacredcreations.shop (home and product pages, read 2026-10-28). Do not add claims, reviews or
// numbers that are not in those sources. Rules from the client:
// - never say "made to order"; never say "all organic" (castor and jojoba are certified organic,
//   the frankincense is not); keep wording cosmetic (no treat/cure claims).

export const SITE_URL = "https://www.sacredcreations.shop";
export const SHOP_URL = "https://www.sacredcreations.shop/collections/all";

// The site is built to grow past one product (ceramics, jewelry, clothing and a matcha pop-up are
// planned). Each product links to its Shopify page, which is where checkout happens.
export type Product = {
  slug: string;
  name: string;
  kind: string;
  price: string;
  size: string;
  buyUrl: string;
  lasts: string;
};

export const liquidGold: Product = {
  slug: "liquid-gold",
  name: "Liquid Gold",
  kind: "Frankincense face oil",
  price: "$66",
  size: "1 oz",
  buyUrl: "https://www.sacredcreations.shop/products/liquid-gold",
  lasts: "6–8 weeks of daily use",
};

export const products: Product[] = [liquidGold];

// Shelves that are waiting for what's next. Shown as honest "coming" tags, never as products.
export const comingSoon = ["Ceramics", "Jewelry", "Clothing", "Matcha pop-up"];

// Back-compat for components that only know about one product.
export const product = liquidGold;
export const BUY_URL = liquidGold.buyUrl;

export const contact = {
  email: "nmsacredcreations@gmail.com",
  instagram: "https://instagram.com/sacredcreations.shop",
  tiktok: "https://tiktok.com/@sacredcreations.shop",
  contactPage: "https://sacredcreations.shop/pages/contact",
};

export const people = [
  { name: "Kaylee Romero", role: "Maker", body: "Kaylee makes every bottle of Liquid Gold by hand in New Mexico." },
  { name: "Adonai", role: "Business", body: "Adonai runs the business side of Sacred Creations." },
];

// TODO: street address and hours for each stockist (not in the brief).
export const stockists = [{ name: "Daily Rituals / Stickks & Stones", place: "Albuquerque, New Mexico" }];

// From the product page: "For the Skin" and "The Subtle" for each ingredient.
export const ingredients = [
  {
    name: "Cold-Pressed Castor Oil",
    note: "Certified organic",
    nickname: "Nature's botox",
    skin: "Rich in essential fatty acids, it creates a protective moisture barrier that locks in hydration and guards the skin against environmental stressors.",
    subtle: "A deeply grounding anchor that provides a sense of safety and containment, helping you feel “at home” in your skin.",
  },
  {
    name: "Cold-Pressed Jojoba Oil",
    note: "Certified organic",
    nickname: "Mirrors your skin",
    skin: "A superior moisturizing agent that mirrors the skin's natural sebum, allowing it to penetrate deeply to hydrate without clogging pores or leaving a greasy residue.",
    subtle: "Provides a stable, neutral foundation that allows your natural beauty and the intentional prayers of the elixir to shine through.",
  },
  {
    name: "Raw Frankincense Resin & Essential Oil",
    note: "Raw resin, steeped by hand",
    nickname: "The King of Oils",
    skin: "A powerful natural astringent that refines skin texture, tones the skin, and promotes a radiant, even-looking complexion.",
    subtle: "Known as the “King of Oils,” it acts as a bridge to the divine, clearing stagnant energy and anchoring the soul in presence.",
  },
];

// Copy printed on the back of the label.
export const labelStory =
  "Liquid Gold is not about excess. It is about refinement. About nourishment over noise.";
export const affirmation =
  "I anoint this temple with ancient light. With every drop, I release the old and reveal my true radiance. I am grounded. I am pure. I am golden.";

// The Sacred Creation Ritual, from the home page of the current store.
export const ritual = [
  {
    step: "01",
    phase: "Opening",
    title: "Cleansed",
    body: "Every single bottle is taken through a 3-part smoke process. First it is cleansed with white sage, followed by a blessing with palo santo and/or copal, and finished with the nourishment of sweet grass.",
  },
  {
    step: "02",
    phase: "Creation",
    title: "Hand-crafted",
    body: "Every ingredient is cared for one-by-one by loving hands. Intentionally alchemized into being: honored, revered, prayed upon.",
  },
  {
    step: "03",
    phase: "Refinement",
    title: "Charged",
    body: "The finished oil rests on our altar for a minimum of 21 days, continually prayed upon with love: amethyst for protection, rose quartz for self-love, citrine for abundance and tiger's eye for confidence.",
  },
];
// Older name kept so existing sections compile.
export const standard = ritual;

export const faqs = [
  {
    q: "How do I use it?",
    a: "Apply 2–3 drops to clean, slightly damp skin (face, hands or body), morning or night.",
  },
  {
    q: "How long does one bottle last?",
    a: "A little goes a long way: one 1 oz bottle typically lasts 6–8 weeks with daily use.",
  },
  {
    q: "When will it ship?",
    a: "Orders ship within 2–3 business days via USPS, and usually arrive 3–5 business days later. We currently ship within the United States only.",
  },
  {
    q: "What if it isn't right for me?",
    a: "Unopened bottles can be returned within 30 days for a full refund, and anything that arrives damaged or defective is replaced at no cost.",
  },
  {
    q: "Will an oil clog my pores?",
    a: "Jojoba mirrors the skin's natural sebum, so it sinks in without clogging pores or leaving a greasy feel. Liquid Gold is non-comedogenic.",
  },
  {
    q: "Is it okay for sensitive skin?",
    a: "As with any new skincare product, do a small patch test 24 hours before full use, and stop using it if irritation occurs. Liquid Gold is a cosmetic and has not been evaluated by the FDA.",
  },
  {
    q: "What exactly is in it?",
    a: "Ricinus Communis (Castor) Seed Oil (certified organic), Simmondsia Chinensis (Jojoba) Seed Oil (certified organic), Boswellia Carterii Resin Extract, and Frankincense Oil (Boswellia carterii, sacra, papyrifera, frereana). Nothing else.",
  },
];

// Structured data for search engines. Frankincense is not certified organic, so it is not called organic.
export const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: liquidGold.name,
  description:
    "Hand-crafted face oil: cold-pressed castor and jojoba oils (certified organic), raw frankincense resin and frankincense essential oil. Non-comedogenic. 1 fl oz.",
  brand: { "@type": "Brand", name: "Sacred Creations" },
  offers: { "@type": "Offer", price: "66.00", priceCurrency: "USD", availability: "https://schema.org/InStock", url: liquidGold.buyUrl },
};
