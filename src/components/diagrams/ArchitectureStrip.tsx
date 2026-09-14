"use client";

import { Flow, type FlowNode } from "@/components/diagrams/Flow";
import type { NodeIconName } from "@/components/diagrams/nodeIcons";

/**
 * Buckets are tried in order and each stack entry lands in the first one it
 * matches, so a shape like "Supabase Postgres + Auth" is data rather than
 * server. A bucket with nothing in it is left out of the diagram.
 */
const BUCKETS: { icon: NodeIconName; label: string; test: RegExp }[] = [
  {
    icon: "browser",
    label: "Browser",
    test: /react|next|vite|astro|tailwind|shadcn|typescript|wordpress|svelte|vue/i,
  },
  {
    icon: "server",
    label: "Server",
    test: /hono|worker|node|express|rails|trpc|docker|turborepo|django|laravel/i,
  },
  {
    icon: "database",
    label: "Data",
    test: /postgres|mongo|prisma|supabase|sqlite|\bd1\b|redis|\bsql\b/i,
  },
  {
    icon: "mail",
    label: "Delivery",
    test: /resend|pdf|stripe|email|sendgrid|twilio|s3|\br2\b/i,
  },
];

/** "Hono on Cloudflare Workers" reads as "Hono" in a node this narrow. */
const shorten = (entry: string) => entry.split(/[\s+/(]/)[0].replace(/,$/, "");

export function stackToArchitecture(stack: string[]): FlowNode[] {
  const claimed = new Set<string>();

  return BUCKETS.flatMap(({ icon, label, test }) => {
    const matched = stack.filter(
      (entry) => !claimed.has(entry) && test.test(entry),
    );
    matched.forEach((entry) => claimed.add(entry));
    if (matched.length === 0) return [];

    const lines = [label, shorten(matched[0])];
    if (matched.length > 1) lines.push(`+${matched.length - 1} more`);

    return [{ icon, lines }];
  });
}

/**
 * The shape of a project, derived from the stack it already lists. Schematic
 * on purpose: the full stack is spelled out beside it.
 */
export function ArchitectureStrip({
  stack,
  title,
}: {
  stack: string[];
  title: string;
}) {
  const nodes = stackToArchitecture(stack);
  if (nodes.length < 2) return null;
  return <Flow nodes={nodes} title={title} />;
}
