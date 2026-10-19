# Sacred Creations: Liquid Gold landing page

Single-page Next.js site whose Buy buttons go to the Shopify product page
(`lib/site.ts` → `BUY_URL`). Analytics are left to Shopify; Vercel is only used for review previews.
All 3D code is in `components/three/` and every asset is in `public/`, so the page can be ported to a Shopify theme later.

```
npm install
npm run dev     # http://localhost:3000
npm run build
```

- The page shows the real product photos. `components/three/` holds a procedural 3D bottle that is not on the page
  right now; it is kept to reuse once a scanned GLB of the real bottle exists (see TODO in `app/page.tsx`).
- All copy comes from `docs/client-brief.md` and the label (`docs/assets`). Open TODOs: `grep -rn TODO app components lib`.
