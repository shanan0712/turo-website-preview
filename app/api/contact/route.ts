import { countries } from "../../contact/countries";
import { classifyEnquiry, validateContact, type ContactInput } from "../../contact/validation";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const clean = (value: unknown) => (typeof value === "string" ? value.replace(/\r/g, "").trim() : "");
const oneLine = (value: string) => value.replace(/\s+/g, " ");
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const input: ContactInput = {
    name: oneLine(clean(body.name)),
    email: clean(body.email),
    country: clean(body.country),
    phone: clean(body.phone),
    subject: oneLine(clean(body.subject)),
    message: clean(body.message),
  };

  const errors = validateContact(input);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured; enquiry was not sent.");
    return Response.json({ error: "Our contact form is temporarily unavailable." }, { status: 503 });
  }

  const kind = classifyEnquiry(input.subject);
  const dial = countries.find((item) => item.code === input.country)?.dial ?? "";
  const phone = input.phone ? `${dial} ${input.phone}` : "Not provided";
  const text = `${input.message}\n\n—\nName: ${input.name}\nEmail: ${input.email}\nPhone: ${phone}\nType: ${kind}`;
  const html = `<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p><hr><p>Name: ${escapeHtml(input.name)}<br>Email: ${escapeHtml(input.email)}<br>Phone: ${escapeHtml(phone)}<br>Type: ${kind}</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Turó Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? "info@clubturo.com"],
        reply_to: input.email,
        subject: `[${kind}] ${input.subject}`,
        text,
        html,
      }),
    });
    if (!response.ok) {
      console.error("[contact] email provider error", response.status, await response.text());
      return Response.json({ error: "We couldn’t send your message." }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] email request failed", error);
    return Response.json({ error: "We couldn’t send your message." }, { status: 502 });
  }

  return Response.json({ ok: true, kind });
}
