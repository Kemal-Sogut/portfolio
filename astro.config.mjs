// @ts-check
import cloudflare from "@astrojs/cloudflare";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

export default defineConfig({
  // TODO: confirm the workers.dev subdomain of the kemalsogut7c Cloudflare
  // account on first deploy, then replace with the custom domain (spec §10).
  site: "https://portfolio.kemalsogut.workers.dev",
  output: "static",
  adapter: cloudflare({ imageService: "compile" }),
  integrations: [mdx(), sitemap(), react()],
  vite: { plugins: [tailwindcss()] },
});
