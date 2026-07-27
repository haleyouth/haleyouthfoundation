"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { submitStemForAll } from "@/lib/submissions";
import { logConversion } from "@/lib/firebase";
import { COUNTRIES } from "@/lib/geo";
import {
  Send, AlertCircle, Loader2, Brain, FlaskConical, Code2,
  Sigma, Award, Rocket, Users, BadgeCheck, Sparkles, Clock, Target,
  ArrowRight, Copy, Check, UserPlus, Globe, Smartphone, PartyPopper,
} from "lucide-react";

const PARTNER = "Brilliant";
const BRILLIANT_INVITE = "https://brilliant.org/classroom/join-v2/b08e37d3-822e-4b02-b4a1-30d86129c601";
const COHORT = "Haleyouth Foundation STEM for All 2026 Cohort";
// Value of the Brilliant Premium access each learner receives free.
const PREMIUM_ANNUAL_VALUE = "$240";

const tracks = [
  { Icon: Sigma, title: "Mathematics", desc: "From foundations to advanced topics, built through interactive problem-solving rather than rote memorisation." },
  { Icon: FlaskConical, title: "Science & Engineering", desc: "Physics, chemistry, and real-world engineering concepts you learn by doing, not just reading." },
  { Icon: Code2, title: "Computer Science", desc: "Programming, algorithms, and computational thinking, hands-on from your first lesson." },
  { Icon: Brain, title: "Data & Artificial Intelligence", desc: "How data, machine learning, and modern AI actually work, explained visually and intuitively." },
];

const benefits = [
  { Icon: BadgeCheck, title: "Free premium access", desc: `Full ${PARTNER} Premium, unlocked at no cost to you through our active partnership.` },
  { Icon: Sparkles, title: "Learn by doing", desc: "Interactive, bite-sized lessons that build real problem-solving skill, not passive video watching." },
  { Icon: Award, title: "Build a real foundation", desc: "Strengthen the maths, science, and CS base that every tech and STEM career is built on." },
  { Icon: Rocket, title: "Pathways to more", desc: "Strong, committed learners are prioritised for our other tech-skills and mentorship opportunities." },
];

// The dedication pledge. Each must be checked to submit; we record that the
// participant made the commitment.
const pledges = [
  "I will treat this free premium access as a serious opportunity and give it my genuine effort.",
  "I will study consistently and aim to complete the lessons and challenges I start.",
  "I understand access is limited, and that inactive accounts may be reassigned to another learner on the waitlist.",
  "I will share honest feedback and progress updates when Haleyouth Foundation asks for them.",
];

