# Sacred Creations: Liquid Gold landing page

Single-page Next.js site whose Buy buttons go to the Shopify product page
(`lib/site.ts` → `BUY_URL`). Analytics are left to Shopify; Vercel is only used for review previews.
All 3D code is in `components/three/` and every asset is in `public/`, so the page can be ported to a Shopify theme later.

```
npm install
npm run dev     # http://localhost:3000
npm run build
```

- 3D: procedural bottle in `components/three/` (no GLB yet). Desktop gets the live scene after idle;
  phones, low-power devices and reduced-motion get `public/posters/hero-bottle.png`, a render of the same scene.
- All copy comes from `docs/client-brief.md`. Open TODOs: `grep -rn TODO app components lib`.
