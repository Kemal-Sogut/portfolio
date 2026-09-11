// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  // Custom domain, live and serving this Worker. The workers.dev hostname
  // still resolves; canonical URLs point here so that is what gets indexed.
  site: "https://kemalsogut.com",
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [mdx(), sitemap(), react()],
  vite: { plugins: [tailwindcss()] },
});
