import type { Metadata } from "next";
import Link from "next/link";
import { privacySections } from "./privacy-content";

export const metadata: Metadata = {
  title: "Privacy Policy — Turó",
  description: "Privacy Policy for Turó, operated by TURO BCN S.L.",
};

const contents = [
  { id: "about-this-policy", title: "About This Policy" },
  { id: "definitions", title: "Definitions" },
  { id: "personal-data-collected", title: "Type of Personal Data Collected" },
  { id: "data-collection", title: "Data Collection" },
  { id: "use-of-personal-data", title: "Use of Your Personal Data" },
  { id: "legal-basis", title: "Legal Basis for Processing" },
  { id: "disclosure", title: "Disclosure of Personal Data" },
  { id: "protection", title: "Protection of Personal Data" },
  { id: "international-transfers", title: "International Transfers" },
  { id: "retention", title: "Retention of Data" },
  { id: "rights", title: "Your Rights" },
  { id: "changes", title: "Changes to This Policy" },
];

export default function PrivacyPage() {
  return (
    <main className="privacyPage">
      <article className="privacyDocument" aria-labelledby="privacy-title">
        <header className="privacyDocumentHeader">
          <Link className="privacyBackLink" href="/" aria-label="Back to homepage">
            ←
          </Link>
          <p className="privacyEyebrow privacyLegalLabel">LEGAL</p>
          <h1 id="privacy-title">Privacy Policy</h1>
          <div className="privacyDates">
            <p>
              <span>Last updated: </span>24 August 2026
            </p>
            <p>
              <span>Effective date: </span>26 May 2026
            </p>
          </div>
          <nav className="legalDocumentNav" aria-label="Legal documents">
            <Link href="/terms">TERMS</Link>
            <span className="legalDocumentDivider" aria-hidden="true" />
            <Link href="/privacy" aria-current="page">
              PRIVACY
            </Link>
          </nav>
        </header>

        <nav className="privacyContents" aria-labelledby="privacy-contents-title">
          <h2 className="privacyEyebrow" id="privacy-contents-title">
            CONTENTS
          </h2>
          <ol>
            {contents.map(({ id, title }, index) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="privacyProvider" aria-labelledby="privacy-provider-title">
          <h2 className="privacyEyebrow" id="privacy-provider-title">
            SERVICE PROVIDER
          </h2>
          <p className="privacyProviderName">TURO BCN S.L.</p>
          <p>Tax ID: B22482392</p>
          <p>Calle Amigó, 74, Planta 1ª, Puerta 2, Barcelona (08021), Spain</p>
          <p>
            <a href="mailto:info@clubturo.com">info@clubturo.com</a> ·{" "}
            <a href="tel:+34600956056">+34 600 956 056</a>
          </p>
        </section>

        <div className="privacySections">
          {privacySections.map((section) => (
            <section
              className="privacySection"
              id={contents[Number(section.number) - 1].id}
              key={section.number}
              aria-labelledby={`privacy-heading-${section.number}`}
            >
              <header className="privacySectionHeader">
                <span>{section.number}</span>
                <h2 id={`privacy-heading-${section.number}`}>{section.heading}</h2>
              </header>
              <div className="privacySectionBody">{section.content}</div>
            </section>
          ))}
        </div>

        <footer className="privacyLegalEnding">
          <p className="privacyContactLine">
            For questions contact{" "}
            <a href="mailto:support@clubturo.com">support@clubturo.com</a>
          </p>
          <p className="privacyCopyright">© 2026 TURO BCN S.L.</p>
        </footer>
      </article>
    </main>
  );
}
