"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { submitSkillTraining } from "@/lib/submissions";
import { logConversion } from "@/lib/firebase";
import { COUNTRIES } from "@/lib/geo";
import {
  Send, CheckCircle, AlertCircle, Loader2, Cloud, Database, Cpu,
  GraduationCap, Award, Rocket, CalendarClock, Users, BadgeCheck,
} from "lucide-react";

const OPEN_PROGRAM = "AI Foundational Training";
const REGISTRATION_CLOSES = "Monday, 5 August 2026";

const programs = [
  {
    Icon: Cpu,
    title: "AI Foundational Training",
    tag: "Open now",
    open: true,
    desc: "Build foundational knowledge and practical skills in artificial intelligence. Currently open for registration through our partnership with CIL Academy, at no cost to participants.",
  },
  {
    Icon: Rocket,
    title: "Zero to Techie",
    tag: "Cohort-based",
    open: false,
    desc: "A beginner-friendly pathway with tracks in Cloud Engineering, Data Engineering, Business Analysis, Product Management, and Product Design.",
  },
  {
    Icon: Cloud,
    title: "AWS re/Start",
    tag: "Cohort-based",
    open: false,
    desc: "An intensive cloud-computing programme with hands-on labs and career support. Eligible learners who complete it can earn an AWS certification exam voucher, provided by AWS.",
  },
  {
    Icon: Database,
    title: "Digital Skills Courses",
    tag: "Self-paced",
    open: false,
    desc: "Self-paced online courses in high-demand areas such as Artificial Intelligence and Cloud Computing, available to start anytime.",
  },
];

const benefits = [
  { Icon: GraduationCap, title: "Real, industry-relevant training", desc: "Learn through CIL Academy's blended model of self-paced online lessons and live instructor-led sessions." },
  { Icon: Award, title: "Preparation for certification", desc: "Build toward recognised industry certifications that employers value." },
  { Icon: BadgeCheck, title: "No cost to you", desc: "This opportunity is facilitated free of charge for members of the Haleyouth community." },
  { Icon: Rocket, title: "Pathways to opportunity", desc: "Where opportunities exist, participants may be considered for internships, employment, or further training." },
];

