"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { Heart, BookOpen, Shirt, Shield, CreditCard, Building2 } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const amounts = [
  { value: 25, impact: "Provides learning materials for 5 students", icon: BookOpen },
  { value: 50, impact: "Supplies reusable pad kits for 10 girls", icon: Heart },
  { value: 100, impact: "Sponsors a child's school term", icon: Shirt },
];

export default function DonatePage() {
  const [selected, setSelected] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");

  const effectiveAmount = selected ?? (custom ? Number(custom) : 0);

  return (
    <>
      <PageHeader title="Donate" subtitle="Every contribution builds a brighter tomorrow for young people across Nigeria." badge="Support Our Mission" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
            {/* Currency selector */}
            <div className="flex gap-2 mb-8">
              <button onClick={() => setCurrency("usd")} className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${currency === "usd" ? "bg-primary text-white" : "bg-bg-secondary text-text-secondary hover:bg-primary/10"}`}>
                <CreditCard size={16} className="inline mr-2" /> International (USD)
              </button>
              <button onClick={() => setCurrency("ngn")} className={`flex-1 py-3 rounded-lg font-medium text-sm transition-all ${currency === "ngn" ? "bg-primary text-white" : "bg-bg-secondary text-text-secondary hover:bg-primary/10"}`}>
                <Building2 size={16} className="inline mr-2" /> Nigeria (NGN)
              </button>
            </div>

            {/* Amount selection */}
            <h3 className="font-bold text-text-primary mb-4">Select Amount ({currency === "usd" ? "$" : "₦"})</h3>
            <div className="grid grid-cols-3 gap-4 mb-6">
              {amounts.map((a) => (
                <button
                  key={a.value}
                  onClick={() => { setSelected(a.value); setCustom(""); }}
                  className={`p-4 rounded-xl text-center transition-all border-2 ${
                    selected === a.value ? "border-accent bg-accent/5" : "border-border hover:border-accent/40"
                  }`}
                >
                  <a.icon size={20} className="text-accent mx-auto mb-2" />
                  <p className="text-xl font-bold text-text-primary">{currency === "usd" ? "$" : "₦"}{a.value}</p>
                  <p className="text-text-secondary text-xs mt-1">{a.impact}</p>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-text-primary mb-2">Or enter a custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary font-medium">{currency === "usd" ? "$" : "₦"}</span>
                <input
                  type="number"
                  min="1"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm"
                />
              </div>
            </div>

            {/* Donate button */}
            <button
              disabled={!effectiveAmount}
              className="w-full py-4 bg-accent text-white rounded-xl font-bold text-lg hover:bg-accent/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              onClick={() => alert(`Donation of ${currency === "usd" ? "$" : "₦"}${effectiveAmount} — payment integration coming soon! Contact ${SITE_CONFIG.email} for direct donations.`)}
            >
              <Heart size={20} />
              Donate {effectiveAmount ? `${currency === "usd" ? "$" : "₦"}${effectiveAmount}` : ""}
            </button>

            {/* Trust signals */}
            <div className="mt-6 flex items-center justify-center gap-6 text-text-secondary text-xs">
              <span className="flex items-center gap-1"><Shield size={14} /> Secure Payment</span>
              <span>{SITE_CONFIG.registration}</span>
            </div>

            {/* Bank transfer details */}
            <div className="mt-8 pt-8 border-t border-border">
              <h4 className="font-bold text-text-primary mb-3 text-sm">Alternative: Bank Transfer</h4>
              <p className="text-text-secondary text-sm mb-4">
                For direct bank transfers, please contact us at{" "}
                <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">{SITE_CONFIG.email}</a> for bank details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
