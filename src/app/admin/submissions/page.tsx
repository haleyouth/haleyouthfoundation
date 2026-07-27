"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  sendEmail,
  type ContactSubmission,
  type VolunteerSubmission,
  type PartnerSubmission,
  type NewsletterSubscription,
} from "@/lib/submissions";
import { Mail, Users, Handshake, Newspaper, GraduationCap, Trash2, RefreshCw, Loader2, ChevronDown, ExternalLink, Clock, Send, X, CheckCircle2 } from "lucide-react";
import BroadcastPanel from "./BroadcastPanel";

const tabs = [
  { key: "contact", label: "Contact Messages", icon: Mail, collection: "submissions_contact" },
  { key: "volunteer", label: "Volunteer Apps", icon: Users, collection: "submissions_volunteer" },
  { key: "skilltraining", label: "Skill Training", icon: GraduationCap, collection: "submissions_skilltraining" },
  { key: "stemforall", label: "STEM for All", icon: GraduationCap, collection: "submissions_stemforall" },
  { key: "partnership", label: "Partnership", icon: Handshake, collection: "submissions_partner" },
  { key: "newsletter", label: "Newsletter", icon: Newspaper, collection: "submissions_newsletter" },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-yellow-100 text-yellow-700",
  responded: "bg-green-100 text-green-700",
  accepted: "bg-green-100 text-green-700",
  shortlisted: "bg-purple-100 text-purple-700",
  enrolled: "bg-green-100 text-green-700",
  referred: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
  archived: "bg-gray-100 text-gray-500",
};

const statusOptions: Record<string, string[]> = {
  contact: ["new", "reviewed", "responded", "archived"],
  volunteer: ["new", "reviewed", "accepted", "declined"],
  skilltraining: ["new", "reviewed", "shortlisted", "referred", "declined"],
  stemforall: ["new", "reviewed", "shortlisted", "enrolled", "declined"],
  partnership: ["new", "reviewed", "accepted", "declined"],
};

function ageFromDob(dob: string): string {
  if (!dob) return "";
  const b = new Date(dob);
  if (isNaN(b.getTime())) return "";
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
  return age >= 0 && age < 130 ? String(age) : "";
}

