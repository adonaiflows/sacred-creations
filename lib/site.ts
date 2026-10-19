// Every fact here comes from docs/client-brief.md (read from sacredcreations.shop on 2026-10-19).
// Do not add claims, reviews or numbers that are not in the brief.

// TODO: once the store's sold-out status is fixed, consider a cart permalink
// (https://www.sacredcreations.shop/cart/<variant-id>:1) to skip the product page.
export const BUY_URL = "https://www.sacredcreations.shop/products/liquid-gold";
export const SITE_URL = "https://www.sacredcreations.shop";

export const product = {
  name: "Liquid Gold",
  tagline: "A frankincense face oil",
  price: "$66",
  size: "1 oz",
  lasts: "6–8 weeks of daily use",
};

export const contact = {
  email: "nmsacredcreations@gmail.com",
  instagram: "https://instagram.com/sacredcreations.shop",
  tiktok: "https://tiktok.com/@sacredcreations.shop",
};

// Ingredient names as printed on the label (docs/assets/liquid-gold-label.pdf).
export const ingredients = [
  {
    name: "Cold-Pressed Castor Oil",
    note: "Organic",
    body: "Rich and cushioning. It helps lock in moisture so skin stays soft through the day.",
  },
  {
    name: "Cold-Pressed Jojoba Oil",
    note: "Organic",
    body: "Light and quick to sink in, so skin feels nourished rather than greasy.",
  },
  {
    name: "Raw Frankincense Resin",
    note: "Organic",
    body: "Steeped into the oil by hand. It gives Liquid Gold its warm, grounding, resinous scent.",
  },
  {
    name: "Frankincense Essential Oil",
    note: "Four varieties",
    body: "Boswellia carterii, sacra, papyrifera and frereana, for skin that looks smoother and more even.",
  },
];

// Copy printed on the back of the label.
export const labelStory =
  "Liquid Gold is not about excess. It is about refinement. About nourishment over noise.";
export const affirmation =
  "I anoint this temple with ancient light. With every drop, I release the old and reveal my true radiance. I am grounded. I am pure. I am golden.";

export const standard = [
  {
    step: "01",
    title: "Cleansed",
    body: "Every batch begins with a three-part smoke cleanse of white sage, palo santo or copal, and sweet grass, alongside sound frequencies.",
  },
  {
    step: "02",
    title: "Hand-crafted",
    body: "Each ingredient is prepared by hand, in small batches, with prayer and intention. Bottles are made to order.",
  },
  {
    step: "03",
    title: "Charged",
    body: "Finished oil rests on an altar for at least 21 days with amethyst, rose quartz, citrine, tiger's eye and sacred geometry.",
  },
];

export const faqs = [
  {
    q: "How do I use it?",
    a: "Warm 2–3 drops between your palms and press into clean, slightly damp skin on the face, hands or body, morning or night.",
  },
  {
    q: "How long does one bottle last?",
    a: "One 1 oz bottle typically lasts 6–8 weeks with daily use.",
  },
  {
    q: "When will it ship?",
    a: "Each bottle is made to order. Orders ship within the US by USPS after 2–3 business days of processing, and usually arrive 3–5 business days later. Shipping is calculated at checkout.",
  },
  {
    q: "What if it isn't right for me?",
    a: "Unopened bottles can be returned within 30 days for a full refund. If your bottle arrives damaged or defective, it's replaced free.",
  },
  {
    q: "Is it okay for sensitive skin?",
    a: "Liquid Gold is all-natural, but everyone's skin is different. Patch test on a small area first. It is a cosmetic and has not been evaluated by the FDA.",
  },
  {
    q: "What exactly is in it?",
    a: "Ricinus Communis (Castor) Seed Oil (organic), Simmondsia Chinensis (Jojoba) Seed Oil (organic), Boswellia Carterii Resin Extract, and Frankincense Oil (Boswellia carterii, sacra, papyrifera, frereana; organic). Nothing else.",
  },
];
