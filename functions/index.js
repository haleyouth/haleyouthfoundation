// Cloud Functions for Haleyouth Foundation.
// sendEmail: callable, admin-only. Sends a branded email to one recipient
// (single / test) or to many (broadcast), via the Brevo HTTP API.
//
// The Brevo API key is stored as a secret (BREVO_API_KEY), never in code or the
// client. Set it once with:  firebase functions:secrets:set BREVO_API_KEY
//
// The admin panel calls this signed-in. An anonymous visitor cannot invoke it.

import { onCall, HttpsError } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { initializeApp } from "firebase-admin/app";
import { renderEmail } from "./emailTemplate.js";

initializeApp();

const BREVO_API_KEY = defineSecret("BREVO_API_KEY");

// Sender identity. Domain verified in Brevo; replies go to the same inbox.
const FROM = { name: "Haleyouth Foundation", email: "info@haleyouthfoundation.org" };
const REPLY_TO = { email: "info@haleyouthfoundation.org", name: "Haleyouth Foundation" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RECIPIENTS = 500; // safety cap per broadcast call

function firstName(name) {
  return (name || "").toString().trim().split(/\s+/)[0] || "";
}

// Parse a free-text address list ("a@x.com, b@y.com; c@z.com") into the array
// shape Brevo expects, keeping only valid addresses.
function parseAddressList(raw) {
  if (!raw) return [];
  return String(raw)
    .split(/[,;]+/)
    .map((s) => s.trim())
    .filter((s) => EMAIL_RE.test(s))
    .map((email) => ({ email }));
}

// Send a single transactional email through Brevo. Returns {ok} or throws.
async function brevoSend({ apiKey, to, subject, html, text, cc, bcc }) {
  const ccList = parseAddressList(cc);
  const bccList = parseAddressList(bcc);
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      sender: FROM,
      replyTo: REPLY_TO,
      to: [{ email: to.email, ...(to.name ? { name: to.name } : {}) }],
      ...(ccList.length ? { cc: ccList } : {}),
      ...(bccList.length ? { bcc: bccList } : {}),
      subject,
      htmlContent: html,
      textContent: text,
    }),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    const err = new Error(`Brevo ${res.status}: ${detail}`);
    err.status = res.status;
    throw err;
  }
  return true;
}

export const sendEmail = onCall(
  { secrets: [BREVO_API_KEY], region: "us-central1", cors: true, invoker: "public", timeoutSeconds: 300, memory: "256MiB" },
  async (request) => {
    // 1. Require an authenticated caller (admin panel signs in with Firebase Auth).
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "You must be signed in to send email.");
    }

    const d = request.data || {};
    const subject = (d.subject || "").toString().trim();
    const body = (d.body || "").toString();
    const mode = (d.mode || "single").toString(); // "single" | "test" | "broadcast"

    if (!subject || !body.trim()) {
      throw new HttpsError("invalid-argument", "Subject and message are both required.");
    }

    // Shared design fields, applied to every recipient.
    const design = {
      subject,
      body,
      greetingTemplate: (d.greetingTemplate || "Dear {name},").toString(),
      heading: (d.heading || "").toString(),
      signName: (d.signName || "").toString(),
      signTitle: (d.signTitle || "").toString(),
      ctaLabel: (d.ctaLabel || "").toString(),
      ctaUrl: (d.ctaUrl || "").toString(),
    };

    // Optional Cc / Bcc, applied to every send in this call.
    const cc = (d.cc || "").toString();
    const bcc = (d.bcc || "").toString();

    const apiKey = BREVO_API_KEY.value();

    // ---- Broadcast: many recipients ----
    if (mode === "broadcast") {
      const recipients = Array.isArray(d.recipients) ? d.recipients : [];
      const clean = recipients
        .map((r) => ({ email: (r.email || "").toString().trim(), name: (r.name || "").toString().trim() }))
        .filter((r) => EMAIL_RE.test(r.email));
      // de-duplicate by email
      const seen = new Set();
      const unique = clean.filter((r) => {
        const k = r.email.toLowerCase();
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
      if (unique.length === 0) {
        throw new HttpsError("invalid-argument", "No valid recipient addresses were provided.");
      }
      if (unique.length > MAX_RECIPIENTS) {
        throw new HttpsError("invalid-argument", `Too many recipients (${unique.length}). Max ${MAX_RECIPIENTS} per broadcast.`);
      }

      let sent = 0;
      const failed = [];
      for (const r of unique) {
        try {
          const html = renderEmail({ ...design, greetingName: firstName(r.name) });
          await brevoSend({ apiKey, to: r, subject, html, text: body, cc, bcc });
          sent++;
        } catch (err) {
          console.error("Broadcast send failed for", r.email, err.message);
          failed.push(r.email);
        }
      }
      return { ok: true, mode: "broadcast", total: unique.length, sent, failed };
    }

    // ---- Single / test: one recipient ----
    const to = (d.to || "").toString().trim();
    if (!EMAIL_RE.test(to)) {
      throw new HttpsError("invalid-argument", "Recipient email address is not valid.");
    }
    const name = (d.name || "").toString().trim();
    const html = renderEmail({ ...design, greetingName: firstName(name) });

    try {
      // Do not put a name in the To header; the address alone is correct and
      // avoids showing a sample/placeholder name as the recipient.
      await brevoSend({ apiKey, to: { email: to }, subject, html, text: body, cc, bcc });
    } catch (err) {
      console.error("Send failed:", err.message);
      throw new HttpsError("internal", `Email service error. ${err.message}`);
    }
    return { ok: true, mode, sent: 1 };
  }
);

// Render-only preview: returns the branded HTML without sending, so the admin
// panel can show an accurate preview of what recipients will receive.
export const previewEmail = onCall(
  { region: "us-central1", cors: true, invoker: "public" },
  async (request) => {
    if (!request.auth) {
      throw new HttpsError("unauthenticated", "You must be signed in.");
    }
    const d = request.data || {};
    return {
      html: renderEmail({
        subject: (d.subject || "").toString(),
        body: (d.body || "").toString(),
        greetingName: firstName((d.sampleName || "").toString()),
        greetingTemplate: (d.greetingTemplate || "Dear {name},").toString(),
        heading: (d.heading || "").toString(),
        signName: (d.signName || "").toString(),
        signTitle: (d.signTitle || "").toString(),
        ctaLabel: (d.ctaLabel || "").toString(),
        ctaUrl: (d.ctaUrl || "").toString(),
      }),
    };
  }
);
