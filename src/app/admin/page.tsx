"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchSubmissions } from "@/lib/submissions";
import { FileText, ImageIcon, Target, Handshake, Users, Mail, Heart, TrendingUp, UserPlus, BarChart3, ExternalLink, Loader2, Newspaper } from "lucide-react";

const quickActions = [
  { label: "View Submissions", href: "/admin/submissions", icon: Mail },
  { label: "Manage Partners", href: "/admin/partners", icon: Handshake },
  { label: "Manage Gallery", href: "/admin/gallery", icon: ImageIcon },
  { label: "Site Settings", href: "/admin/settings", icon: Target },
];

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ contact: 0, volunteer: 0, partner: 0, newsletter: 0, contactNew: 0, volunteerNew: 0, partnerNew: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [contact, volunteer, partner, newsletter] = await Promise.all([
          fetchSubmissions("submissions_contact"),
          fetchSubmissions("submissions_volunteer"),
          fetchSubmissions("submissions_partner"),
          fetchSubmissions("submissions_newsletter"),
        ]);
        setCounts({
          contact: contact.length,
          volunteer: volunteer.length,
          partner: partner.length,
          newsletter: newsletter.length,
          contactNew: contact.filter((c: Record<string, unknown>) => c.status === "new").length,
          volunteerNew: volunteer.filter((v: Record<string, unknown>) => v.status === "new").length,
          partnerNew: partner.filter((p: Record<string, unknown>) => p.status === "new").length,
        });
      } catch (err) {
        console.error("Failed to load counts:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalNew = counts.contactNew + counts.volunteerNew + counts.partnerNew;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-7 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <h2 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-playfair)" }}>Welcome to Haleyouth Admin</h2>
        <p className="text-white/70 text-sm">Manage your website content, view submissions, and track site performance.</p>
        {totalNew > 0 && (
          <Link href="/admin/submissions" className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/15 rounded-lg text-sm font-medium hover:bg-white/25 transition-colors">
            <Mail size={14} /> {totalNew} new submission{totalNew > 1 ? "s" : ""} to review
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Contact Messages", value: counts.contact, newCount: counts.contactNew, icon: Mail, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Volunteer Apps", value: counts.volunteer, newCount: counts.volunteerNew, icon: Users, color: "text-green-600", bg: "bg-green-50" },
          { label: "Partner Inquiries", value: counts.partner, newCount: counts.partnerNew, icon: Handshake, color: "text-purple-600", bg: "bg-purple-50" },
          { label: "Newsletter Subs", value: counts.newsletter, newCount: 0, icon: Newspaper, color: "text-orange-600", bg: "bg-orange-50" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
              {s.newCount > 0 && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full">
                  {s.newCount} new
                </span>
              )}
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

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link key={a.label} href={a.href} className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gray-50 hover:bg-primary/5 transition-colors text-sm font-medium text-gray-700 hover:text-primary border border-gray-100 hover:border-primary/20">
                <a.icon size={16} /> {a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Google Analytics */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Site Analytics</h3>
            <a
              href="https://analytics.google.com/analytics/web/#/p472869133/reports/intelligenthome"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary text-xs font-medium hover:underline"
            >
              Open Google Analytics <ExternalLink size={10} />
            </a>
          </div>

          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart3 size={18} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Google Analytics 4</p>
                <p className="text-gray-400 text-xs">Measurement ID: G-5RFZTEGFB9</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed mb-4">
              Firebase Analytics is active and tracking visitors. View detailed reports including page views, user demographics, traffic sources, and engagement metrics in the Google Analytics dashboard.
            </p>
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-dark transition-colors"
            >
              <BarChart3 size={14} /> View Analytics Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
