import type { Metadata } from "next";
import LegalDocument from "../components/legal-document";

export const metadata: Metadata = {
  title: "Terms of Use — Turó",
  description: "Turó's Terms of Use.",
};

export default function TermsPage() {
  return <LegalDocument document="terms" />;
}
