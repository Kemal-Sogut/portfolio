import { describe, expect, it, vi } from "vitest";

import { verifyTurnstile } from "../../src/lib/contact/turnstile";

const fetchOk = (body: unknown) =>
  vi.fn(
    async () => new Response(JSON.stringify(body), { status: 200 }),
  ) as unknown as typeof fetch;

describe("verifyTurnstile", () => {
  it("posts token, secret and ip to siteverify and returns true on success", async () => {
    const f = fetchOk({ success: true });
    const ok = await verifyTurnstile("tok", "secret", "1.2.3.4", f);
    expect(ok).toBe(true);
    const [url, init] = (f as any).mock.calls[0];
    expect(url).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    const sent = init.body as FormData;
    expect(sent.get("response")).toBe("tok");
    expect(sent.get("secret")).toBe("secret");
    expect(sent.get("remoteip")).toBe("1.2.3.4");
  });
  it("returns false when Cloudflare says no or the call fails", async () => {
    expect(
      await verifyTurnstile("tok", "s", null, fetchOk({ success: false })),
    ).toBe(false);
    const boom = vi.fn(async () => {
      throw new Error("net");
    }) as unknown as typeof fetch;
    expect(await verifyTurnstile("tok", "s", null, boom)).toBe(false);
  });
});
