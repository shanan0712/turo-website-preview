"use client";

import { FormEvent, useRef, useState } from "react";
import { countries, flag } from "./countries";
import {
  classifyEnquiry,
  confirmations,
  limits,
  validateContact,
  type ContactErrors,
  type ContactInput,
  type EnquiryKind,
} from "./validation";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; kind: EnquiryKind }
  | { state: "error"; message: string };

const emptyForm: ContactInput = { name: "", email: "", country: "ES", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState<ContactInput>(emptyForm);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const country = countries.find((item) => item.code === values.country) ?? countries[0];
  const sending = status.state === "sending";

  const update = (field: keyof ContactInput, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (errors[field] || (field === "country" && errors.phone)) {
      const nextErrors = validateContact(next);
      setErrors((current) => ({
        ...current,
        [field]: nextErrors[field],
        ...(field === "country" ? { phone: nextErrors.phone } : {}),
      }));
    }
  };

  const validateField = (field: keyof ContactInput) =>
    setErrors((current) => ({ ...current, [field]: validateContact(values)[field] }));

  const fieldProps = (field: keyof ContactInput, maxLength: number) => ({
    name: field,
    value: values[field],
    maxLength,
    disabled: sending,
    "aria-invalid": errors[field] ? (true as const) : undefined,
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    onChange: (event: { target: { value: string } }) => update(field, event.target.value),
    onBlur: () => values[field] && validateField(field),
  });

  const errorFor = (field: keyof ContactInput) =>
    errors[field] ? (
      <span className="contactError" id={`contact-${field}-error`} role="alert">
        {errors[field]}
      </span>
    ) : null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const found = validateContact(values);
    setErrors(found);
    const first = (Object.keys(found) as (keyof ContactInput)[])[0];
    if (first) {
      setStatus({ state: "idle" });
      formRef.current?.querySelector<HTMLElement>(`[name="${first === "country" ? "phone" : first}"]`)?.focus();
      return;
    }

    setStatus({ state: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json().catch(() => ({}));
      if (response.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus({ state: "idle" });
        return;
      }
      if (!response.ok) {
        setStatus({
          state: "error",
          message:
            response.status === 429
              ? "Too many messages in a short time. Please wait a few minutes and try again."
              : "We couldn’t send your message. Please try again, or email us at info@clubturo.com.",
        });
        return;
      }
      setStatus({ state: "sent", kind: data.kind ?? classifyEnquiry(values.subject) });
      setValues(emptyForm);
    } catch {
      setStatus({
        state: "error",
        message: "We couldn’t reach the server. Check your connection and try again.",
      });
    }
  };

  if (status.state === "sent") {
    return (
      <div className="contactForm">
        <div className="contactStatus" role="status">
          <strong>Message sent</strong>
          {confirmations[status.kind]}
          <br />
          <button type="button" onClick={() => setStatus({ state: "idle" })}>
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="contactForm" ref={formRef} onSubmit={handleSubmit} noValidate>
      <label>
        Name
        <input {...fieldProps("name", limits.name)} autoComplete="name" />
        {errorFor("name")}
      </label>
      <label>
        Email
        <input {...fieldProps("email", limits.email)} type="email" autoComplete="email" />
        {errorFor("email")}
      </label>
      <div className="contactFormWide contactPhoneField">
        <label htmlFor="contact-phone">Phone</label>
        <div className="contactPhoneRow">
          <div className="contactCountry">
            <span aria-hidden="true">
              {flag(country.code)} {country.dial}
            </span>
            <select
              aria-label="Country code"
              value={values.country}
              disabled={sending}
              onChange={(event) => update("country", event.target.value)}
            >
              {countries.map((item) => (
                <option key={item.code} value={item.code}>
                  {flag(item.code)} {item.name} ({item.dial})
                </option>
              ))}
            </select>
          </div>
          <input
            {...fieldProps("phone", limits.phone)}
            id="contact-phone"
            type="tel"
            autoComplete="tel-national"
            inputMode="tel"
          />
        </div>
        {errorFor("phone")}
      </div>
      <label className="contactFormWide">
        Subject
        <input {...fieldProps("subject", limits.subject)} />
        {errorFor("subject")}
      </label>
      <label className="contactFormWide">
        How can we help?
        <textarea {...fieldProps("message", limits.message)} rows={3} />
        {errorFor("message")}
      </label>
      {status.state === "error" && (
        <p className="contactStatus" data-tone="error" role="alert">
          {status.message}
        </p>
      )}
      <button className="contactFormSubmit" type="submit" disabled={sending} aria-busy={sending}>
        {sending ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
