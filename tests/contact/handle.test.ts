import { describe, expect, it, vi } from "vitest";

import { handleContact } from "../../src/lib/contact/handle";
import { TURNSTILE_ACTION } from "../../src/lib/contact/turnstile";

const env = {
  RESEND_API_KEY: "re_x",
  TURNSTILE_SECRET: "s",
  CONTACT_TO: "me@example.com",
  TURNSTILE_HOSTNAMES: "x",
};
const body = {
  name: "Sam",
  email: "sam@example.com",
  projectType: "portal",
  budget: "unknown",
  message: "We want customers to see their order status online.",
  turnstileToken: "tok",
};
const req = (b: unknown, init: RequestInit = {}) =>
  new Request("https://x/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cf-connecting-ip": "9.9.9.9",
    },
    body: JSON.stringify(b),
    ...init,
  });

// fetch mock that answers Turnstile then Resend. The request URL is
// https://x/api/contact, so "x" is the hostname siteverify reports back.
const fetchSeq = (turnstile: boolean, resendStatus = 200) =>
  vi.fn(async (url: string) =>
    url.includes("turnstile")
      ? new Response(
          JSON.stringify({
            success: turnstile,
            action: TURNSTILE_ACTION,
            hostname: "x",
          }),
        )
      : new Response("{}", { status: resendStatus }),
  ) as unknown as typeof fetch;

describe("handleContact", () => {
  it("200 ok on a good submission", async () => {
    const res = await handleContact(req(body), env, fetchSeq(true));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
  it("400 on invalid JSON or schema failure", async () => {
    expect(
      (await handleContact(req({ ...body, email: "x" }), env, fetchSeq(true)))
        .status,
    ).toBe(400);
    const bad = new Request("https://x/api/contact", {
      method: "POST",
      body: "{not json",
    });
    expect((await handleContact(bad, env, fetchSeq(true))).status).toBe(400);
  });
  it("403 when Turnstile fails and 502 when Resend fails", async () => {
    expect((await handleContact(req(body), env, fetchSeq(false))).status).toBe(
      403,
    );
    expect(
      (await handleContact(req(body), env, fetchSeq(true, 500))).status,
    ).toBe(502);
  });
  it("403 when the deployment has no hostname allowlist", async () => {
    const res = await handleContact(
      req(body),
      { ...env, TURNSTILE_HOSTNAMES: "" },
      fetchSeq(true),
    );
    expect(res.status).toBe(403);
  });
  it("405 for non-POST", async () => {
    const res = await handleContact(
      new Request("https://x/api/contact"),
      env,
      fetchSeq(true),
    );
    expect(res.status).toBe(405);
  });
});
