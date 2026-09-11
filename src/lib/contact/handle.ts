import { sendContactEmail } from "./email";
import { contactSchema } from "./schema";
import { TURNSTILE_ACTION, parseHostnames, verifyTurnstile } from "./turnstile";

export interface ContactEnv {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET: string;
  CONTACT_TO: string;
  /** Comma-separated hostnames siteverify may report. Production must not
   *  include localhost. */
  TURNSTILE_HOSTNAMES?: string;
}

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });

export async function handleContact(
  request: Request,
  env: ContactEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  if (request.method !== "POST")
    return json(405, { ok: false, error: "Method not allowed" });

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return json(400, { ok: false, error: "Invalid JSON" });
  }
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success)
    return json(400, {
      ok: false,
      error: "Please check the highlighted fields.",
      issues: parsed.error.flatten().fieldErrors,
    });

  const ip = request.headers.get("cf-connecting-ip");
  const human = await verifyTurnstile(
    parsed.data.turnstileToken,
    env.TURNSTILE_SECRET,
    ip,
    fetchImpl,
    {
      expectedAction: TURNSTILE_ACTION,
      expectedHostnames: parseHostnames(env.TURNSTILE_HOSTNAMES),
    },
  );
  if (!human)
    return json(403, {
      ok: false,
      error: "Spam check failed. Please try again.",
    });

  const sent = await sendContactEmail(
    parsed.data,
    { apiKey: env.RESEND_API_KEY, to: env.CONTACT_TO },
    fetchImpl,
  );
  if (!sent)
    return json(502, {
      ok: false,
      error: "Could not send right now. Email me directly instead.",
    });

  return json(200, { ok: true });
}
