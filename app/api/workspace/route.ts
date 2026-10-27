import { confirmationEmail, notificationRecipient, sendEmail } from "../../lib/mail";

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
    return Response.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  const input = {
    name: oneLine(clean(body.name)),
    company: oneLine(clean(body.company)),
    email: clean(body.email),
    companySize: oneLine(clean(body.companySize)),
    message: clean(body.message),
  };
  if (
    !input.name || !input.company || !input.companySize || !input.message ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.email) ||
    input.name.length > 120 || input.company.length > 160 || input.message.length > 5000
  ) {
    return Response.json({ error: "Please check the form and try again." }, { status: 422 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[workspace] RESEND_API_KEY is not configured; enquiry was not sent.");
    return Response.json({ error: "This form is temporarily unavailable." }, { status: 503 });
  }

  const text = `${input.message}\n\n—\nName: ${input.name}\nCompany: ${input.company}\nEmail: ${input.email}\nCompany size: ${input.companySize}`;
  const html = `<p style="white-space:pre-wrap">${escapeHtml(input.message)}</p><hr><p>Name: ${escapeHtml(input.name)}<br>Company: ${escapeHtml(input.company)}<br>Email: ${escapeHtml(input.email)}<br>Company size: ${escapeHtml(input.companySize)}</p>`;

  try {
    await sendEmail({
      to: notificationRecipient(),
      replyTo: input.email,
      subject: `[workspace] ${input.company} — ${input.name}`,
      text,
      html,
    });
  } catch (error) {
    console.error("[workspace] email request failed", error);
    return Response.json({ error: "We couldn’t send your request." }, { status: 502 });
  }

  try {
    await sendEmail({ to: input.email, ...confirmationEmail("workspace", input.name) });
  } catch (error) {
    console.error("[workspace] confirmation email failed", error);
  }

  return Response.json({ ok: true });
}
