"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { Send, CheckCircle, Target, Users, Globe, TrendingUp } from "lucide-react";

const benefits = [
  { icon: Target, title: "Aligned Impact", desc: "Contribute to measurable SDG outcomes across education, health, and climate action." },
  { icon: Users, title: "Community Access", desc: "Reach underserved communities through our trusted grassroots networks." },
  { icon: Globe, title: "Global Visibility", desc: "Associate with an organization recognized at the UN General Assembly." },
  { icon: TrendingUp, title: "Proven Track Record", desc: "Partner with a foundation that delivers transparent, documented results." },
];

export default function PartnerWithUsPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHeader title="Partner With Us" subtitle="Join our growing network of organizations driving youth empowerment and community development." badge="Get Involved" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {benefits.map((b) => (
              <div key={b.title} className="bg-white rounded-xl p-6 shadow-sm text-center card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <b.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold text-text-primary mb-1 text-sm">{b.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="bg-secondary/10 rounded-2xl p-12 text-center">
                <CheckCircle size={48} className="text-secondary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Inquiry Received!</h2>
                <p className="text-text-secondary">We&apos;ll review your proposal and be in touch soon.</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">Partnership Inquiry</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Organization Name *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Contact Person *</label>
                    <input type="text" required className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Email *</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Partnership Type</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Program Partnership</option>
                    <option>Strategic Partnership</option>
                    <option>Knowledge / Technical Partnership</option>
                    <option>Funding / Grant Support</option>
                    <option>Event Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Partnership Proposal *</label>
                  <textarea required rows={5} placeholder="Tell us about your organization and how you'd like to partner..." className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
                </div>
                <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
                  <Send size={16} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
