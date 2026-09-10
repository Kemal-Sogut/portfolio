import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

import { NAV, SITE } from "@/consts";

const siteLinks = [...NAV, { href: "/contact", label: "Contact" }];

export function Footer() {
  return (
    <footer className="border-border/60 mt-28 border-t lg:mt-32">
      <div className="container grid gap-10 py-14 md:grid-cols-3 lg:py-16">
        <div className="space-y-3">
          <a
            href="/"
            className="font-display text-lg font-semibold tracking-tight"
          >
            {SITE.name}
          </a>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            {SITE.tagline}
          </p>
          <p className="text-muted-foreground flex items-center gap-2 text-sm">
            <MapPin className="size-4 shrink-0" aria-hidden="true" />
            {SITE.location}
          </p>
        </div>

        <div>
          <h2 className="font-mono text-xs tracking-widest uppercase">Site</h2>
          <ul className="mt-4 space-y-2.5">
            {siteLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-xs tracking-widest uppercase">
            Contact
          </h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a
                href={SITE.phoneHref}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
              >
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
              >
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={SITE.linkedin}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="size-4 shrink-0" aria-hidden="true" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={SITE.github}
                className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4 shrink-0" aria-hidden="true" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-border/60 border-t">
        <p className="text-muted-foreground container py-6 text-xs">
          © {new Date().getFullYear()} {SITE.name}. Form submissions are used
          only to reply to you.
        </p>
      </div>
    </footer>
  );
}
