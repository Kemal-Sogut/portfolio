import { describe, expect, it } from "vitest";

import { contactSchema } from "../../src/lib/contact/schema";

const valid = {
  name: "Ayşe Demir",
  email: "ayse@example.com",
  company: "Demir Flooring",
  projectType: "quoting",
  budget: "7500-20000",
  message: "We quote flooring on-site and want to send PDFs from the van.",
  turnstileToken: "tok",
};

describe("contactSchema", () => {
  it("accepts a complete submission", () => {
    expect(contactSchema.safeParse(valid).success).toBe(true);
  });
  it("rejects a bad email and a short message", () => {
    const r = contactSchema.safeParse({
      ...valid,
      email: "nope",
      message: "hi",
    });
    expect(r.success).toBe(false);
    const paths = r.success ? [] : r.error.issues.map((i) => i.path[0]);
    expect(paths).toContain("email");
    expect(paths).toContain("message");
  });
  it("company is optional, turnstileToken is required", () => {
    expect(
      contactSchema.safeParse({ ...valid, company: undefined }).success,
    ).toBe(true);
    expect(
      contactSchema.safeParse({ ...valid, turnstileToken: "" }).success,
    ).toBe(false);
  });
});
