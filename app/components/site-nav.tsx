import Image from "next/image";
import Link from "next/link";

export default function SiteNav({ home = true }: { home?: boolean }) {
  const section = (id: string) => home ? `#${id}` : `/#${id}`;
  const links = [
    { label: "Home", href: section("top") },
    { label: "@clubturo", href: section("social") },
    { label: "Barcelona", href: "/barcelona" },
    { label: "Experts", href: section("experts") },
    { label: "Legal", href: "/legal", quiet: true },
  ];

  return (
    <header className="siteHeader">
      <nav className="siteNav pageShell" aria-label="Main navigation">
        <Link href="/" className="brandWordmark" aria-label="Turó home">
          <Image src="/Images/turo-wordmark-black.PNG" alt="Turó" width={645} height={264} priority />
        </Link>
        <div className="navLinks">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className={link.quiet ? "navQuietLink" : undefined}>
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
              <Link key={link.label} href={link.href} className={link.quiet ? "navQuietLink" : undefined}>
                {link.label}
              </Link>
            ))}
          </div>
        </details>
      </nav>
    </header>
  );
}
