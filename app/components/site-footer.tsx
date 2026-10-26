import Image from "next/image";
import Link from "next/link";

export default function SiteFooter({ minimal = false }: { minimal?: boolean }) {
  return (
    <footer className={`siteFooter pageShell${minimal ? " siteFooterMinimal" : ""}`}>
      {!minimal && (
        <Link href="/" className="footerBrand" aria-label="Turó home">
          <Image src="/Images/turo-lockup-black.PNG" alt="Turó" width={2084} height={1042} />
        </Link>
      )}
      <div className="footerLegal">
        <p>{minimal ? "© 2026 TURO BCN S.L." : "© 2026 TURO BCN SL"}</p>
        <nav className="footerLegalLinks" aria-label="Legal links">
          {!minimal && <Link href="/contact">Get in touch</Link>}
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
