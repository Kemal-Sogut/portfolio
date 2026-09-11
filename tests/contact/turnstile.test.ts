import { describe, expect, it, vi } from "vitest";

import {
  TURNSTILE_ACTION,
  parseHostnames,
  verifyTurnstile,
} from "../../src/lib/contact/turnstile";

const hosts = parseHostnames("example.com,localhost");

const reply = (body: unknown, status = 200) =>
  vi.fn(
    async () => new Response(JSON.stringify(body), { status }),
  ) as unknown as typeof fetch;

const good = {
  success: true,
  action: TURNSTILE_ACTION,
  hostname: "example.com",
};

const verify = (f: typeof fetch, token = "tok", ip: string | null = null) =>
  verifyTurnstile(token, "secret", ip, f, {
    expectedAction: TURNSTILE_ACTION,
    expectedHostnames: hosts,
  });

describe("parseHostnames", () => {
  it("splits, trims and drops blanks", () => {
    expect([...parseHostnames(" a.com , b.com ,, ")]).toEqual([
      "a.com",
      "b.com",
    ]);
    expect(parseHostnames(undefined).size).toBe(0);
  });
});

describe("verifyTurnstile", () => {
  it("posts token, secret and ip to siteverify and accepts a good result", async () => {
    const f = reply(good);
    expect(await verify(f, "tok", "1.2.3.4")).toBe(true);
    const [url, init] = (f as any).mock.calls[0];
    expect(url).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    const sent = init.body as URLSearchParams;
    expect(sent.get("response")).toBe("tok");
    expect(sent.get("secret")).toBe("secret");
    expect(sent.get("remoteip")).toBe("1.2.3.4");
  });

  it("rejects when Cloudflare says no", async () => {
    expect(await verify(reply({ success: false }))).toBe(false);
  });

  it("rejects a token issued for a different action", async () => {
    expect(await verify(reply({ ...good, action: "signup" }))).toBe(false);
  });

  it("rejects a token issued on a hostname we do not expect", async () => {
    expect(await verify(reply({ ...good, hostname: "evil.example.net" }))).toBe(
      false,
    );
  });

  it("rejects when no hostname allowlist is configured", async () => {
    const f = reply(good);
    expect(
      await verifyTurnstile("tok", "s", null, f, {
        expectedAction: TURNSTILE_ACTION,
        expectedHostnames: new Set(),
      }),
    ).toBe(false);
    expect((f as any).mock.calls.length).toBe(0);
  });

  it("rejects an empty or oversized token without calling siteverify", async () => {
    const f = reply(good);
    expect(await verify(f, "")).toBe(false);
    expect(await verify(f, "x".repeat(2049))).toBe(false);
    expect((f as any).mock.calls.length).toBe(0);
  });

  it("fails closed on a non-2xx and on a network error", async () => {
    expect(await verify(reply(good, 500))).toBe(false);
    const boom = vi.fn(async () => {
      throw new Error("net");
    }) as unknown as typeof fetch;
    expect(await verify(boom)).toBe(false);
  });
});
