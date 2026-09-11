/** The `data-action` set on the widget in ContactForm. */
export const TURNSTILE_ACTION = "contact";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface SiteverifyResult {
  success?: boolean;
  action?: string;
  hostname?: string;
  "error-codes"?: string[];
}

export function parseHostnames(raw: string | undefined): Set<string> {
  return new Set(
    (raw ?? "")
      .split(",")
      .map((h) => h.trim())
      .filter(Boolean),
  );
}

/**
 * Canonical siteverify: a token is only accepted when Cloudflare reports
 * success, the action matches the surface that issued it, and the hostname is
 * one this deployment expects. Anything else — including a network error or a
 * non-2xx — fails closed.
 */
export async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null,
  fetchImpl: typeof fetch = fetch,
  options: { expectedAction?: string; expectedHostnames?: Set<string> } = {},
): Promise<boolean> {
  const expectedAction = options.expectedAction ?? TURNSTILE_ACTION;
  const expectedHostnames = options.expectedHostnames ?? new Set<string>();

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  let result: SiteverifyResult;
  try {
    const res = await fetchImpl(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!res.ok) return false;
    result = (await res.json()) as SiteverifyResult;
  } catch {
    return false;
  }

  return (
    result.success === true &&
    result.action === expectedAction &&
    typeof result.hostname === "string" &&
    expectedHostnames.has(result.hostname)
  );
}
