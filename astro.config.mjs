// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  // Confirmed against the first deploy. Replace with the custom domain once
  // one is purchased (spec §10).
  site: "https://portfolio.kemalsogut7c.workers.dev",
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [mdx(), sitemap(), react()],
  vite: { plugins: [tailwindcss()] },
});
