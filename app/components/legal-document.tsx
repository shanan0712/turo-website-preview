"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { legalDocuments } from "../legal-content";

type LegalDocumentId = keyof typeof legalDocuments;
type LegalSectionId =
  | (typeof legalDocuments.terms.sections)[number]["id"]
  | (typeof legalDocuments.privacy.sections)[number]["id"];

export default function LegalDocument({ document }: { document: LegalDocumentId }) {
  const legalDocument = legalDocuments[document];
  const rootRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Partial<Record<LegalSectionId, HTMLElement | null>>>({});
  const [activeSection, setActiveSection] = useState<LegalSectionId>(
    legalDocument.sections[0].id,
  );
  const [mobileContentsOpen, setMobileContentsOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const updateActiveSection = () => {
      const rootTop = root.getBoundingClientRect().top;
      let currentSection: LegalSectionId = legalDocument.sections[0].id;

      for (const section of legalDocument.sections) {
        const element = sectionRefs.current[section.id];
        if (element && element.getBoundingClientRect().top - rootTop <= 117) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    root.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => root.removeEventListener("scroll", updateActiveSection);
  }, [legalDocument.sections]);

  const navigateToSection = (id: LegalSectionId) => {
    const section = sectionRefs.current[id];
    if (!section) return;

    setActiveSection(id);
    setMobileContentsOpen(false);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderContents = () =>
    legalDocument.sections.map((section, index) => (
      <button
        key={section.id}
        type="button"
        onClick={() => navigateToSection(section.id)}
        className={`turo-nav-btn${activeSection === section.id ? " active" : ""}`}
        aria-current={activeSection === section.id ? "location" : undefined}
      >
        <span className="turo-nav-num">{String(index + 1).padStart(2, "0")}</span>
        {section.heading}
      </button>
    ));

  return (
    <div className="turo-legal-root" ref={rootRef}>
      <header className="turo-topbar">
        <Link className="turo-back-btn" href="/" aria-label="Back to Turó home">
          <span aria-hidden="true">←</span> Back
        </Link>
        <nav className="turo-doc-tabs legalDocumentNav" aria-label="Legal documents">
          <Link
            className="turo-tab-btn"
            href="/terms"
            aria-current={document === "terms" ? "page" : undefined}
          >
            Terms
          </Link>
          <span className="legalDocumentDivider" aria-hidden="true" />
          <Link
            className="turo-tab-btn"
            href="/privacy"
            aria-current={document === "privacy" ? "page" : undefined}
          >
            Privacy
          </Link>
        </nav>
      </header>

      <section className="turo-hero" aria-labelledby="legal-title">
        <p className="turo-eyebrow">{legalDocument.subtitle}</p>
        <h1 className="turo-hero-title" id="legal-title">
          {legalDocument.title}
        </h1>
        <div className="turo-hero-dates">
          <p>
            <span>Last updated: </span>
            <strong>{legalDocument.dates.updated}</strong>
          </p>
          <p>
            <span>Effective date: </span>
            <strong>{legalDocument.dates.effective}</strong>
          </p>
        </div>
      </section>

      <button
        type="button"
        className="turo-mobile-toc-toggle"
        onClick={() => setMobileContentsOpen((isOpen) => !isOpen)}
        aria-expanded={mobileContentsOpen}
        aria-controls="legal-toc-drawer"
      >
        <span>
          {legalDocument.sections.find((section) => section.id === activeSection)?.heading ??
            "Contents"}
        </span>
        <span aria-hidden="true">{mobileContentsOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`turo-mobile-toc-drawer${mobileContentsOpen ? " open" : ""}`}
        id="legal-toc-drawer"
        aria-hidden={!mobileContentsOpen}
      >
        <nav aria-label="Document contents">{renderContents()}</nav>
      </div>

      <div className="turo-body">
        <aside className="turo-sidebar">
          <span className="turo-sidebar-label">Contents</span>
          <nav aria-label="Document contents">{renderContents()}</nav>
        </aside>

        <main className="turo-main">
          <section className="turo-provider-card" aria-label="Service provider">
            <p className="turo-provider-label">Service Provider</p>
            <p className="turo-provider-name">{legalDocument.provider.name}</p>
            <p className="turo-provider-detail">{legalDocument.provider.description}</p>
            <p className="turo-provider-detail">{legalDocument.provider.sub}</p>
            <p className="turo-provider-detail">{legalDocument.provider.sub2}</p>
          </section>

          {legalDocument.sections.map((section, index) => (
            <section
              key={section.id}
              ref={(element) => {
                sectionRefs.current[section.id] = element;
              }}
              className="turo-section"
              id={section.id}
              aria-labelledby={`${section.id}-heading`}
            >
              <div className="turo-section-header">
                <span className="turo-section-num">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="turo-section-heading" id={`${section.id}-heading`}>
                  {section.heading}
                </h2>
              </div>
              <div className="turo-section-rule" />
              <div className="turo-section-body">
                {section.body.split("\n\n").map((paragraph, paragraphIndex) => (
                  <p className="turo-section-para" key={`${section.id}-${paragraphIndex}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <footer className="turo-footer">
            © 2026 Turó. For questions contact{" "}
            <a href="mailto:support@clubturo.com">support@clubturo.com</a>
          </footer>
        </main>
      </div>
    </div>
  );
}
