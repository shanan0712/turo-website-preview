import Image from "next/image";
import Link from "next/link";

export default function SiteFooter({ home = true }: { home?: boolean }) {
  const section = (id: string) => home ? `#${id}` : `/#${id}`;

  return (
    <footer className="siteFooter pageShell">
      <Link href="/" className="footerBrand" aria-label="Turó home">
        <Image src="/Images/turo-lockup-black.PNG" alt="Turó" width={2084} height={1042} />
      </Link>
      <nav className="footerLinks" aria-label="Footer navigation">
        <Link href={section("product")}>Product</Link>
        <Link href={section("territory")}>Territory</Link>
        <Link href={section("social")}>Turó Social</Link>
        <Link href={section("experts")}>Experts</Link>
        <Link href="/barcelona">Barcelona</Link>
      </nav>
      <p>© 2026 Turó</p>
    </footer>
  );
}
