import type { Metadata } from "next";
import SiteFooter from "../components/site-footer";
import SiteNav from "../components/site-nav";

export const metadata: Metadata = {
  title: "Get in touch — Turó",
  description: "Get in touch with Turó.",
};

export default function ContactPage() {
  return (
    <main className="barcelonaPage contactPage">
      <SiteNav home={false} />
      <section className="contactPageContent" aria-labelledby="contact-title">
        <p className="eyebrow">Company</p>
        <h1 id="contact-title">Get in touch.</h1>
      </section>
      <SiteFooter />
    </main>
  );
}
