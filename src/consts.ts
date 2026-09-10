export const SITE = {
  name: "Kemal Sogut",
  tagline: "Custom software for local businesses.",
  description:
    "I design and build custom web apps for local businesses in Ottawa: quoting tools, customer portals, internal dashboards and automations. One engineer, direct line, fixed quotes.",
  url: "https://portfolio.kemalsogut.workers.dev",
  location: "Ottawa, ON",
  phone: "(873) 355-1089",
  phoneHref: "tel:+18733551089",
  email: "kemalsogut7c@gmail.com",
  linkedin: "https://www.linkedin.com/in/kemal-sogut-b66505255/",
  github: "https://github.com/Kemal-Sogut",
  ogImage: "/og.png",
} as const;

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
] as const;

export const TRUSTED_BY = [
  "Blinds Nisa",
  "PLAY (Platform for Leisure and Achievement of Youth)",
  "Antimony Tech",
  "Northern Lights Educational Services",
] as const;

// Backwards-compatible names some template files still import.
export const SITE_TITLE = SITE.name;
export const SITE_DESCRIPTION = SITE.description;
export const GITHUB_URL = SITE.github;

// Consumed by the template's BaseHead until Task 6 replaces it.
export const SITE_METADATA = {
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "custom web app developer Ottawa",
    "web app development for small business",
    "quoting software",
    "customer portal development",
    "internal tools developer",
    "freelance software engineer Ottawa",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    siteName: SITE.name,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
};
