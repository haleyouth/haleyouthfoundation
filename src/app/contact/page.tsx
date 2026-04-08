"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";
import { MapPin, Mail, Send, CheckCircle } from "lucide-react";
import { FacebookIcon, XTwitterIcon, LinkedInIcon, InstagramIcon } from "@/components/ui/SocialIcons";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader title="Contact Us" subtitle="We'd love to hear from you. Reach out with questions, partnership proposals, or to learn more." badge="Get in Touch" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-secondary/10 rounded-2xl p-12 text-center">
                  <CheckCircle size={48} className="text-secondary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-text-primary mb-2">Message Sent!</h2>
                  <p className="text-text-secondary">Thank you for reaching out. We&apos;ll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Your Name</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" placeholder="John Doe" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Subject</label>
                    <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
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
                    <label className="block text-sm font-medium text-text-primary mb-2">Message</label>
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm resize-none" placeholder="Your message..." />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark transition-all hover:scale-[1.02] active:scale-[0.98]">
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact info sidebar */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-bg-secondary rounded-xl p-6">
                <h3 className="font-bold text-text-primary mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-text-primary text-sm">Address</p>
                      <p className="text-text-secondary text-sm">{SITE_CONFIG.address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-text-primary text-sm">Email</p>
                      <a href={`mailto:${SITE_CONFIG.email}`} className="text-text-secondary text-sm hover:text-primary transition-colors">{SITE_CONFIG.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-bg-secondary rounded-xl p-6">
                <h3 className="font-bold text-text-primary mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: FacebookIcon, href: SITE_CONFIG.social.facebook },
                    { icon: XTwitterIcon, href: SITE_CONFIG.social.twitter },
                    { icon: LinkedInIcon, href: SITE_CONFIG.social.linkedin },
                    { icon: InstagramIcon, href: SITE_CONFIG.social.instagram },
                  ].map((s, i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-text-secondary hover:text-primary hover:shadow-md transition-all">
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
