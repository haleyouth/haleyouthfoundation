"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";
import { submitContact } from "@/lib/submissions";
import { MapPin, Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { FacebookIcon, XTwitterIcon, LinkedInIcon, InstagramIcon } from "@/components/ui/SocialIcons";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitContact(form);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400";

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you. Reach out with questions, partnership proposals, or to learn more." badge="Get in Touch" />

      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="card-premium p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle size={32} className="text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Message Sent!</h2>
                  <p className="text-text-secondary">Thank you for reaching out. We&apos;ll get back to you within 24-48 hours.</p>
                </motion.div>
              ) : (
                <div className="card-premium p-8">
                  <h2 className="text-xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Send Us a Message</h2>

                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-5 border border-red-100">
                      <AlertCircle size={16} className="shrink-0" />
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Your Name *</label>
                        <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">Email Address *</label>
                        <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Subject *</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className={inputClass}>
                        <option value="">Select a subject</option>
                        <option>General Inquiry</option>
                        <option>Partnership Proposal</option>
                        <option>Donation Question</option>
                        <option>Volunteer Interest</option>
                        <option>Media / Press</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Message *</label>
                      <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClass} resize-none`} placeholder="How can we help you?" />
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="card-premium p-6">
                <h3 className="font-bold text-text-primary mb-6 text-lg">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">Address</p>
                      <p className="text-text-secondary text-sm">{SITE_CONFIG.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary text-sm">Email</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary text-sm hover:underline">{SITE_CONFIG.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6">
                <h3 className="font-bold text-text-primary mb-4">Follow Us</h3>
                <div className="flex gap-2">
                  {[
                    { icon: FacebookIcon, href: SITE_CONFIG.social.facebook },
                    { icon: XTwitterIcon, href: SITE_CONFIG.social.twitter },
                    { icon: LinkedInIcon, href: SITE_CONFIG.social.linkedin },
                    { icon: InstagramIcon, href: SITE_CONFIG.social.instagram },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-bg-secondary rounded-xl flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/5 transition-all">
                      <s.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
