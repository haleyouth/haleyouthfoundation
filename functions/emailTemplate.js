// Branded HTML email template for Haleyouth Foundation.
// Table-based layout with inline styles, the only reliable approach across email
// clients (Gmail, Outlook, Apple Mail). The logo loads from its public https URL.

const BRAND = {
  green: "#0B4D2C",
  greenMid: "#1B7A3E",
  gold: "#D4A017",
  goldLite: "#F4E7B8",
  paper: "#FAF7EC",
  ink: "#0F2A1B",
  muted: "#4A5C50",
};

const LOGO_URL = "https://haleyouthfoundation.org/images/logo_l.png";
const SITE_URL = "https://haleyouthfoundation.org";

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Convert the admin's lightly-formatted plain text into safe email HTML.
// Supported: blank line => new paragraph; single newline => <br>;
// **bold**; [text](https://url) links. Everything else is escaped.
function bodyToHtml(body) {
  const paras = String(body).replace(/\r\n/g, "\n").split(/\n{2,}/);
  return paras
    .map((para) => {
      let html = escapeHtml(para);
      // links [text](url) — url validated to http(s) only
      html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_m, text, url) => {
        return `<a href="${url}" style="color:${BRAND.greenMid};text-decoration:underline;">${text}</a>`;
      });
      // bold **text**
      html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      // single newlines within a paragraph => <br>
      html = html.replace(/\n/g, "<br>");
      return `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${BRAND.ink};">${html}</p>`;
    })
    .join("");
}

/**
 * Render a full branded HTML email.
 * @param {object} o
 * @param {string}  o.subject       subject line (also the hidden preheader)
 * @param {string}  o.body          admin body text (supports **bold**, links, blank-line paragraphs)
 * @param {string} [o.greetingName] first name for the greeting line (broadcast personalises per recipient)
 * @param {string} [o.greetingTemplate] e.g. "Dear {name}," — {name} replaced; used only when greetingName present
 * @param {string} [o.heading]      optional heading under the logo
 * @param {string} [o.signName]     sign-off name (default: Haleyouth Foundation)
 * @param {string} [o.signTitle]    sign-off line under the name (default: Okene, Kogi State, Nigeria)
 * @param {string} [o.ctaLabel]     optional call-to-action button label
 * @param {string} [o.ctaUrl]       optional call-to-action button URL (http/https)
 * @returns {string} full HTML document
 */
export function renderEmail({
  subject,
  body,
  greetingName,
  greetingTemplate,
  heading,
  signName,
  signTitle,
  ctaLabel,
  ctaUrl,
}) {
  const bodyHtml = bodyToHtml(body);

  let greeting = "";
  if (greetingName) {
    const tmpl = greetingTemplate && greetingTemplate.includes("{name}") ? greetingTemplate : "Dear {name},";
    const line = escapeHtml(tmpl).replace("{name}", `<strong>${escapeHtml(greetingName)}</strong>`);
    greeting = `<p style="margin:0 0 16px;font-size:16px;color:${BRAND.ink};">${line}</p>`;
  } else if (greetingTemplate && !greetingTemplate.includes("{name}")) {
    greeting = `<p style="margin:0 0 16px;font-size:16px;color:${BRAND.ink};">${escapeHtml(greetingTemplate)}</p>`;
  }

  const headingHtml = heading
    ? `<tr><td align="center" style="padding:4px 32px 0;"><h1 style="margin:8px 0 0;font-size:20px;color:${BRAND.green};font-family:Georgia,'Times New Roman',serif;">${escapeHtml(heading)}</h1></td></tr>`
    : "";

  const validCta = ctaLabel && ctaUrl && /^https?:\/\//.test(ctaUrl);
  const ctaHtml = validCta
    ? `<tr><td align="center" style="padding:8px 32px 20px;">
         <a href="${escapeHtml(ctaUrl)}" style="display:inline-block;background:${BRAND.green};color:#ffffff;text-decoration:none;font-size:15px;font-weight:bold;padding:12px 28px;border-radius:8px;">${escapeHtml(ctaLabel)}</a>
       </td></tr>`
    : "";

  const sName = signName ? escapeHtml(signName) : "Haleyouth Foundation";
  const sTitle = signTitle ? escapeHtml(signTitle) : "Okene, Kogi State, Nigeria";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light">
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:${BRAND.paper};font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(subject)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.paper};padding:24px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.06);">

          <tr><td style="background:${BRAND.green};height:6px;line-height:6px;font-size:6px;">&nbsp;</td></tr>
          <tr><td style="background:${BRAND.gold};height:3px;line-height:3px;font-size:3px;">&nbsp;</td></tr>

          <tr>
            <td align="center" style="padding:28px 32px 8px;">
              <img src="${LOGO_URL}" alt="Haleyouth Foundation" width="180" style="display:block;width:180px;max-width:180px;height:auto;border:0;">
            </td>
          </tr>
          <tr>
            <td align="center" style="padding:0 32px 4px;">
              <p style="margin:0;font-size:12px;letter-spacing:0.5px;color:${BRAND.muted};font-style:italic;">Empowering Youth &bull; Strengthening Communities</p>
            </td>
          </tr>
          ${headingHtml}
          <tr><td style="padding:12px 32px 0;"><div style="border-top:1px solid ${BRAND.goldLite};"></div></td></tr>

          <tr>
            <td style="padding:22px 32px 4px;">
              ${greeting}
              ${bodyHtml}
            </td>
          </tr>
          ${ctaHtml}

          <tr>
            <td style="padding:8px 32px 28px;">
              <p style="margin:0;font-size:15px;color:${BRAND.ink};">Warm regards,</p>
              <p style="margin:4px 0 0;font-size:15px;font-weight:bold;color:${BRAND.green};">${sName}</p>
              <p style="margin:2px 0 0;font-size:13px;color:${BRAND.muted};">${sTitle}</p>
            </td>
          </tr>

          <tr>
            <td style="background:${BRAND.green};padding:20px 32px;">
              <p style="margin:0;font-size:12px;color:${BRAND.goldLite};line-height:1.6;">
                <strong style="color:#ffffff;">Haleyouth Foundation</strong><br>
                A registered Nigerian non-profit (CAC/IT/NO 138260)<br>
                <a href="mailto:info@haleyouthfoundation.org" style="color:${BRAND.goldLite};text-decoration:underline;">info@haleyouthfoundation.org</a>
                &nbsp;&bull;&nbsp;
                <a href="${SITE_URL}" style="color:${BRAND.goldLite};text-decoration:underline;">haleyouthfoundation.org</a>
              </p>
            </td>
          </tr>

        </table>
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;">
          <tr>
            <td align="center" style="padding:16px 32px;">
              <p style="margin:0;font-size:11px;color:${BRAND.muted};">You received this email because you signed up or corresponded with Haleyouth Foundation.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
