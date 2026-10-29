// Builds assets/theme.css from src/theme.css with Tailwind, using the Next.js app's installed copy.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(new URL("../package.json", import.meta.url));
const postcss = require("postcss");
const tailwind = require("@tailwindcss/postcss");

const from = new URL("./src/theme.css", import.meta.url).pathname;
const to = new URL("./assets/theme.css", import.meta.url).pathname;
const out = await postcss([tailwind({ optimize: { minify: true } })]).process(readFileSync(from, "utf8"), { from, to });
writeFileSync(to, out.css);
console.log(`assets/theme.css: ${(out.css.length / 1024).toFixed(1)} KB`);
