import type { APIRoute } from "astro";

import { handleContact, type ContactEnv } from "@/lib/contact/handle";

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  // Astro 5 + @astrojs/cloudflare 12 exposes bindings on locals.runtime.env
  const env = (locals as { runtime: { env: ContactEnv } }).runtime.env;
  return handleContact(request, env);
};

export const ALL: APIRoute = async () =>
  new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
    status: 405,
    headers: { "content-type": "application/json" },
  });
