"use client";

/**
 * WYSIWYG email editor: renders the Haleyouth branded email layout as real DOM,
 * with the editable regions (heading, greeting, body, button, sign-off) edited
 * inline, in place. Fixed chrome (logo, ribbon, footer) is not editable.
 *
 * The values live in the parent (BroadcastPanel) so they can be sent to the
 * server, which renders the SAME template for the actual email. This component
 * mirrors functions/emailTemplate.js visually.
 */

const BRAND = {
  green: "#0B4D2C",
  gold: "#D4A017",
  goldLite: "#F4E7B8",
  paper: "#FAF7EC",
  ink: "#0F2A1B",
  muted: "#4A5C50",
};
const LOGO_URL = "https://haleyouthfoundation.org/images/logo_l.png";

export interface EmailFields {
  subject: string;
  heading: string;
  greetingTemplate: string;
  body: string;
  ctaLabel: string;
  ctaUrl: string;
  signName: string;
  signTitle: string;
}

interface Props {
  value: EmailFields;
  onChange: (patch: Partial<EmailFields>) => void;
  /** Sample first name used in the greeting preview. */
  sampleName?: string;
}

// A minimal inline-editable text region styled to sit invisibly on the email.
function Editable({
  value,
  onChange,
  placeholder,
  multiline,
  style,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  multiline?: boolean;
  style?: React.CSSProperties;
  ariaLabel: string;
}) {
  const shared: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "1px dashed transparent",
    borderRadius: 6,
    padding: "2px 4px",
    margin: "-2px -4px",
    font: "inherit",
    color: "inherit",
    outline: "none",
    resize: multiline ? "vertical" : "none",
    ...style,
  };
  const onFocus = (e: React.FocusEvent<HTMLElement>) => { e.currentTarget.style.borderColor = BRAND.gold; e.currentTarget.style.background = "#fffdf5"; };
  const onBlur = (e: React.FocusEvent<HTMLElement>) => { e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.background = "transparent"; };

  if (multiline) {
    return (
      <textarea
        aria-label={ariaLabel}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        rows={Math.max(4, value.split("\n").length + 1)}
        style={shared}
      />
    );
  }
  return (
    <input
      aria-label={ariaLabel}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      style={shared}
    />
  );
}

export default function EmailWysiwyg({ value, onChange, sampleName = "Amina" }: Props) {
  const greetingShown = (value.greetingTemplate || "Dear {name},").replace("{name}", sampleName);

  return (
    <div style={{ background: BRAND.paper, padding: "20px 0" }}>
      <div style={{ maxWidth: 600, margin: "0 auto", background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.08)", fontFamily: "Arial, Helvetica, sans-serif" }}>
        {/* ribbon */}
        <div style={{ height: 6, background: BRAND.green }} />
        <div style={{ height: 3, background: BRAND.gold }} />

        {/* logo + tagline (fixed) */}
        <div style={{ textAlign: "center", padding: "26px 32px 4px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_URL} alt="Haleyouth Foundation" width={180} style={{ display: "inline-block", width: 180, height: "auto" }} />
        </div>
        <div style={{ textAlign: "center", padding: "0 32px 4px" }}>
          <p style={{ margin: 0, fontSize: 12, letterSpacing: 0.5, color: BRAND.muted, fontStyle: "italic" }}>
            Empowering Youth • Strengthening Communities
          </p>
        </div>

        {/* heading (editable) */}
        <div style={{ textAlign: "center", padding: "6px 32px 0" }}>
          <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 20, color: BRAND.green, fontWeight: "bold" }}>
            <Editable ariaLabel="Heading" value={value.heading} onChange={(v) => onChange({ heading: v })}
              placeholder="Heading (optional)" style={{ textAlign: "center", fontWeight: "bold" }} />
          </div>
        </div>
        <div style={{ padding: "12px 32px 0" }}><div style={{ borderTop: `1px solid ${BRAND.goldLite}` }} /></div>

        {/* greeting + body (editable) */}
        <div style={{ padding: "18px 32px 4px" }}>
          <div style={{ fontSize: 16, color: BRAND.ink, marginBottom: 12 }}>
            <Editable ariaLabel="Greeting" value={value.greetingTemplate} onChange={(v) => onChange({ greetingTemplate: v })}
              placeholder="Dear {name}," />
            <p style={{ margin: "2px 4px 0", fontSize: 11, color: BRAND.muted, fontStyle: "italic" }}>
              Preview: {greetingShown} &nbsp;·&nbsp; {"{name}"} = each recipient&apos;s first name
            </p>
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.6, color: BRAND.ink }}>
            <Editable ariaLabel="Body" multiline value={value.body} onChange={(v) => onChange({ body: v })}
              placeholder={"Write your message.\n\nBlank line = new paragraph. **bold** and [text](https://link) supported."} />
          </div>
        </div>

        {/* CTA (editable label + url) */}
        <div style={{ textAlign: "center", padding: "10px 32px 18px" }}>
          <span style={{ display: "inline-block", background: value.ctaLabel ? BRAND.green : "#e5e7eb", color: value.ctaLabel ? "#fff" : "#9ca3af", borderRadius: 8, padding: "10px 22px", fontWeight: "bold", fontSize: 15 }}>
            <input aria-label="Button label" value={value.ctaLabel} placeholder="Button label (optional)"
              onChange={(e) => onChange({ ctaLabel: e.target.value })}
              style={{ background: "transparent", border: "none", outline: "none", color: "inherit", font: "inherit", textAlign: "center", width: Math.max(16, (value.ctaLabel || "Button label (optional)").length) * 8 }} />
          </span>
          <div style={{ marginTop: 6 }}>
            <input aria-label="Button link" value={value.ctaUrl} placeholder="https://link-for-the-button (optional)"
              onChange={(e) => onChange({ ctaUrl: e.target.value })}
              style={{ width: "80%", fontSize: 11, color: BRAND.muted, textAlign: "center", border: "1px dashed #e5e7eb", borderRadius: 6, padding: "3px 6px", outline: "none" }} />
          </div>
        </div>

        {/* sign-off (editable) */}
        <div style={{ padding: "4px 32px 24px" }}>
          <p style={{ margin: 0, fontSize: 15, color: BRAND.ink }}>Warm regards,</p>
          <div style={{ fontSize: 15, fontWeight: "bold", color: BRAND.green }}>
            <Editable ariaLabel="Sign-off name" value={value.signName} onChange={(v) => onChange({ signName: v })} placeholder="Haleyouth Foundation" style={{ fontWeight: "bold" }} />
          </div>
          <div style={{ fontSize: 13, color: BRAND.muted }}>
            <Editable ariaLabel="Sign-off line" value={value.signTitle} onChange={(v) => onChange({ signTitle: v })} placeholder="Okene, Kogi State, Nigeria" />
          </div>
        </div>

        {/* footer (fixed) */}
        <div style={{ background: BRAND.green, padding: "18px 32px" }}>
          <p style={{ margin: 0, fontSize: 12, color: BRAND.goldLite, lineHeight: 1.6 }}>
            <strong style={{ color: "#fff" }}>Haleyouth Foundation</strong><br />
            A registered Nigerian non-profit (CAC/IT/NO 138260)<br />
            info@haleyouthfoundation.org • haleyouthfoundation.org
          </p>
        </div>
      </div>
      <p style={{ maxWidth: 600, margin: "12px auto 0", textAlign: "center", fontSize: 11, color: BRAND.muted }}>
        You received this email because you signed up or corresponded with Haleyouth Foundation.
      </p>
    </div>
  );
}
