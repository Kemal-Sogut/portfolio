import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.mdx" }),
  schema: z.object({
    title: z.string(),
    client: z.string(),
    summary: z.string().max(200),
    year: z.number().int(),
    status: z.enum(["live", "in-progress", "delivered"]),
    featured: z.boolean().default(false),
    order: z.number().int().default(100),
    services: z.array(z.string()),
    stack: z.array(z.string()),
    liveUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    cover: z.string().optional(), // path under /public, e.g. /work/blindsnisa.png
    metrics: z
      .array(
        z.object({
          value: z.number(),
          suffix: z.string().default(""),
          label: z.string(),
        }),
      )
      .default([]),
  }),
});

const services = defineCollection({
  loader: glob({ base: "./src/content/services", pattern: "*.json" }),
  schema: z.object({
    order: z.number().int(),
    title: z.string(),
    icon: z.enum([
      "Ruler",
      "LayoutDashboard",
      "Users",
      "Receipt",
      "Workflow",
      "Globe",
    ]),
    tagline: z.string(),
    forWho: z.string(),
    youGet: z.array(z.string()).min(3).max(5),
    example: z.object({ slug: z.string(), text: z.string() }),
    range: z.string(),
  }),
});

const faq = defineCollection({
  loader: glob({ base: "./src/content/faq", pattern: "*.json" }),
  schema: z.object({
    order: z.number().int(),
    question: z.string(),
    answer: z.string(),
    showOnHome: z.boolean().default(true),
  }),
});

const pricing = defineCollection({
  loader: file("./src/content/pricing/tiers.json"),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    price: z.string(),
    period: z.string().optional(),
    blurb: z.string(),
    features: z.array(z.string()),
    cta: z.string(),
    highlighted: z.boolean().default(false),
    timeline: z.string().optional(),
  }),
});

export const collections = { work, services, faq, pricing };
