"use client";

import { useState } from "react";
import { Save, Globe, Mail, Shield, CreditCard, FileText, AlertTriangle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const settingsSections = [
  { key: "general", label: "General", icon: Globe },
  { key: "contact", label: "Contact", icon: Mail },
  { key: "social", label: "Social Media", icon: Globe },
  { key: "seo", label: "SEO & Meta", icon: Shield },
  { key: "donations", label: "Donations", icon: CreditCard },
  { key: "legal", label: "Legal Pages", icon: FileText },
  { key: "maintenance", label: "Maintenance", icon: AlertTriangle },
];

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState("general");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Site Settings</h2>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-xl shadow-sm p-3 h-fit">
          {settingsSections.map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-left transition-colors ${
                activeSection === s.key ? "bg-primary/10 text-primary" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <s.icon size={16} /> {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm p-6">
          {activeSection === "general" && (
            <div className="space-y-5">
              <h3 className="font-bold text-gray-900">General Settings</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Site Name</label>
                <input type="text" defaultValue={SITE_CONFIG.name} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tagline</label>
                <input type="text" defaultValue={SITE_CONFIG.tagline} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea rows={3} defaultValue={SITE_CONFIG.description} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Registration Number</label>
                <input type="text" defaultValue={SITE_CONFIG.registration} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
          )}

          {activeSection === "contact" && (
            <div className="space-y-5">
              <h3 className="font-bold text-gray-900">Contact Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
                <input type="text" defaultValue={SITE_CONFIG.address} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input type="text" defaultValue={SITE_CONFIG.phone} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input type="email" defaultValue={SITE_CONFIG.email} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
          )}

          {activeSection === "social" && (
            <div className="space-y-5">
              <h3 className="font-bold text-gray-900">Social Media Links</h3>
              {Object.entries(SITE_CONFIG.social).map(([platform, url]) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 capitalize">{platform}</label>
                  <input type="url" defaultValue={url} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
              ))}
            </div>
          )}

          {activeSection === "maintenance" && (
            <div className="space-y-5">
              <h3 className="font-bold text-gray-900">Maintenance Mode</h3>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="maintenance" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                <label htmlFor="maintenance" className="text-sm font-medium text-gray-700">Enable Maintenance Mode</label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Maintenance Message</label>
                <textarea rows={3} placeholder="We're currently updating our website. Please check back soon." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
              </div>
            </div>
          )}

          {!["general", "contact", "social", "maintenance"].includes(activeSection) && (
            <div className="text-center py-8">
              <p className="text-gray-400 text-sm">
                This settings section will be fully functional after Firebase integration.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
