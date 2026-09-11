// Generates public/og.png (1200x630). The PNG is committed, so this only
// needs re-running when the copy changes. Playwright is deliberately not a
// dependency (its postinstall downloads a browser on every CI build):
//   pnpm dlx playwright install chromium && pnpm dlx playwright node scripts/og.mjs
import { chromium } from "playwright";

const html = `<html><body style="margin:0;width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;padding:80px;box-sizing:border-box;background:#0b1220;color:#fff;font-family:Inter,system-ui,sans-serif">
<div style="font:500 20px 'DM Mono',monospace;color:#8ab4ff;letter-spacing:.2em">OTTAWA · CUSTOM WEB APPS</div>
<div style="font-size:64px;font-weight:700;line-height:1.05;margin-top:24px;max-width:1000px">Software built around how your business actually works.</div>
<div style="font-size:28px;margin-top:32px;color:#c7d2fe">Kemal Sogut — quoting tools, portals, dashboards, automations</div></body></html>`;

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.screenshot({ path: "public/og.png" });
await b.close();
