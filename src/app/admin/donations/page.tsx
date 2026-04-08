"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchSubmissions, updateSubmissionStatus, deleteSubmission, type DonationSubmission } from "@/lib/submissions";
import { DollarSign, TrendingUp, Users, Clock, RefreshCw, Loader2, Trash2, ChevronDown, ExternalLink, Heart, Filter } from "lucide-react";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

function formatDate(ts: { seconds: number } | null) {
  if (!ts) return "—";
  return new Date(ts.seconds * 1000).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<DonationSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchSubmissions<DonationSubmission>("submissions_donations");
      setDonations(data);
    } catch (err) {
      console.error("Failed to load donations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleStatus = async (id: string, status: string) => {
    await updateSubmissionStatus("submissions_donations", id, status);
    load();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this donation record permanently?")) {
      await deleteSubmission("submissions_donations", id);
      load();
    }
  };

  const filtered = filterStatus === "all" ? donations : donations.filter((d) => d.status === filterStatus);

  // Stats
  const totalUSD = donations.filter((d) => d.currency === "usd" && d.status !== "pending").reduce((s, d) => s + d.amount, 0);
  const totalNGN = donations.filter((d) => d.currency === "ngn" && d.status !== "pending").reduce((s, d) => s + d.amount, 0);
  const pendingCount = donations.filter((d) => d.status === "pending").length;
  const uniqueDonors = new Set(donations.map((d) => d.email)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Donations</h2>
        <button onClick={load} disabled={loading} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-all disabled:opacity-50">
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Confirmed (USD)", value: `$${totalUSD.toLocaleString()}`, icon: DollarSign, color: "bg-green-50 text-green-600" },
          { label: "Confirmed (NGN)", value: `₦${totalNGN.toLocaleString()}`, icon: DollarSign, color: "bg-blue-50 text-blue-600" },
          { label: "Pending", value: pendingCount, icon: Clock, color: "bg-yellow-50 text-yellow-600" },
          { label: "Unique Donors", value: uniqueDonors, icon: Users, color: "bg-purple-50 text-purple-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} />
            </div>
            {loading ? (
              <Loader2 size={16} className="animate-spin text-gray-300" />
            ) : (
              <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            )}
            <p className="text-gray-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter size={14} className="text-gray-400" />
        {["all", "pending", "confirmed", "completed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              filterStatus === s ? "bg-primary text-white" : "bg-white text-gray-500 border border-gray-200 hover:border-primary/30"
            }`}
          >
            {s} {s !== "all" && `(${donations.filter((d) => d.status === s).length})`}
          </button>
        ))}
      </div>

      {/* Donations list */}
      {loading ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Loader2 size={24} className="animate-spin text-primary mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Loading donations...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm text-center">
          <Heart size={36} className="text-gray-200 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-600 mb-1">
            {filterStatus === "all" ? "No donations yet" : `No ${filterStatus} donations`}
          </h3>
          <p className="text-gray-400 text-sm">Donation pledges from the website will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((donation) => {
            const id = donation.id!;
            const isExpanded = expandedId === id;
            const sym = donation.currency === "usd" ? "$" : "₦";

            return (
              <div key={id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : id)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Heart size={16} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{donation.name}</p>
                    <p className="text-gray-400 text-xs truncate">{donation.email} — {donation.program}</p>
                  </div>
                  <p className="font-bold text-gray-900 text-lg shrink-0">{sym}{donation.amount.toLocaleString()}</p>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider shrink-0 ${statusColors[donation.status] || statusColors.pending}`}>
                    {donation.status}
                  </span>
                  <div className="flex items-center gap-1 text-gray-400 text-xs shrink-0 hidden sm:flex">
                    <Clock size={11} />
                    {formatDate(donation.createdAt as { seconds: number } | null)}
                  </div>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform shrink-0 ${isExpanded ? "rotate-180" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-100 p-5 bg-gray-50/50">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm mb-5">
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Donor</p>
                        <p className="text-gray-800">{donation.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Email</p>
                        <p className="text-gray-800">{donation.email}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Amount</p>
                        <p className="text-gray-800 font-bold">{sym}{donation.amount.toLocaleString()} ({donation.currency.toUpperCase()})</p>
                      </div>
                      {donation.phone && (
                        <div>
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                          <p className="text-gray-800">{donation.phone}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Program</p>
                        <p className="text-gray-800">{donation.program}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Payment Method</p>
                        <p className="text-gray-800 capitalize">{donation.method.replace("_", " ")}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Anonymous</p>
                        <p className="text-gray-800">{donation.anonymous ? "Yes — hidden from public" : "No"}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Date</p>
                        <p className="text-gray-800">{formatDate(donation.createdAt as { seconds: number } | null)}</p>
                      </div>
                      {donation.message && (
                        <div className="sm:col-span-2 lg:col-span-3">
                          <p className="text-gray-400 text-xs uppercase tracking-wider mb-0.5">Message</p>
                          <p className="text-gray-800">{donation.message}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Status:</span>
                        {["pending", "confirmed", "completed"].map((s) => (
                          <button
                            key={s}
                            onClick={() => handleStatus(id, s)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-medium capitalize transition-all ${
                              donation.status === s ? statusColors[s] : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <a
                          href={`mailto:${donation.email}?subject=Donation Confirmation - Haleyouth Foundation&body=Dear ${donation.name},%0A%0AThank you for your generous donation pledge of ${sym}${donation.amount.toLocaleString()} to ${donation.program}.%0A%0A`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
                        >
                          <ExternalLink size={11} /> Email Donor
                        </a>
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
