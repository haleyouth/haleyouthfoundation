"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { submitVolunteer } from "@/lib/submissions";
import { Send, CheckCircle, AlertCircle, Loader2, Users, MapPin, Clock, Briefcase } from "lucide-react";

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", location: "",
    skills: "", availability: "", experience: "", motivation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitVolunteer(form);
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400";

  if (submitted) {
    return (
      <>
        <PageHeader title="Volunteer With Us" subtitle="Thank you for your interest!" badge="Get Involved" />
        <section className="py-24 bg-bg-primary">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto px-4">
            <div className="card-premium p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Application Submitted!</h2>
              <p className="text-text-secondary">We&apos;ll review your application and get back to you within a week. Thank you for wanting to make a difference.</p>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Volunteer With Us" subtitle="Share your skills, time, and passion to directly impact young lives across Africa." badge="Get Involved" />

      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Benefits sidebar */}
            <div className="lg:col-span-1 space-y-5">
              <h3 className="text-xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Why Volunteer?</h3>
              {[
                { icon: Users, title: "Join a Community", desc: "Work alongside passionate changemakers who share your values." },
                { icon: MapPin, title: "Local & Remote", desc: "Contribute from anywhere — we welcome both on-ground and remote volunteers." },
                { icon: Clock, title: "Flexible Time", desc: "From a few hours a week to full-time — choose what works for you." },
                { icon: Briefcase, title: "Build Experience", desc: "Gain real-world experience in non-profit work, project management, and community development." },
              ].map((b) => (
                <div key={b.title} className="card-premium p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <b.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-sm mb-1">{b.title}</h4>
                      <p className="text-text-secondary text-xs leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card-premium p-8">
                <h2 className="text-xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Volunteer Application</h2>

                {error && (
                  <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-5 border border-red-100">
                    <AlertCircle size={16} className="shrink-0" /> {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Full Name *</label>
                      <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Email Address *</label>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} placeholder="+234..." />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Location</label>
                      <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className={inputClass} placeholder="City, Country" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Skills &amp; Expertise *</label>
                    <input type="text" required value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className={inputClass} placeholder="e.g., Education, Healthcare, IT, Communications, Design" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Availability *</label>
                      <select required value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className={inputClass}>
                        <option value="">Select availability</option>
                        <option>Part-time (few hours/week)</option>
                        <option>Full-time (dedicated period)</option>
                        <option>Project-based</option>
                        <option>Weekends only</option>
                        <option>Remote only</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">Relevant Experience</label>
                      <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className={inputClass}>
                        <option value="">Select experience level</option>
                        <option>No prior volunteer experience</option>
                        <option>Some volunteer experience</option>
                        <option>Experienced volunteer</option>
                        <option>Professional in related field</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Why do you want to volunteer with Haleyouth? *</label>
                    <textarea required rows={4} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} className={`${inputClass} resize-none`} placeholder="Tell us what motivates you and how you'd like to contribute..." />
                  </div>
                  <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
