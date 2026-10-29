# Sacred Creations Shopify theme

The Sacred Creations site (the Next.js demo in this repo) rebuilt as a Shopify Online Store 2.0
theme. The look, copy and photos match the demo, and checkout, analytics and editing are Shopify's own.

## Upload it

1. Download `sacred-creations-theme.zip`, or zip the theme folders yourself (see "Build" below).
2. In Shopify admin, go to **Online Store › Themes › Add theme › Upload zip file** and pick the zip.
   It arrives in the theme library unpublished, so the live store doesn't change.
3. Click **Customize** on the new theme to preview every page with the real products.
4. When Kaylee approves it, click **Publish**.

## One-time setup

- **Liquid Gold:** the default product template is the Liquid Gold layout, with the turntable,
  ingredients, ritual and details. It sells whichever product has the handle `liquid-gold`.
  If the handle is different, pick the product under **Customize › Theme settings › Store ›
  Featured product**.
- **About page:** create a page called About (Online Store › Pages) and set its template to
  `about`. The template list shows this theme's templates once it is published.
- **Contact page:** set the existing Contact page's template to `contact`. It uses Shopify's own
  contact form, so messages go to the store's email.
- **New products later (ceramics, jewelry and so on):** set their template to `standard`. That's
  a plain product page with photos, options and add to cart, without the Liquid Gold content.

## What Kaylee can edit in Customize

All the text, the ingredients, the ritual steps, the details tabs, the stockists, the shelf tags
("Coming to the shelf") and every photo. Photos left empty fall back to the photos built into the
theme. The lower shelf can also hold real products once they exist (add a Product block to the
Shop wall section).

Keep the client's wording rules when editing: only castor and jojoba are certified organic (never
"all organic"), never "made to order", and cosmetic claims only.

## Build

The theme is plain Liquid, CSS and JavaScript with no runtime libraries. The CSS is made with
Tailwind from `src/theme.css`:

```sh
npm install            # in the repo root, once
node shopify-theme/build-css.mjs
cd shopify-theme && zip -r ../sacred-creations-theme.zip assets config layout locales sections snippets templates
```

Check it with `shopify theme check --path shopify-theme`.
