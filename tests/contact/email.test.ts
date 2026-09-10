import { describe, expect, it, vi } from "vitest";

import {
  buildContactEmail,
  sendContactEmail,
} from "../../src/lib/contact/email";

const input = {
  name: "<b>Eve</b>",
  email: "eve@example.com",
  company: "Eve & Co",
  projectType: "website",
  budget: "under-2500",
  message: "Line one\nLine two <script>x</script>",
  turnstileToken: "t",
} as const;

describe("buildContactEmail", () => {
  it("escapes HTML and keeps line breaks", () => {
    const { subject, html, text } = buildContactEmail(input);
    expect(subject).toBe("New enquiry from Eve (Eve & Co)");
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("Line one<br>Line two");
    expect(text).toContain("Line one\nLine two");
  });
});

describe("sendContactEmail", () => {
  it("calls Resend with reply_to set to the sender", async () => {
    const f = vi.fn(
      async () => new Response("{}", { status: 200 }),
    ) as unknown as typeof fetch;
    const ok = await sendContactEmail(
      input,
      { apiKey: "re_x", to: "me@example.com" },
      f,
    );
    expect(ok).toBe(true);
    const [url, init] = (f as any).mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(init.headers.Authorization).toBe("Bearer re_x");
    const payload = JSON.parse(init.body);
    expect(payload.reply_to).toBe("eve@example.com");
    expect(payload.to).toEqual(["me@example.com"]);
    expect(payload.from).toBe("Portfolio <onboarding@resend.dev>");
  });
  it("returns false on a non-2xx", async () => {
    const f = vi.fn(
      async () => new Response("nope", { status: 422 }),
    ) as unknown as typeof fetch;
    expect(
      await sendContactEmail(
        input,
        { apiKey: "re_x", to: "me@example.com" },
        f,
      ),
    ).toBe(false);
  });
});
