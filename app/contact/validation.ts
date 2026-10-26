import { countries } from "./countries";

export type ContactInput = {
  name: string;
  email: string;
  country: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;
export type EnquiryKind = "partnership" | "press" | "support" | "general";

export const limits = { name: 100, email: 254, phone: 20, subject: 150, message: 3000 };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// National number length (digits) per country; anything unlisted falls back to 6–14.
const phoneLengths: Record<string, [number, number]> = {
  ES: [9, 9], US: [10, 10], CA: [10, 10], GB: [10, 10], FR: [9, 9], DE: [6, 13], IT: [6, 11],
  PT: [9, 9], NL: [9, 9], BE: [8, 9], CH: [9, 9], AT: [4, 13], IE: [7, 9], IN: [10, 10],
  AU: [9, 9], MX: [10, 10], BR: [10, 11], AR: [10, 10], JP: [9, 10], CN: [11, 11],
  SE: [7, 10], NO: [8, 8], DK: [8, 8], FI: [5, 12], PL: [9, 9], AE: [9, 9], SA: [9, 9],
  SG: [8, 8], TR: [10, 10], ZA: [9, 9], NZ: [8, 10], AD: [6, 9], KR: [9, 10],
};

export function validateContact(input: ContactInput): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();
  const phone = input.phone.trim();

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > limits.name) errors.name = `Name must be ${limits.name} characters or fewer.`;

  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > limits.email || !emailPattern.test(email)) errors.email = "Please enter a valid email address.";

  if (phone) {
    const country = countries.find((item) => item.code === input.country);
    const digits = phone.replace(/[\s().-]/g, "");
    const [min, max] = phoneLengths[input.country] ?? [6, 14];
    if (!country) errors.phone = "Please select a country code.";
    else if (!/^\d+$/.test(digits)) errors.phone = "Phone number can only contain digits.";
    else if (digits.length < min || digits.length > max) {
      errors.phone = `Please enter a valid ${country.name} phone number${min === max ? ` (${min} digits)` : ""}.`;
    } else if (input.country === "ES" && !/^[6-9]/.test(digits)) {
      errors.phone = "Please enter a valid Spanish phone number.";
    }
  }

  if (!subject) errors.subject = "Please enter a subject.";
  else if (subject.length > limits.subject) errors.subject = `Subject must be ${limits.subject} characters or fewer.`;

  if (!message) errors.message = "Please tell us how we can help.";
  else if (message.length > limits.message) errors.message = `Message must be ${limits.message} characters or fewer.`;

  return errors;
}

export function classifyEnquiry(subject: string): EnquiryKind {
  const text = subject.toLowerCase();
  if (/partner|collab|sponsor|brand|invest|business|b2b/.test(text)) return "partnership";
  if (/press|media|journalist|interview/.test(text)) return "press";
  if (/support|help|issue|problem|bug|account|billing|refund|cancel|subscription|payment/.test(text)) return "support";
  return "general";
}

export const confirmations: Record<EnquiryKind, string> = {
  general: "Thanks for reaching out. We’ve received your message and will get back to you shortly.",
  partnership: "Thanks for getting in touch. We’ve received your partnership enquiry and will be in touch shortly.",
  press: "Thanks for your interest in Turó. We’ve received your media enquiry and will respond shortly.",
  support: "Thanks for letting us know. We’ve received your request and our team will get back to you as soon as possible.",
};
