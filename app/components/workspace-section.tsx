"use client";

import { FormEvent, useRef, useState } from "react";

export default function WorkspaceSection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [formStatus, setFormStatus] = useState("");

  const openForm = () => {
    dialogRef.current?.showModal();
    dialogRef.current?.querySelector<HTMLInputElement>("#workspace-name")?.focus();
  }; 

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (isSubmitting) return;

  setIsSubmitting(true);
  setFormStatus("");

  const form = event.currentTarget;
  const formData = new FormData(form);

  try {
    const response = await fetch("/api/workspace", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        companySize: formData.get("companySize"),
        message: formData.get("message"),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.ok) {
      throw new Error(result.error || "Something went wrong.");
    }

    setFormStatus("Thanks. We’ve received your enquiry.");
    form.reset();
  } catch (error) {
    console.error("Workspace form submission failed:", error);
    setFormStatus("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="workspace" className="workspaceSection" aria-labelledby="workspace-title">
      <div className="workspaceContent">
        <p className="eyebrow">WORKSPACE</p>
        <h2 id="workspace-title">Bring your people together.</h2>
        <p className="workspaceIntroduction">
          Turó gives companies a connected platform to engage their people through movement, community, challenges, events, and everyday wellbeing.
        </p>
        <div className="workspaceActions">
          <button className="workspaceSolutionButton" type="button" onClick={openForm}>
            Find the right solution <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <dialog
        className="workspaceDialog"
        ref={dialogRef}
        aria-labelledby="workspace-dialog-title"
        aria-describedby="workspace-dialog-description"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            dialogRef.current?.close();
          }
        }}
      >
        <div className="workspaceDialogPanel">
          <button
            className="workspaceDialogClose"
            type="button"
            aria-label="Close contact form"
            onClick={() => dialogRef.current?.close()}
          >
            <span aria-hidden="true">×</span>
          </button>
          <p className="eyebrow">WORKSPACE</p>
          <h2 id="workspace-dialog-title">Let’s find the right fit.</h2>
          <p id="workspace-dialog-description" className="workspaceDialogIntroduction">
            Tell us a little about your team and what you have in mind.
          </p>
          <form className="workspaceForm" onSubmit={handleSubmit}>
            <label>
              Name
              <input id="workspace-name" name="name" autoComplete="name" required />
            </label>
            <label>
              Company
              <input name="company" autoComplete="organization" required />
            </label>
            <label>
              Work email
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Company size
              <select name="companySize" defaultValue="" required>
                <option value="" disabled>Select company size</option>
                <option>1–10</option>
                <option>11–50</option>
                <option>51–200</option>
                <option>201–1,000</option>
                <option>1,001+</option>
              </select>
            </label>
            <label className="workspaceMessageField">
              Message
              <textarea name="message" rows={4} required />
            </label>
            <button className="workspaceSubmit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send request"} <span aria-hidden="true">→</span>
            </button>
            {formStatus && <p role="status">{formStatus}</p>}
          </form>
        </div>
      </dialog>
    </section>
  );
}
