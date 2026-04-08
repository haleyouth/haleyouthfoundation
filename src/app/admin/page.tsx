"use client";

import Link from "next/link";
import { FileText, ImageIcon, Target, Handshake, Users, Mail, Heart, TrendingUp, Eye, UserPlus } from "lucide-react";

const stats = [
  { label: "Total Programs", value: "12", icon: Target, color: "text-primary", bg: "bg-primary/10" },
  { label: "Gallery Images", value: "13", icon: ImageIcon, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Partners", value: "9", icon: Handshake, color: "text-accent", bg: "bg-accent/10" },
  { label: "Blog Posts", value: "3", icon: FileText, color: "text-purple-600", bg: "bg-purple-100" },
];

const quickActions = [
  { label: "New Blog Post", href: "/admin/posts", icon: FileText },
  { label: "Upload Images", href: "/admin/gallery", icon: ImageIcon },
  { label: "Manage Partners", href: "/admin/partners", icon: Handshake },
  { label: "View Submissions", href: "/admin/submissions", icon: Mail },
];

const recentActivity = [
  { action: "Website launched", time: "Just now", icon: TrendingUp },
  { action: "13 gallery images uploaded", time: "Today", icon: ImageIcon },
  { action: "9 partner logos configured", time: "Today", icon: Handshake },
  { action: "12 programs published", time: "Today", icon: Target },
  { action: "Admin panel deployed", time: "Today", icon: UserPlus },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-1">Welcome to Haleyouth Admin</h2>
        <p className="text-white/80 text-sm">Manage your website content, submissions, and settings from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg ${s.bg} flex items-center justify-center`}>
                <s.icon size={18} className={s.color} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Quick actions */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <Link key={a.label} href={a.href} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-primary/5 transition-colors text-sm font-medium text-gray-700 hover:text-primary">
                <a.icon size={16} /> {a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <a.icon size={14} className="text-gray-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{a.action}</p>
                  <p className="text-xs text-gray-400">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
