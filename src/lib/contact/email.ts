import { BUDGETS, PROJECT_TYPES, type ContactInput } from "./schema";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
const stripTags = (s: string) => s.replace(/<[^>]*>/g, "");
const label = (
  list: readonly { value: string; label: string }[],
  v: string,
) => list.find((x) => x.value === v)?.label ?? v;

export function buildContactEmail(input: ContactInput) {
  const name = stripTags(input.name);
  const company = input.company ? ` (${stripTags(input.company)})` : "";
  const subject = `New enquiry from ${name}${company}`;
  const rows: [string, string][] = [
    ["Name", input.name],
    ["Email", input.email],
    ["Company", input.company ?? "—"],
    ["Project type", label(PROJECT_TYPES, input.projectType)],
    ["Budget", label(BUDGETS, input.budget)],
  ];
  const html =
    `<h2>${escapeHtml(subject)}</h2><table>` +
    rows
      .map(
        ([k, v]) => `<tr><td><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`,
      )
      .join("") +
    `</table><h3>Message</h3><p>${escapeHtml(input.message).replace(/\n/g, "<br>")}</p>`;
  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${input.message}`;
  return { subject, html, text };
}

export async function sendContactEmail(
  input: ContactInput,
  opts: { apiKey: string; to: string; from?: string },
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  const { subject, html, text } = buildContactEmail(input);
  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${opts.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: opts.from ?? "Portfolio <onboarding@resend.dev>",
        to: [opts.to],
        reply_to: input.email,
        subject,
        html,
        text,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
