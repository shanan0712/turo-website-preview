import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "../components/site-footer";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Get in touch — Turó",
  description: "Get in touch with Turó.",
};

export default function ContactPage() {
  return (
    <main className="contactPage">
      <header className="contactHeader">
        <div className="contactShell">
          <Link className="contactBack" href="/" aria-label="Back to homepage">
            ←
          </Link>
          <h1>Stay in the loop</h1>
          <p>Whether you’re curious about the app, a partnership, or just want to say hello, we’re here.</p>
        </div>
      </header>

      <div className="contactMain">
      <div className="contactShell contactLayout">
        <section className="contactInfo" aria-label="Contact information">
          <div>
            <h2>Barcelona</h2>
            <p>
              Calle Amigó, 74, Planta 1ª, Puerta 2
              <br />
              08021 Barcelona, Spain
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              <a href="mailto:info@clubturo.com">info@clubturo.com</a>
            </p>
          </div>
          <div>
            <h2>Phone</h2>
            <p>
              <a href="tel:+34600956056">+34 600 956 056</a>
            </p>
          </div>
        </section>

        <section aria-label="Contact form">
          <ContactForm />
        </section>
      </div>
      </div>

      <SiteFooter minimal />
    </main>
  );
}