function formatDate(ts: { seconds: number } | null) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminSubmissionsPage() {
  const [activeTab, setActiveTab] = useState("contact");
  const [data, setData] = useState<Record<string, unknown[]>>({});
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Email composer state (keyed to the submission being emailed)
  const [composeId, setComposeId] = useState<string | null>(null);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sentId, setSentId] = useState<string | null>(null);
  const [composeError, setComposeError] = useState("");

  const activeCollection = tabs.find((t) => t.key === activeTab)!.collection;

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const results: Record<string, unknown[]> = {};
      const newCounts: Record<string, number> = {};
      for (const tab of tabs) {
        const items = await fetchSubmissions(tab.collection);
        results[tab.key] = items;
        newCounts[tab.key] = items.filter((i: Record<string, unknown>) => i.status === "new").length;
      }
      setData(results);
      setCounts(newCounts);
    } catch (err) {
      console.error("Failed to load submissions:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  const handleStatusChange = async (docId: string, newStatus: string) => {
    await updateSubmissionStatus(activeCollection, docId, newStatus);
    loadData();
  };

  const handleDelete = async (docId: string) => {
    if (confirm("Delete this submission permanently?")) {
      await deleteSubmission(activeCollection, docId);
      loadData();
    }
  };

  const openCompose = (docId: string, email: string, name: string) => {
    setComposeId(docId);
    setComposeTo(email);
    setComposeSubject("");
    setComposeBody(name ? `Dear ${name.split(" ")[0]},\n\n` : "");
    setComposeError("");
    setSentId(null);
  };

  const closeCompose = () => {
    setComposeId(null);
    setSending(false);
    setComposeError("");
  };

  const handleSend = async () => {
    if (!composeTo || !composeSubject.trim() || !composeBody.trim()) {
      setComposeError("Recipient, subject, and message are all required.");
      return;
    }
    setSending(true);
    setComposeError("");
    try {
      await sendEmail({ to: composeTo, subject: composeSubject.trim(), body: composeBody });
      setSentId(composeId);
      setComposeId(null);
    } catch (err) {
      console.error("Failed to send email:", err);
      setComposeError("Could not send. Make sure you are signed in and try again.");
    } finally {
      setSending(false);
    }
  };

  const items = (data[activeTab] || []) as Record<string, unknown>[];

  // Recipients for the broadcast panel: everyone in the active tab with an email.
  const recipients = items
    .map((it) => ({
      email: (it.email as string) || "",
      name:
        (it.name as string) ||
        (it.contactName as string) ||
        (it.orgName as string) ||
        "",
    }))
    .filter((r) => r.email);

  const activeLabel = tabs.find((t) => t.key === activeTab)!.label;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Submissions</h2>
        <button
          onClick={loadData}
          disabled={loading}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-all disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => { setActiveTab(tab.key); setExpandedId(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-200"
            }`}
          >
            <tab.icon size={15} />
            {tab.label}
            {(counts[tab.key] || 0) > 0 && (
              <span className={`min-w-[20px] h-5 text-[10px] rounded-full flex items-center justify-center font-bold ${
                activeTab === tab.key ? "bg-white/20 text-white" : "bg-red-500 text-white"
              }`}>
                {counts[tab.key]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Broadcast tool for the active audience */}
      {!loading && recipients.length > 0 && (
        <BroadcastPanel audienceLabel={activeLabel} recipients={recipients} />
      )}

      {/* Content */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Loader2 size={24} className="animate-spin text-primary mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading submissions...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Mail size={36} className="text-gray-200 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-600 mb-1">No {activeTab} submissions yet</h3>
          <p className="text-gray-400 text-sm">Submissions from the website will appear here in real time.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const id = item.id as string;
            const isExpanded = expandedId === id;
            const status = (item.status as string) || "new";

            return (
              <div key={id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header row */}
                <button
                  onClick={() => setExpandedId(isExpanded ? null : id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">
                      {activeTab === "contact" && (item as unknown as ContactSubmission).name}
                      {activeTab === "volunteer" && (item as unknown as VolunteerSubmission).name}
                      {activeTab === "skilltraining" && (item.name as string)}
                      {activeTab === "stemforall" && (item.name as string)}
                      {activeTab === "partnership" && (item as unknown as PartnerSubmission).orgName}
                      {activeTab === "newsletter" && (item as unknown as NewsletterSubscription).email}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {(item.email as string) || ""}
                      {activeTab === "contact" && ` — ${(item as unknown as ContactSubmission).subject}`}
                      {activeTab === "skilltraining" && ` — ${(item.program as string) || ""}`}
                      {activeTab === "stemforall" && ` — ${(item.interests as string) || "STEM for All"}`}
                      {activeTab === "partnership" && ` — ${(item as unknown as PartnerSubmission).type}`}
                    </p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${statusColors[status] || statusColors.new}`}>
                    {status}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400 text-xs shrink-0">
                    <Clock size={11} />
                    {formatDate(item.createdAt as { seconds: number } | null)}
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {/* Expanded detail */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50/50">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm mb-5">
                      {ageFromDob((item.dob as string) || "") !== "" && (
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Age (calculated)</p>
                          <p className="text-gray-800 text-sm font-semibold">{ageFromDob((item.dob as string) || "")} years</p>
                        </div>
                      )}
                      {Object.entries(item).map(([key, val]) => {
                        if (["id", "status", "createdAt"].includes(key) || !val) return null;
                        return (
                          <div key={key}>
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">{key.replace(/([A-Z])/g, " $1").trim()}</p>
                            <p className="text-gray-800 text-sm whitespace-pre-wrap">{String(val)}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      {statusOptions[activeTab] && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Status:</span>
                          {statusOptions[activeTab].map((s) => (
                            <button
                              key={s}
                              onClick={() => handleStatusChange(id, s)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all ${
                                status === s
                                  ? statusColors[s]
                                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="ml-auto flex items-center gap-2">
                        {(item.email as string) && (
                          <>
                            <button
                              onClick={() =>
                                openCompose(
                                  id,
                                  item.email as string,
                                  (item.name as string) || ((item as unknown as ContactSubmission).name) || ""
                                )
                              }
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                            >
                              <Send size={11} /> Send email
                            </button>
                            <a
                              href={`mailto:${item.email as string}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                            >
                              <ExternalLink size={11} /> Open in mail app
                            </a>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                    </div>

                    {/* Sent confirmation */}
                    {sentId === id && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                        <CheckCircle2 size={14} /> Email queued and sent to {item.email as string}.
                      </div>
                    )}

                    {/* Inline email composer */}
                    {composeId === id && (
                      <div className="mt-4 border border-gray-200 rounded-xl bg-white p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                            <Send size={13} className="text-primary" /> Compose email
                          </p>
                          <button onClick={closeCompose} className="text-gray-400 hover:text-gray-600">
                            <X size={16} />
                          </button>
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wider">To</label>
                          <input
                            type="email"
                            value={composeTo}
                            onChange={(e) => setComposeTo(e.target.value)}
                            className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wider">Subject</label>
                          <input
                            type="text"
                            value={composeSubject}
                            onChange={(e) => setComposeSubject(e.target.value)}
                            placeholder="e.g. Your AI Foundation training application"
                            className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 uppercase tracking-wider">Message</label>
                          <textarea
                            value={composeBody}
                            onChange={(e) => setComposeBody(e.target.value)}
                            rows={8}
                            placeholder="Write your message. Line breaks are preserved."
                            className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 resize-y"
                          />
                        </div>
                        {composeError && (
                          <p className="text-xs text-red-600">{composeError}</p>
                        )}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={handleSend}
                            disabled={sending}
                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50"
                          >
                            {sending ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
                            {sending ? "Sending..." : "Send email"}
                          </button>
                          <button
                            onClick={closeCompose}
                            disabled={sending}
                            className="px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                        <p className="text-[11px] text-gray-400">
                          Sends from noreply@haleyouthfoundation.org via the Trigger Email extension. The recipient can reply to your address.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
