# Client Brief: Sacred Creations

Your answers are kept as you gave them. Everything marked **(site)** was read from the public store on 2026-10-19, with the page it came from. `TODO:` marks anything not on the site that the client has to answer. Nothing here is invented.

## ⚠️ Fix on the live store first
- **The only product shows as sold out.** The Liquid Gold product page says "Variant sold out or unavailable" / "Sold out", while the catalog page says "In stock (1)". Any traffic we send right now can't buy. Check inventory tracking on the 1 oz variant in Shopify admin. (site: /products/liquid-gold, /collections/all)
- **Product is tagged "Sample Product"** and its weight is **0.0 lb**, so calculated USPS shipping may be wrong. (site: /products/liquid-gold.json)
- **Product description contains leftover citation markup** (stray citation spans, empty superscripts, a stray meta charset tag), likely pasted from an AI tool. Clean it up in admin. (site: /products/liquid-gold.json)
- **Product images have no alt text.** (site: /products/liquid-gold.json)

## The business
- Business name: Sacred Creations
- What they sell / offer: 1 product, Liquid Gold - Frankincense oil with organic castor and jojoba oil
  - (site) Positioned as "Liquid Gold: A Vibrational Moisturizing Elixir", handcrafted in small batches, "made to order". Homepage headline: "Intentional, Natural, Heart-crafted".
  - (site) Size: one variant, **1 oz**. One bottle "typically lasts 6-8 weeks with daily use".
  - (site) INCI: Ricinus Communis (Castor) Seed Oil (organic); Simmondsia Chinensis (Jojoba) Seed Oil (organic); Boswellia Carterii Resin Extract; Frankincense Oil (Boswellia carterii, sacra, papyrifera, frereana; organic).
  - (site) Directions: "Apply 2-3 drops to clean, slightly damp skin - face, hands, or body - morning or night."
  - (site) "Sacred Creations Standard" ritual, 3 steps: **Cleansed** (three-part smoke cleanse with white sage, palo santo and/or copal, sweet grass, plus sound frequencies), **Hand-crafted** (each ingredient prepared by hand with prayer and intention), **Charged** (rests on an altar at least 21 days with amethyst, rose quartz, citrine, tiger's eye and sacred geometry).
- Price range: 66
  - (site) $66.00 USD for 1 oz, no compare-at/sale price.
- Location / service area: Online
  - (site) Based in **Albuquerque, NM** (refund policy). Ships **US only** via **USPS**, 2-3 business days processing, delivery typically 3-5 more business days, shipping calculated at checkout, no free-shipping threshold stated. (/policies/shipping-policy, product FAQ)
- Website now (if any): [www.sacredcreations.shop](https://www.sacredcreations.shop)
  - (site) Shopify store. Nav: Home, Catalog, Contact. No About page. Newsletter signup in footer. Payments: Amex, Apple Pay, Diners Club, Discover, Google Pay, Mastercard, PayPal, Shop Pay, Visa.
  - (site) Contact: nmsacredcreations@gmail.com, "I personally respond within 24 hours". No phone or street address listed. (/pages/contact)
  - (site) Social: [Instagram @sacredcreations.shop](https://instagram.com/sacredcreations.shop), [TikTok @sacredcreations.shop](https://tiktok.com/@sacredcreations.shop)

## The customer
- Who is the ideal customer? Anyone looking for face hydration
- What problem are they trying to solve? dry skin, acne, blemishes, uneven skin tones
- What makes them hesitate or say no? Not sure
  - Inferred from the site, not confirmed by the client: no reviews or ratings anywhere on the store; $66 for 1 oz with no sample size; "is it safe for sensitive skin?" is already an FAQ; opened bottles can't be returned. `TODO:` confirm with client (DMs/emails asking these questions are the best source).

## The goal
- THE one action a visitor should take: buy
- Where leads should go: shopify
- How success is measured: 50 sales/week
- (site) Existing objection handling on the product page: 30-day full refund if unopened; free replacement if damaged or defective.

## Brand
- Logo files: (site) SVG logo on the store: `https://sacredcreations.shop/cdn/shop/files/SCLogoW1.svg` (white version, used as the share image). `TODO:` get the full logo set (dark version, icon) from the client.
- Colors (hex): `TODO:` not readable from the public page; pull from Shopify admin > Theme settings > Colors, or from the client.
- Fonts: `TODO:` same, Shopify admin > Theme settings > Typography, or the client.
- Vibe in 3 words: hydrating, clean luxury, intentional
  - (site) Supporting language the store already uses: "Intentional, Natural, Heart-crafted", "vibrational elixir", ritual, slowing down, prayer, altar.
- 2-3 sites they love: `TODO:` client
- Anything they hate: `TODO:` client

## Proof
- Testimonials / reviews: **(site) none.** No reviews or star ratings on the store and no review app installed; nothing found in a web search either. `TODO:` collect real reviews with names and permission (Instagram/TikTok comments, DMs, repeat buyers). A review app (e.g. Judge.me) would let the new site show them. This is the biggest gap given the "social proof in first two sections" rule.
- Client logos, press, awards, numbers: (site) none. Note the "Sacred Creations Standard" is a process description, not a certification. `TODO:` client (sales count, customers, press, markets/events).

## Assets
- Photos / video: (site) 3 product photos on Shopify CDN: [DSC02371](https://cdn.shopify.com/s/files/1/0794/6161/3814/files/DSC02371_JPG.jpg?v=1777945577) (3376×4727), [DSC02371 alt](https://cdn.shopify.com/s/files/1/0794/6161/3814/files/DSC02371_JPG_d7adbc07-941a-46f3-9a81-5331003c9ce9.jpg?v=1777945788) (1629×2280), [DSC02361](https://cdn.shopify.com/s/files/1/0794/6161/3814/files/DSC02361_48ce8682-f8ce-4e9c-98fd-fb0c7e1b81d4.jpg?v=1777945634) (6000×3376). `TODO:` originals, ritual/altar/process photos, any video, and the Instagram/TikTok content we're allowed to reuse.
- 3D models or product CAD files: `TODO:` client. Likely none; the bottle can be modeled from photos plus exact dimensions, bottle/dropper type and label artwork.
- Copy they've written: (site) Product description (intro, per-ingredient "For the Skin" and "The Subtle" sections, Sacred Creations Standard, brand narrative, INCI, 5-question FAQ, FDA disclaimer) and the homepage ritual section. Reusable once cleaned.
  - Compliance note: the site states "cosmetic in nature and has not been evaluated by the FDA". Acne/blemish claims in your answers above can tip a cosmetic into drug territory under FDA rules, so new hero copy should stay with cosmetic language (hydrates, softens, looks more even). Worth checking with the client.

## Pages needed
- [ ] Home  [ ] About  [ ] Services/Products  [ ] Contact  [ ] Other:
- `TODO:` client to confirm. The store today has Home, Catalog, Product, Contact and policies, and no About page; with one product, a single long-scroll product page plus About/Ritual and Contact is the likely fit.

## Logistics
- Deadline: `TODO:` client
- Domain + hosting access: (site) domain sacredcreations.shop, currently on Shopify. `TODO:` decide whether the new site replaces the Shopify theme (headless with Shopify checkout) or sits beside it; needs domain registrar + Shopify access.
- Who approves the design: `TODO:` client
