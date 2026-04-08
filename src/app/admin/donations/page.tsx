"use client";

import { DollarSign, TrendingUp, Users, Calendar } from "lucide-react";

export default function AdminDonationsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Donations</h2>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "This Month", value: "$0", icon: Calendar, color: "bg-blue-100 text-blue-600" },
          { label: "Total", value: "$0", icon: DollarSign, color: "bg-green-100 text-green-600" },
          { label: "Donors", value: "0", icon: Users, color: "bg-purple-100 text-purple-600" },
          { label: "Avg. Donation", value: "$0", icon: TrendingUp, color: "bg-orange-100 text-orange-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl p-5 shadow-sm">
            <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={16} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-gray-500 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      <div className="bg-white rounded-xl p-12 shadow-sm text-center">
        <DollarSign size={40} className="text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-1">No donations recorded yet</h3>
        <p className="text-gray-400 text-sm">
          Donation tracking will be available after Paystack and Stripe webhook integration.
        </p>
      </div>
    </div>
  );
}
