"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { submitPartner } from "@/lib/submissions";
import { Send, CheckCircle, AlertCircle, Loader2, Target, Users, Globe, TrendingUp, Award, Handshake } from "lucide-react";

const benefits = [
  { icon: Target, title: "Aligned Impact", desc: "Contribute to measurable SDG outcomes across education, health, and climate action." },
  { icon: Users, title: "Community Access", desc: "Reach underserved communities through our trusted grassroots networks across Nigeria." },
  { icon: Globe, title: "Global Visibility", desc: "Associate with an organization represented at the UN General Assembly." },
  { icon: TrendingUp, title: "Proven Results", desc: "Partner with a foundation that delivers transparent, documented impact." },
  { icon: Award, title: "Grant Winner", desc: "British Council Alumni UK Climate Action Grant recipient with strong compliance record." },
  { icon: Handshake, title: "Flexible Models", desc: "Program, strategic, knowledge, or event partnerships — we tailor to your goals." },
];

export default function PartnerWithUsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    orgName: "", contactName: "", email: "", website: "", type: "", proposal: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitPartner(form);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400";

  return (
    <>
      <PageHeader title="Partner With Us" subtitle="Join our growing network of organizations driving youth empowerment and community development." badge="Collaborate" />

      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="card-premium p-6 text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <b.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-bold text-text-primary mb-1.5 text-sm">{b.title}</h3>
                <p className="text-text-secondary text-xs leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-premium p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Inquiry Received!</h2>
                <p className="text-text-secondary">We&apos;ll review your proposal and be in touch within a week. Thank you for your interest in partnering with us.</p>
              </motion.div>
            ) : (
              <div className="card-premium p-8">
                <h3 className="text-xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Partnership Inquiry</h3>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-5 border border-red-100">
                    <AlertCircle size={16} className="shrink-0" /> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Organization Name *</label>
                      <input type="text" required value={form.orgName} onChange={(e) => setForm({ ...form, orgName: e.target.value })} className={inputClass} placeholder="Your organization" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Contact Person *</label>
                      <input type="text" required value={form.contactName} onChange={(e) => setForm({ ...form, contactName: e.target.value })} className={inputClass} placeholder="Your full name" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Email *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="contact@organization.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Website</label>
                      <input type="url" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} className={inputClass} placeholder="https://..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Partnership Type *</label>
                    <select required value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className={inputClass}>
                      <option value="">Select type</option>
                      <option>Program Partnership</option>
                      <option>Strategic Partnership</option>
                      <option>Knowledge / Technical Partnership</option>
                      <option>Funding / Grant Support</option>
                      <option>Event Collaboration</option>
                      <option>CSR / Corporate Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Partnership Proposal *</label>
                    <textarea required rows={5} value={form.proposal} onChange={(e) => setForm({ ...form, proposal: e.target.value })} className={`${inputClass} resize-none`} placeholder="Tell us about your organization and how you'd like to partner with Haleyouth Foundation..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {loading ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
