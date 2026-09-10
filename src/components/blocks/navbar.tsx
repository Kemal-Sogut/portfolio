import { useState, useEffect } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { NAV, SITE } from "@/consts";
import { cn } from "@/lib/utils";

const ITEMS = [...NAV, { href: "/contact", label: "Contact" }];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const isCurrent = (href: string) =>
    pathname === href || pathname === `${href}/`;

  return (
    <header
      className={cn(
        "bg-background/70 absolute left-1/2 z-50 w-[min(90%,760px)] -translate-x-1/2 rounded-4xl border backdrop-blur-md transition-all duration-300",
        "top-5 lg:top-12",
      )}
    >
      <div className="flex items-center justify-between px-6 py-3">
        <a
          href="/"
          className="font-display shrink-0 text-base font-semibold tracking-tight"
        >
          {SITE.name}
        </a>

        {/* Desktop navigation */}
        <nav className="max-lg:hidden" aria-label="Main">
          <ul className="flex items-center gap-5">
            {ITEMS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={cn(
                    "text-sm font-medium transition-opacity hover:opacity-75",
                    isCurrent(link.href) && "text-muted-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Button asChild className="max-lg:hidden">
            <a href="/contact">Start a project</a>
          </Button>

          {/* Hamburger menu button (mobile only) */}
          <button
            className="text-muted-foreground relative flex size-8 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "rotate-45" : "-translate-y-1.5"}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                aria-hidden="true"
                className={`absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out ${isMenuOpen ? "-rotate-45" : "translate-y-1.5"}`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "bg-background fixed inset-x-0 top-[calc(100%+1rem)] flex flex-col rounded-2xl border p-6 transition-all duration-300 ease-in-out lg:hidden",
          isMenuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-4 opacity-0",
        )}
      >
        <nav
          className="divide-border flex flex-1 flex-col divide-y"
          aria-label="Mobile"
        >
          {ITEMS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              className={cn(
                "text-foreground hover:text-foreground/80 py-4 text-base font-medium transition-colors first:pt-0",
                isCurrent(link.href) && "text-muted-foreground",
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <Button asChild className="mt-6 w-full">
          <a href="/contact" onClick={() => setIsMenuOpen(false)}>
            Start a project
          </a>
        </Button>
      </div>
    </header>
  );
};
