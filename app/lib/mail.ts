function requiredEnv(name: "CONTACT_FROM_EMAIL" | "CONTACT_TO_EMAIL") {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

export const notificationRecipient = () => requiredEnv("CONTACT_TO_EMAIL");

type Message = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, text, replyTo }: Message) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from: requiredEnv("CONTACT_FROM_EMAIL"), to: [to], reply_to: replyTo, subject, text, html }),
  });
  if (!response.ok) {
    throw new Error(`Email provider error ${response.status}: ${await response.text()}`);
  }
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);

export type ConfirmationVariant = "general" | "workspace";

const copy: Record<ConfirmationVariant, { subject: string; lines: string[] }> = {
  general: {
    subject: "We’ve received your message",
    lines: [
      "Thanks for getting in touch with Turó.",
      "We’ve received your message and someone from our team will get back to you shortly.",
    ],
  },
  workspace: {
    subject: "We’ve received your Turó Workspace enquiry",
    lines: [
      "Thanks for reaching out to Turó Workspace.",
      "We’ve received your enquiry and our team will review your message. We’ll get back to you shortly.",
    ],
  },
};

const siteUrl = () => (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.clubturo.com").replace(/\/$/, "");

const BACKGROUND = "#0D0E0D";
const TEXT = "#F2EFE6";
const MUTED = "#8A8C85";
const FONT = "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export function confirmationEmail(variant: ConfirmationVariant, name: string) {
  const { subject, lines } = copy[variant];
  const greeting = `Hi, ${name}`;
  const body = `font-family:${FONT};font-size:16px;line-height:26px;font-weight:400;color:${TEXT};margin:0;`;
  const paragraph = (value: string) => `<p style="${body}padding:0 0 22px 0;">${escapeHtml(value)}</p>`;
  const logo = `${siteUrl()}/Images/turo-lockup-dark.PNG`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="supported-color-schemes" content="dark">
<title>${escapeHtml(subject)}</title>
<style>
  @media only screen and (max-width: 620px) {
    .turo-pad { padding-left: 24px !important; padding-right: 24px !important; }
    .turo-logo { width: 104px !important; height: auto !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${BACKGROUND};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${BACKGROUND}" style="background-color:${BACKGROUND};">
  <tr>
    <td align="center" style="background-color:${BACKGROUND};">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
        <tr>
          <td class="turo-pad" align="right" style="padding:20px 28px 0 36px;">
            <img class="turo-logo" src="${logo}" width="120" height="60" alt="Turó" style="display:block;border:0;outline:none;text-decoration:none;width:120px;height:auto;">
          </td>
        </tr>
        <tr>
          <td class="turo-pad" align="left" style="padding:48px 36px 0 36px;">
            ${paragraph(greeting)}
            ${lines.map(paragraph).join("\n            ")}
            <p style="${body}padding:12px 0 0 0;">Best,</p>
            <p style="${body}padding:0 0 56px 0;">Turó</p>
          </td>
        </tr>
        <tr>
          <td class="turo-pad" style="padding:0 36px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr><td height="1" style="height:1px;line-height:1px;font-size:1px;background-color:#2A2C29;">&nbsp;</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td class="turo-pad" align="left" style="padding:22px 36px 40px 36px;font-family:${FONT};font-size:12px;line-height:18px;color:${MUTED};">
            © 2026 TURO BCN S.L.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;

  const text = [greeting, "", ...lines.flatMap((line) => [line, ""]), "Best,", "Turó", "", "© 2026 TURO BCN S.L."].join("\n");
  return { subject, html, text };
}
