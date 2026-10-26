import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="siteFooter pageShell">
      <Link href="/" className="footerBrand" aria-label="Turó home">
        <Image src="/Images/turo-lockup-black.PNG" alt="Turó" width={2084} height={1042} />
      </Link>
      <div className="footerLegal">
        <p>© 2026 TURO BCN SL</p>
        <nav className="footerLegalLinks" aria-label="Legal links">
          <Link href="/contact">Get in touch</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
