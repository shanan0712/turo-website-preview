import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { legalDocuments } from "../legal-content";

export const metadata: Metadata = {
  title: "Terms of Use — Turó",
  description: "Turó's Terms of Use.",
};

const terms = legalDocuments.terms;

const renderParagraph = (text: string): ReactNode =>
  text.split(/(support@clubturo\.com)/g).map((part, index) =>
    part === "support@clubturo.com" ? (
      <a href="mailto:support@clubturo.com" key={index}>
        {part}
      </a>
    ) : (
      part
    ),
  );

const renderSectionBody = (body: string) =>
  body.split("\n\n").map((paragraph, paragraphIndex) => {
    const lines = paragraph.split("\n");
    const isBulletList = lines.every((line) => line.startsWith("• "));

    if (isBulletList) {
      return (
        <ul key={paragraphIndex}>
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>{renderParagraph(line.slice(2))}</li>
          ))}
        </ul>
      );
    }

    return (
      <p key={paragraphIndex}>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex}>
            {lineIndex > 0 && <br />}
            {renderParagraph(line)}
          </span>
        ))}
      </p>
    );
  });

export default function TermsPage() {
  return (
    <main className="privacyPage">
      <article className="privacyDocument" aria-labelledby="terms-title">
        <header className="privacyDocumentHeader">
          <Link className="privacyBackLink" href="/" aria-label="Back to homepage">
            ←
          </Link>
          <p className="privacyEyebrow privacyLegalLabel">LEGAL</p>
          <h1 id="terms-title">Terms of Use</h1>
          <div className="privacyDates">
            <p>
              <span>Last updated: </span>24 August 2026
            </p>
            <p>
              <span>Effective date: </span>26 May 2026
            </p>
          </div>
        </header>
        <nav className="legalDocumentNav" aria-label="Legal documents">
          <Link href="/terms" aria-current="page">
            TERMS
          </Link>
          <span className="legalDocumentDivider" aria-hidden="true" />
          <Link href="/privacy">PRIVACY</Link>
        </nav>

        <nav className="privacyContents" aria-labelledby="terms-contents-title">
          <h2 className="privacyEyebrow" id="terms-contents-title">
            CONTENTS
          </h2>
          <ol>
            {terms.sections.map(({ id, heading }, index) => (
              <li key={id}>
                <a href={`#${id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section className="privacyProvider" aria-labelledby="terms-provider-title">
          <h2 className="privacyEyebrow" id="terms-provider-title">
            SERVICE PROVIDER
          </h2>
          <p className="privacyProviderName">{terms.provider.name}</p>
          <p>{terms.provider.description}</p>
          <p>Operating the platform known as “Turó”</p>
          <p>{terms.provider.sub2}</p>
        </section>

        <div className="privacySections">
          {terms.sections.map((section, index) => (
            <section
              className="privacySection"
              id={section.id}
              key={section.id}
              aria-labelledby={`terms-heading-${section.id}`}
            >
              <header className="privacySectionHeader">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2 id={`terms-heading-${section.id}`}>{section.heading.toUpperCase()}</h2>
              </header>
              <div className="privacySectionBody">{renderSectionBody(section.body)}</div>
            </section>
          ))}
        </div>

        <footer className="privacyLegalEnding">
          <p className="privacyContactLine">
            © 2026 Turó. For questions contact{" "}
            <a href="mailto:support@clubturo.com">support@clubturo.com</a>
          </p>
        </footer>
      </article>
    </main>
  );
}
