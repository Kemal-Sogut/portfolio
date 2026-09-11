# Kemal Sogut — portfolio

Marketing site for a one-person software studio in Ottawa that builds custom web
apps for local businesses: quoting tools, customer portals, internal dashboards,
invoicing and automations.

Six pages (home, services, work, pricing, about, contact) plus case-study detail
pages. Everything is prerendered except `POST /api/contact`, which verifies a
Cloudflare Turnstile token and sends the enquiry through Resend.

## Stack

Astro 5 · React 19 · Tailwind CSS 4 · shadcn/ui · Magic UI · Cloudflare Workers
(`@astrojs/cloudflare`) · Wrangler 4 · Vitest · pnpm 9 · Node 22.

## Commands

```bash
pnpm install       # Node >= 22, pnpm 9
pnpm dev           # Vite dev server, fast but not the Worker runtime
pnpm cf:dev        # build + wrangler dev — use this to test /api/contact
pnpm build         # emits dist/ (static assets + dist/_worker.js/)
pnpm test          # vitest, contact backend
pnpm check         # astro check + tsc --noEmit
pnpm run deploy    # build + wrangler deploy (`pnpm deploy` is a built-in)
```

Test the contact form through `pnpm cf:dev`, not `pnpm dev`. Only the Worker
runtime serves the API route, the trailing-slash redirects and the 404 page.

## Configuration

Copy the examples and fill them in locally. Both files are git-ignored.

```bash
cp .dev.vars.example .dev.vars   # server-side, read by wrangler dev
cp .env.example .env             # client-side, baked into the bundle at build
```

| Name                        | Where                   | What it is                                     |
| --------------------------- | ----------------------- | ---------------------------------------------- |
| `RESEND_API_KEY`            | Worker secret           | Resend API key used to send enquiries          |
| `TURNSTILE_SECRET`          | Worker secret           | Turnstile **secret** key, verified server-side |
| `CONTACT_TO`                | `wrangler.jsonc` var    | Inbox that receives enquiries                  |
| `PUBLIC_TURNSTILE_SITE_KEY` | build variable / `.env` | Turnstile **site** key, public by design       |

The examples ship Cloudflare's published always-pass Turnstile test keys, so the
form works locally without a real widget. In production, set the two secrets with
`pnpm wrangler secret put <NAME>`.

## Editing content

No code changes needed for any of this. Add or edit files and rebuild.

| What                       | Where                                                          |
| -------------------------- | -------------------------------------------------------------- |
| Case studies               | `src/content/work/<slug>.mdx`                                  |
| Services                   | `src/content/services/*.json`                                  |
| Pricing tiers              | `src/content/pricing/tiers.json`                               |
| FAQ                        | `src/content/faq/*.json` (`showOnHome` controls the home page) |
| Name, contact details, nav | `src/consts.ts`                                                |

Schemas live in `src/content.config.ts`; the build fails loudly if a field is
missing or the wrong type.

Case studies without a `cover` image render a stack card instead of a
screenshot, so a missing asset never shows as a broken image. Drop screenshots in
`public/work/` and reference them as `cover: "/work/<file>.png"`. A portrait goes
at `public/about/kemal.jpg` (4:5); until it exists the about page hides the slot.

The social preview image is generated from `scripts/og.mjs` and committed as
`public/og.png`. Re-run it only when the hero copy changes:

```bash
pnpm dlx playwright install chromium && pnpm dlx playwright node scripts/og.mjs
```

## Deployment

Live at **https://portfolio.kemalsogut7c.workers.dev**

Deployed as a Cloudflare Worker with static assets. Pushes to `main` deploy to
production through Workers Builds; other branches get preview versions.

Use `pnpm run deploy`, not `pnpm deploy` — the latter is pnpm's own built-in
workspace command and fails with `ERR_PNPM_CANNOT_DEPLOY`.

Custom domain: pending purchase (see the design spec, section 10). When one is
bought, update `site` in `astro.config.mjs`, `SITE.url` in `src/consts.ts` and
the sitemap line in `public/robots.txt`, then add the hostname to the Turnstile
widget.

The Worker name in the Cloudflare dashboard must match `name` in
`wrangler.jsonc` (`portfolio`) or builds fail.

## Credits

Started from the [Mainline Astro template](https://github.com/shadcnblocks/mainline-astro-template)
by shadcnblocks.com (MIT + Commons Clause).