export default function StemForAllClient() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "Nigeria", location: "", dob: "", gender: "",
    education: "",
    hasDevice: "", hasInternet: "", hoursPerWeek: "", interests: "", motivation: "",
  });
  const [agreed, setAgreed] = useState<boolean[]>(pledges.map(() => false));
  const [copied, setCopied] = useState(false);

  const copyInvite = async () => {
    try {
      await navigator.clipboard.writeText(BRILLIANT_INVITE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard may be blocked; the link is visible to copy manually */
    }
  };

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const allAgreed = agreed.every(Boolean);
  const togglePledge = (i: number) =>
    setAgreed((a) => a.map((v, idx) => (idx === i ? !v : v)));

  const MOTIVATION_MAX_WORDS = 120;
  const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
  const setMotivation = (v: string) => {
    const words = v.trim().split(/\s+/).filter(Boolean);
    const capped = words.length > MOTIVATION_MAX_WORDS
      ? words.slice(0, MOTIVATION_MAX_WORDS).join(" ") + (/\s$/.test(v) ? " " : "")
      : v;
    set("motivation", capped);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAgreed) {
      setError("Please confirm the commitment statements before submitting.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await submitStemForAll({
        ...form,
        commitment: `Agreed to all ${pledges.length} commitment statements`,
      });
      void logConversion("skilltraining_registered", { program: "STEM for All (Brilliant)" });
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
    const steps = [
      {
        Icon: UserPlus,
        title: "Create your Brilliant account",
        desc: "Sign up (free) at brilliant.org or download the Brilliant app from the App Store or Google Play. Use the same email you entered here.",
      },
      {
        Icon: Globe,
        title: "Open the join link",
        desc: `Paste the invite link below into your browser, or tap it, to join the ${COHORT} and unlock your free Premium access.`,
      },
      {
        Icon: Smartphone,
        title: "Start learning",
        desc: "Open a course that interests you and begin. Aim for a little every day, consistency is how you get the most out of it and keep your place.",
      },
    ];

    return (
      <>
        <PageHeader title="STEM for All" subtitle="You're in. Here's how to join your Brilliant cohort." badge="STEM & Learning" />
        <section className="py-20 bg-bg-primary">
          <div className="max-w-2xl mx-auto px-4">

            {/* Celebration header */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-5"
              >
                <PartyPopper size={38} className="text-secondary" />
              </motion.div>
              <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Welcome to STEM for All!
              </h2>
              <p className="text-text-secondary">
                Thank you for signing up and making the commitment. Your free {PARTNER} Premium access is ready, follow the steps below to join the <strong>{COHORT}</strong>.
              </p>
            </motion.div>

            {/* Invite link card, animated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card-premium p-6 sm:p-8 mb-8 relative overflow-hidden"
            >
              {/* soft animated glow */}
              <motion.div
                aria-hidden
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-accent/10 blur-2xl"
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="relative">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                  <Sparkles size={13} /> Your invite link
                </span>
                <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-1">
                  <a
                    href={BRILLIANT_INVITE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 inline-flex items-center justify-center gap-2 text-center"
                  >
                    Join on Brilliant <ArrowRight size={16} />
                  </a>
                  <button
                    onClick={copyInvite}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 bg-white text-text-primary text-sm font-medium hover:border-primary/40 hover:bg-primary/5 transition-all"
                  >
                    {copied ? <><Check size={16} className="text-secondary" /> Copied!</> : <><Copy size={16} /> Copy link</>}
                  </button>
                </div>
                <p className="mt-3 text-xs text-text-secondary/80 break-all bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                  {BRILLIANT_INVITE}
                </p>
              </div>
            </motion.div>

            {/* Steps */}
            <div className="space-y-3 mb-8">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.45 + i * 0.12 }}
                  className="card-premium p-5 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0 relative">
                    <s.Icon size={19} className="text-primary" />
                    <span className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-primary text-white text-[11px] font-bold flex items-center justify-center">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-sm mb-0.5">{s.title}</h4>
                    <p className="text-text-secondary text-xs leading-relaxed">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center text-text-secondary text-sm"
            >
              We&apos;ve also emailed these details to you. Questions? Reach us at{" "}
              <a href="mailto:info@haleyouthfoundation.org" className="text-primary font-medium hover:underline">info@haleyouthfoundation.org</a>.
            </motion.p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="STEM for All"
        subtitle={`Free premium access to ${PARTNER} for committed learners, through our active partnership.`}
        badge="STEM & Learning"
      />

      <section className="py-16 sm:py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro + partnership */}
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-xs uppercase tracking-wider text-text-secondary/70 font-semibold">In partnership with</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/partners/brilliant.webp"
                alt="Brilliant"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-text-secondary leading-relaxed">
              Haleyouth Foundation has partnered with <strong>{PARTNER}</strong> to open world-class STEM learning to
              young people in our communities. Through this partnership we provide <strong>free {PARTNER} Premium
              access</strong> so learners can master maths, science, computer science, and AI the way they are best
              learned, by solving real problems interactively. Access is a gift and a responsibility: we offer it to
              learners who are ready to show up and make the most of it.
            </p>
          </div>

          {/* Highlight */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="card-premium p-8 border-l-4 border-accent relative overflow-hidden">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider rounded-full">
                  <Sparkles size={13} /> Free Premium Access
                </span>
                <span className="inline-flex items-center gap-1.5 text-text-secondary text-xs">
                  <Users size={14} /> Limited places, allocated to committed learners
                </span>
              </div>
              <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Learn STEM on {PARTNER}, at no cost
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                {PARTNER} is a premium interactive learning platform used by millions worldwide. Through Haleyouth
                Foundation you can access it free. Sign up below, make the commitment, and we will guide you through
                activating your access.
              </p>

              {/* Value callout */}
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <div className="inline-flex items-baseline gap-2 rounded-xl bg-primary/5 px-4 py-2.5">
                  <span className="text-xs text-text-secondary uppercase tracking-wider">Value of over</span>
                  <span className="text-lg font-bold text-text-secondary/70 line-through decoration-2 decoration-red-500/70">
                    {PREMIUM_ANNUAL_VALUE}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/10 text-secondary px-4 py-2.5 text-lg font-extrabold">
                  <Sparkles size={16} /> FREE for you
                </span>
              </div>

              <a href="#signup" className="btn-primary inline-flex items-center gap-2">
                <Send size={16} /> Sign up now
              </a>
            </div>
          </div>

          {/* Tracks */}
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
              What you can learn
            </h2>
            <p className="text-text-secondary/80 text-sm mt-2">Interactive courses available through {PARTNER} Premium.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 mb-16">
            {tracks.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card-premium p-6 h-full"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                    <t.Icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">{t.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{t.desc}</p>
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

          {/* Sign-up form */}
          <div id="signup" className="max-w-3xl mx-auto scroll-mt-24">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/5 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-3">
                <Target size={13} /> Sign Up
              </span>
              <h2 className="text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
                Claim your free {PARTNER} access
              </h2>
              <p className="text-text-secondary text-sm mt-2 max-w-xl mx-auto">
                Complete the form and make the commitment below. We allocate access to learners who are ready to
                dedicate themselves and get the best out of it.
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

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Education level *</label>
                    <select required value={form.education} onChange={(e) => set("education", e.target.value)} className={inputClass}>
                      <option value="">Select level</option>
                      <option>Elementary / Primary school</option>
                      <option>Secondary / Middle school / High school</option>
                      <option>College / Undergraduate</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Hours you can study weekly *</label>
                    <select required value={form.hoursPerWeek} onChange={(e) => set("hoursPerWeek", e.target.value)} className={inputClass}>
                      <option value="">Select</option>
                      <option>1&ndash;2 hours</option>
                      <option>3&ndash;5 hours</option>
                      <option>6&ndash;10 hours</option>
                      <option>More than 10 hours</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">Device for learning *</label>
                    <select required value={form.hasDevice} onChange={(e) => set("hasDevice", e.target.value)} className={inputClass}>
                      <option value="">Select</option>
                      <option>Smartphone</option>
                      <option>Laptop / computer</option>
                      <option>Tablet</option>
                      <option>Shared access</option>
                      <option>No device yet</option>
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
                  <label className="block text-sm font-medium text-text-primary mb-2">Which Brilliant courses interest you most? *</label>
                  <select required value={form.interests} onChange={(e) => set("interests", e.target.value)} className={inputClass}>
                    <option value="">Select</option>
                    <option>Foundational Math</option>
                    <option>Data Analysis</option>
                    <option>Programming &amp; Computer Science</option>
                    <option>Artificial Intelligence &amp; Machine Learning</option>
                    <option>Science &amp; Engineering</option>
                    <option>Logic &amp; Problem Solving</option>
                    <option>A mix of everything</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-text-primary">Why do you want this, and how will you use it? *</label>
                    <span className={`text-xs ${wordCount(form.motivation) >= MOTIVATION_MAX_WORDS ? "text-accent font-medium" : "text-text-secondary/70"}`}>
                      {wordCount(form.motivation)} / {MOTIVATION_MAX_WORDS} words
                    </span>
                  </div>
                  <textarea required rows={4} value={form.motivation} onChange={(e) => setMotivation(e.target.value)} className={`${inputClass} resize-none`} placeholder="Tell us your goals and how you will make the most of this access (max 120 words)..." />
                </div>

                {/* Commitment / dedication pledge */}
                <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-accent" />
                    <h4 className="font-semibold text-text-primary text-sm">Your commitment</h4>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed mb-4">
                    This access is free but limited. By signing up you are making a commitment to dedicate yourself and
                    get the best out of it. Please confirm each statement:
                  </p>
                  <div className="space-y-3">
                    {pledges.map((p, i) => (
                      <label key={i} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreed[i]}
                          onChange={() => togglePledge(i)}
                          className="mt-0.5 w-4 h-4 accent-primary shrink-0"
                        />
                        <span className="text-text-secondary text-xs leading-relaxed">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-text-secondary/80 leading-relaxed">
                  By signing up, you agree that Haleyouth Foundation may contact you about this and future
                  opportunities, and may share the details needed to provision your {PARTNER} access. Places are
                  limited and allocated based on readiness, commitment, and available capacity.
                </p>

                <button
                  type="submit"
                  disabled={loading || !allAgreed}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {loading ? "Submitting..." : "Sign up and commit"}
                </button>
                {!allAgreed && (
                  <p className="text-xs text-text-secondary/70">Please confirm all four commitment statements to enable the button.</p>
                )}
              </form>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
