export const SITE = {
  name: "Kemal Sogut",
  tagline: "Custom software for local businesses.",
  description:
    "I design and build custom web apps for local businesses in Ottawa: quoting tools, customer portals, internal dashboards and automations. One engineer, direct line, fixed quotes.",
  url: "https://kemalsogut.com",
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
