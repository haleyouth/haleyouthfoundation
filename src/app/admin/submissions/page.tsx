"use client";

import { useState } from "react";
import { Mail, Users, Handshake, Newspaper, Eye, Archive } from "lucide-react";

const tabs = [
  { key: "contact", label: "Contact", icon: Mail, count: 0 },
  { key: "volunteer", label: "Volunteer", icon: Users, count: 0 },
  { key: "partnership", label: "Partnership", icon: Handshake, count: 0 },
  { key: "newsletter", label: "Newsletter", icon: Newspaper, count: 0 },
];

export default function AdminSubmissionsPage() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Form Submissions</h2>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key ? "bg-primary text-white" : "bg-white text-gray-600 hover:bg-gray-50 shadow-sm"
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
            {tab.count > 0 && (
              <span className="w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-xl p-12 shadow-sm text-center">
        <Archive size={40} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-1">No submissions yet</h3>
        <p className="text-gray-400 text-sm">
          {activeTab === "contact" && "Contact form submissions will appear here."}
          {activeTab === "volunteer" && "Volunteer applications will appear here."}
          {activeTab === "partnership" && "Partnership inquiries will appear here."}
          {activeTab === "newsletter" && "Newsletter subscribers will appear here."}
        </p>
        <p className="text-gray-400 text-xs mt-4">
          Submissions will be stored in Firebase Firestore after integration.
        </p>
      </div>
    </div>
  );
}
