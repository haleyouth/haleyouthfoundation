"use client";

import { useState, useMemo } from "react";
import { broadcastEmail, sendTestEmail, type EmailRecipient } from "@/lib/submissions";
import EmailWysiwyg, { type EmailFields } from "./EmailWysiwyg";
import {
  Megaphone, Send, FlaskConical, Loader2, CheckCircle2,
  AlertTriangle, ChevronDown, Users, Eye, EyeOff,
} from "lucide-react";

interface Props {
  audienceLabel: string;
  recipients: EmailRecipient[];
}

const DEFAULTS: EmailFields = {
  subject: "",
  heading: "",
  greetingTemplate: "Dear {name},",
  body: "",
  ctaLabel: "",
  ctaUrl: "",
  signName: "Haleyouth Foundation",
  signTitle: "Okene, Kogi State, Nigeria",
};

export default function BroadcastPanel({ audienceLabel, recipients }: Props) {
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<EmailFields>(DEFAULTS);
  const [showPreview, setShowPreview] = useState(false);

  const patch = (p: Partial<EmailFields>) => setFields((f) => ({ ...f, ...p }));

  // Recipients (default all selected)
  const allEmails = useMemo(() => recipients.filter((r) => r.email).map((r) => r.email), [recipients]);
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const [listOpen, setListOpen] = useState(true);
  const selected = useMemo(
    () => recipients.filter((r) => r.email && !excluded.has(r.email)),
    [recipients, excluded]
  );

  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [testTo, setTestTo] = useState("");
  const [testing, setTesting] = useState(false);
  const [testDone, setTestDone] = useState(false);
  const [broadcasting, setBroadcasting] = useState(false);
  const [result, setResult] = useState<{ sent: number; total: number; failed: string[] } | null>(null);
  const [error, setError] = useState("");

  const reset = () => { setError(""); setTestDone(false); setResult(null); };

  const toggle = (email: string) =>
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email); else next.add(email);
      return next;
    });
  const selectAll = () => setExcluded(new Set());
  const clearAll = () => setExcluded(new Set(allEmails));

  const designPayload = () => ({
    subject: fields.subject,
    body: fields.body,
    greetingTemplate: fields.greetingTemplate,
    heading: fields.heading,
    signName: fields.signName,
    signTitle: fields.signTitle,
    ctaLabel: fields.ctaLabel,
    ctaUrl: fields.ctaUrl,
    cc: cc.trim() || undefined,
    bcc: bcc.trim() || undefined,
  });

  const valid = () => {
    if (!fields.subject.trim()) { setError("Enter a subject line (in the send bar below)."); return false; }
    if (!fields.body.trim()) { setError("Write a message in the email body."); return false; }
    if (fields.ctaLabel.trim() && !/^https?:\/\//.test(fields.ctaUrl.trim())) {
      setError("The button needs a valid https:// link, or clear the button label."); return false;
    }
    return true;
  };

  const errMsg = (e: unknown, fallback: string) => {
    const m = e && typeof e === "object" && "message" in e ? String((e as { message: unknown }).message) : "";
    return m ? `${fallback} (${m})` : fallback;
  };

  const handleTest = async () => {
    reset();
    if (!valid()) return;
    if (!testTo.trim()) { setError("Enter a test recipient address."); return; }
    setTesting(true);
    try {
      await sendTestEmail({ to: testTo.trim(), name: "Amina", ...designPayload() });
      setTestDone(true);
    } catch (e) {
      console.error(e);
      setError(errMsg(e, "Test send failed."));
    } finally {
      setTesting(false);
    }
  };

  const handleBroadcast = async () => {
    reset();
    if (!valid()) return;
    if (selected.length === 0) { setError("No recipients selected."); return; }
    if (!confirm(`Send this email to ${selected.length} selected ${audienceLabel} recipient(s)? This cannot be undone.`)) return;
    setBroadcasting(true);
    try {
      const res = await broadcastEmail({ recipients: selected, ...designPayload() });
      setResult({ sent: res.sent, total: res.total ?? selected.length, failed: res.failed ?? [] });
    } catch (e) {
      console.error(e);
      setError(errMsg(e, "Broadcast failed."));
    } finally {
      setBroadcasting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary">
          <Megaphone size={17} />
        </span>
        <div className="flex-1">
          <p className="font-semibold text-gray-900 text-sm">Compose &amp; broadcast email</p>
          <p className="text-gray-400 text-xs">
            Branded email to {audienceLabel} — {selected.length} of {allEmails.length} selected
          </p>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="border-t border-gray-100 p-5 bg-gray-50/50 space-y-4">
          {/* 1. Recipients */}
          <div className="border border-gray-200 rounded-lg bg-white">
            <button onClick={() => setListOpen((o) => !o)} className="w-full flex items-center gap-2 px-3 py-2.5 text-left">
              <Users size={15} className="text-primary" />
              <span className="text-sm font-medium text-gray-700 flex-1">
                Recipients — {selected.length} selected{excluded.size > 0 ? `, ${excluded.size} exempted` : ""}
              </span>
              <ChevronDown size={15} className={`text-gray-400 transition-transform ${listOpen ? "rotate-180" : ""}`} />
            </button>
            {listOpen && (
              <div className="border-t border-gray-100">
                <div className="flex items-center gap-3 px-3 py-2 bg-gray-50 text-xs">
                  <button onClick={selectAll} className="text-primary font-medium hover:underline">Select all</button>
                  <button onClick={clearAll} className="text-gray-500 font-medium hover:underline">Clear all</button>
                  <span className="ml-auto text-gray-400">{allEmails.length} total</span>
                </div>
                <div className="max-h-52 overflow-y-auto divide-y divide-gray-50">
                  {recipients.filter((r) => r.email).map((r) => (
                    <label key={r.email} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                      <input type="checkbox" checked={!excluded.has(r.email)} onChange={() => toggle(r.email)} className="w-4 h-4 accent-primary" />
                      <span className="text-sm text-gray-800 flex-1 truncate">{r.name || "—"}</span>
                      <span className="text-xs text-gray-400 truncate">{r.email}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 2. Show / hide the editable email preview */}
          <button
            onClick={() => setShowPreview((s) => !s)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            {showPreview ? <EyeOff size={15} /> : <Eye size={15} />}
            {showPreview ? "Hide email preview" : "Show email preview"}
          </button>

          {/* 3. Editable branded email */}
          {showPreview && (
            <>
              <p className="text-[11px] text-gray-400">
                Click any highlighted area in the email to edit it — heading, greeting, message, button, and sign-off. The logo, ribbon, and footer are fixed.
              </p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <EmailWysiwyg value={fields} onChange={patch} sampleName="Amina" />
              </div>

              {/* 4. Send bar: subject + test + broadcast */}
              <div className="border border-gray-200 rounded-xl bg-white p-4 space-y-3">
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wider">Subject line *</label>
                  <input
                    value={fields.subject}
                    onChange={(e) => patch({ subject: e.target.value })}
                    placeholder="e.g. Your AI Foundation training — next steps"
                    className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Cc (optional)</label>
                    <input
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      placeholder="name@example.com, other@example.com"
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wider">Bcc (optional)</label>
                    <input
                      value={bcc}
                      onChange={(e) => setBcc(e.target.value)}
                      placeholder="hidden@example.com"
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-1.5">
                  Note: on a broadcast, any Cc/Bcc address is copied on <strong>every</strong> individual email sent. Use Bcc for a single archive address, not a list.
                </p>

                {error && (
                  <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    <AlertTriangle size={14} /> {error}
                  </div>
                )}
                {testDone && (
                  <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                    <CheckCircle2 size={14} /> Test sent to {testTo}. Check the inbox (and spam) to confirm.
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="flex items-center gap-2">
                    <FlaskConical size={14} className="text-gray-400" />
                    <input
                      type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)}
                      placeholder="test@address.com"
                      className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 w-48"
                    />
                    <button onClick={handleTest} disabled={testing}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50">
                      {testing ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />} Send test
                    </button>
                  </div>

                  <button onClick={handleBroadcast} disabled={broadcasting || selected.length === 0}
                    className="ml-auto inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50">
                    {broadcasting ? <Loader2 size={15} className="animate-spin" /> : <Megaphone size={15} />}
                    {broadcasting ? "Sending…" : `Send broadcast (${selected.length})`}
                  </button>
                </div>
                <p className="text-[11px] text-gray-400">
                  Sends from info@haleyouthfoundation.org. Each person gets their own copy; recipients never see each other.
                </p>

                {result && (
                  <div className={`flex items-start gap-2 text-xs rounded-lg px-3 py-2 border ${
                    result.failed.length ? "text-amber-700 bg-amber-50 border-amber-100" : "text-green-700 bg-green-50 border-green-100"}`}>
                    {result.failed.length ? <AlertTriangle size={14} className="mt-0.5" /> : <CheckCircle2 size={14} className="mt-0.5" />}
                    <div>
                      Sent {result.sent} of {result.total}.
                      {result.failed.length > 0 && <> {result.failed.length} failed: {result.failed.slice(0, 5).join(", ")}{result.failed.length > 5 ? "…" : ""}.</>}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