export default function TechSkillTrainingClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "Nigeria", location: "", dob: "", gender: "",
    program: OPEN_PROGRAM, education: "", experience: "",
    hasLaptop: "", hasInternet: "", availability: "", motivation: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const MOTIVATION_MAX_WORDS = 120;
  const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
  const setMotivation = (v: string) => {
    const words = v.trim().split(/\s+/).filter(Boolean);
    // Cap at the word limit; allow a trailing space so the user can keep typing words.
    const capped = words.length > MOTIVATION_MAX_WORDS
      ? words.slice(0, MOTIVATION_MAX_WORDS).join(" ") + (/\s$/.test(v) ? " " : "")
      : v;
    set("motivation", capped);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await submitSkillTraining(form);
      void logConversion("skilltraining_registered");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again, or email info@haleyouthfoundation.org.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-white text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-gray-400";

  if (submitted) {
    return (
      <>
        <PageHeader title="Tech Skill Training" subtitle="Your interest has been registered." badge="Skills & Empowerment" />
        <section className="py-24 bg-bg-primary">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl mx-auto px-4">
            <div className="card-premium p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle size={32} className="text-secondary" />
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>Registration received</h2>
              <p className="text-text-secondary mb-4">
                Thank you for registering your interest in the {OPEN_PROGRAM}. Our team will follow up with the next steps.
              </p>
              <p className="text-text-secondary text-sm">
                Please also complete CIL Academy&apos;s official registration form before <strong>{REGISTRATION_CLOSES}</strong> if you have not already. We will share the link with you and support you through onboarding.
              </p>
            </div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Tech Skill Training"
        subtitle="Free digital-skills training and certification pathways for young people, in partnership with CIL Academy."
        badge="Skills & Empowerment"
      />

      <section className="py-16 sm:py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro + partnership */}
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-text-secondary leading-relaxed">
              Haleyouth Foundation has partnered with <strong>CIL Academy</strong> (Cecure Intelligence Limited)
              to open real pathways into technology for young people in our communities. Through this partnership,
              community members can access quality digital-skills training and prepare for recognised industry
              certification, with pathways to internships and employment where opportunities exist.
            </p>
          </div>

          {/* Open programme highlight */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card-premium p-8 border-l-4 border-accent relative overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
                  <Cpu size={13} /> Now Open
                </span>
                <span className="inline-flex items-center gap-1.5 text-text-secondary text-xs">
                  <CalendarClock size={14} /> Registration closes {REGISTRATION_CLOSES}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                {OPEN_PROGRAM}
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Our current open programme helps community members build foundational AI knowledge and practical
                skills, at no cost. Register your interest below and our team will guide you through the next steps,
                including the official registration and onboarding with CIL Academy.
              </p>
              <a href="#register" className="btn-primary inline-flex items-center gap-2">
                <Send size={16} /> Register your interest
              </a>
            </div>
          </div>

          {/* Programme catalogue */}
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
              Training pathways
            </h2>
            <p className="text-text-secondary/80 text-sm mt-2">Programmes available through CIL Academy.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`card-premium p-6 h-full ${p.open ? "ring-1 ring-accent/40" : ""}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                    <p.Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-text-primary">{p.title}</h3>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.open ? "bg-accent/10 text-accent" : "bg-gray-100 text-text-secondary"}`}>
                        {p.tag}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {benefits.map((b) => (
              <div key={b.title} className="card-premium p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-3">
                  <b.Icon size={22} className="text-primary" />
                </div>
                <h4 className="font-semibold text-text-primary text-sm mb-1.5">{b.title}</h4>
                <p className="text-text-secondary text-xs leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          {/* Registration form */}
          <div id="register" className="max-w-3xl mx-auto scroll-mt-24">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                <Users size={13} /> Interest Registration
              </span>
              <h2 className="text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
                Register for skill training
              </h2>
              <p className="text-text-secondary text-sm mt-2 max-w-xl mx-auto">
                Complete the form to register your interest. This helps us support you and reach you when
                each programme and cohort begins.
              </p>
            </div>

            <div className="card-premium p-8">
              {error && (
                <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-5 border border-red-100">
                  <AlertCircle size={16} className="shrink-0" /> {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Full Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => set("name", e.target.value)} className={inputClass} placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Email Address *</label>
                    <input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} placeholder="you@example.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Phone / WhatsApp *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} placeholder="+234..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Country *</label>
                    <select required value={form.country} onChange={(e) => set("country", e.target.value)} className={inputClass}>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">City / State *</label>
                  <input type="text" required value={form.location} onChange={(e) => set("location", e.target.value)} className={inputClass} placeholder="e.g., Okene, Kogi" />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={form.dob}
                      onChange={(e) => set("dob", e.target.value)}
                      max={new Date().toISOString().split("T")[0]}
                      min="1940-01-01"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Gender *</label>
                    <select required value={form.gender} onChange={(e) => set("gender", e.target.value)} className={inputClass}>
                      <option value="">Select</option>
                      <option>Female</option>
                      <option>Male</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Intended Program of Interest *</label>
                  <select required value={form.program} onChange={(e) => set("program", e.target.value)} className={inputClass}>
                    <option value="AI Foundational Training">AI Foundational Training (open now)</option>
                    <option value="Zero to Techie">Zero to Techie</option>
                    <option value="AWS re/Start">AWS re/Start</option>
                    <option value="Digital Skills Courses">Digital Skills Courses</option>
                    <option value="Not sure yet">Not sure yet, guide me</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Highest Education *</label>
                    <select required value={form.education} onChange={(e) => set("education", e.target.value)} className={inputClass}>
                      <option value="">Select level</option>
                      <option>Secondary school</option>
                      <option>Diploma / NCE / OND</option>
                      <option>Undergraduate / HND</option>
                      <option>Bachelor&apos;s degree</option>
                      <option>Master&apos;s degree</option>
                      <option>PhD</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Tech Experience *</label>
                    <select required value={form.experience} onChange={(e) => set("experience", e.target.value)} className={inputClass}>
                      <option value="">Select level</option>
                      <option>Complete beginner</option>
                      <option>Some exposure</option>
                      <option>Intermediate</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Do you have a laptop? *</label>
                    <select required value={form.hasLaptop} onChange={(e) => set("hasLaptop", e.target.value)} className={inputClass}>
                      <option value="">Select</option>
                      <option>Yes, my own laptop</option>
                      <option>Shared access</option>
                      <option>No, not yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Reliable internet access? *</label>
                    <select required value={form.hasInternet} onChange={(e) => set("hasInternet", e.target.value)} className={inputClass}>
                      <option value="">Select</option>
                      <option>Yes</option>
                      <option>Sometimes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">Availability *</label>
                  <select required value={form.availability} onChange={(e) => set("availability", e.target.value)} className={inputClass}>
                    <option value="">Select availability</option>
                    <option>Full-time (weekdays)</option>
                    <option>Part-time (a few hours/week)</option>
                    <option>Evenings and weekends</option>
                    <option>Self-paced only</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-text-primary">Why do you want to join this training? *</label>
                    <span className={`text-xs ${wordCount(form.motivation) >= MOTIVATION_MAX_WORDS ? "text-accent font-medium" : "text-text-secondary/70"}`}>
                      {wordCount(form.motivation)} / {MOTIVATION_MAX_WORDS} words
                    </span>
                  </div>
                  <textarea required rows={4} value={form.motivation} onChange={(e) => setMotivation(e.target.value)} className={`${inputClass} resize-none`} placeholder="Tell us your goals and what you hope to achieve (max 120 words)..." />
                </div>

                <p className="text-xs text-text-secondary/80 leading-relaxed">
                  By registering, you agree that Haleyouth Foundation may contact you about this and future
                  training opportunities, and may share your details with CIL Academy for the purpose of enrolment.
                  Places are limited and subject to eligibility and available capacity.
                </p>

                <button type="submit" disabled={loading} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {loading ? "Submitting..." : "Register my interest"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
