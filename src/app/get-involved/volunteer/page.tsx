"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { Send, CheckCircle } from "lucide-react";

export default function VolunteerPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <>
        <PageHeader title="Volunteer" subtitle="Thank you for your interest in volunteering!" badge="Get Involved" />
        <section className="py-20 bg-bg-primary">
          <div className="max-w-xl mx-auto px-4 text-center">
            <CheckCircle size={48} className="text-secondary mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-text-primary mb-2">Application Submitted!</h2>
            <p className="text-text-secondary">We&apos;ll review your application and get back to you soon.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader title="Volunteer With Us" subtitle="Share your skills, time, and passion to directly impact young lives." badge="Get Involved" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="bg-white rounded-2xl shadow-sm p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Full Name *</label>
                <input type="text" required className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">Email *</label>
                <input type="email" required className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Phone Number</label>
              <input type="tel" className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Skills &amp; Expertise</label>
              <input type="text" placeholder="e.g., Education, Healthcare, IT, Communications" className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Availability</label>
              <select className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>Part-time (few hours/week)</option>
                <option>Full-time (dedicated period)</option>
                <option>Project-based</option>
                <option>Remote only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Why do you want to volunteer? *</label>
              <textarea required rows={4} className="w-full px-4 py-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
            </div>
            <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-2">
              <Send size={16} /> Submit Application
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
