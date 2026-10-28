"use client";

import Image from "next/image";
import Link from "next/link";
import type { MouseEvent } from "react";

export default function SiteNav({ home = true }: { home?: boolean }) {
  const section = (id: string) => home ? `#${id}` : `/#${id}`;
  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (
      !home ||
      !href.startsWith("#") ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const target = document.getElementById(href.slice(1));
    if (!target) return;

    event.preventDefault();
    if (window.location.hash !== href) {
      window.history.pushState(null, "", href);
    }
    target.scrollIntoView();
  };
  const links = [
    { label: "@clubturo", href: section("social") },
    { label: "Barcelona", href: section("origin") },
    { label: "Experts", href: section("experts") },
    { label: "Legal", href: "/privacy", quiet: true },
  ];

  return (
    <header className="siteHeader">
      <nav className="siteNav pageShell" aria-label="Main navigation">
        <Link href="/" className="brandWordmark" aria-label="Turó home">
          <Image src="/Images/turo-wordmark-black.PNG" alt="Turó" width={645} height={264} priority />
        </Link>
        <div className="navLinks">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={link.quiet ? "navQuietLink" : undefined}
              onClick={(event) => handleSectionClick(event, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <details className="mobileNav">
          <summary aria-label="Open navigation menu">
            Menu <span aria-hidden="true">⌄</span>
          </summary>
          <div className="mobileNavLinks">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={link.quiet ? "navQuietLink" : undefined}
                onClick={(event) => handleSectionClick(event, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
