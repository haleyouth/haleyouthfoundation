"use client";

import { useState, useEffect, useCallback } from "react";
import {
  fetchSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
  type ContactSubmission,
  type VolunteerSubmission,
  type PartnerSubmission,
  type NewsletterSubscription,
} from "@/lib/submissions";
import { Mail, Users, Handshake, Newspaper, Eye, Trash2, RefreshCw, Loader2, ChevronDown, ExternalLink, Clock } from "lucide-react";

const tabs = [
  { key: "contact", label: "Contact Messages", icon: Mail, collection: "submissions_contact" },
  { key: "volunteer", label: "Volunteer Apps", icon: Users, collection: "submissions_volunteer" },
  { key: "partnership", label: "Partnership", icon: Handshake, collection: "submissions_partner" },
  { key: "newsletter", label: "Newsletter", icon: Newspaper, collection: "submissions_newsletter" },
];

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  reviewed: "bg-yellow-100 text-yellow-700",
  responded: "bg-green-100 text-green-700",
  accepted: "bg-green-100 text-green-700",
  declined: "bg-red-100 text-red-700",
  archived: "bg-gray-100 text-gray-500",
};

const statusOptions: Record<string, string[]> = {
  contact: ["new", "reviewed", "responded", "archived"],
  volunteer: ["new", "reviewed", "accepted", "declined"],
  partnership: ["new", "reviewed", "accepted", "declined"],
};

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

  const items = (data[activeTab] || []) as Record<string, unknown>[];

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
                      {activeTab === "partnership" && (item as unknown as PartnerSubmission).orgName}
                      {activeTab === "newsletter" && (item as unknown as NewsletterSubscription).email}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {(item.email as string) || ""}
                      {activeTab === "contact" && ` — ${(item as unknown as ContactSubmission).subject}`}
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
                      <div className="ml-auto">
                        {(item.email as string) && (
                          <a
                            href={`mailto:${item.email as string}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors mr-2"
                          >
                            <ExternalLink size={11} /> Reply
                          </a>
                        )}
                        <button
                          onClick={() => handleDelete(id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={11} /> Delete
                        </button>
                      </div>
                    </div>
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
