"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Send, CheckCircle, Mail } from "lucide-react";
import { submitNewsletter } from "@/lib/submissions";

export default function NewsletterSignup() {
  const { ref, inView } = useScrollAnimation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      try {
        await submitNewsletter(email);
      } catch {}
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section ref={ref} className="py-20 bg-bg-secondary border-t border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="max-w-xl mx-auto text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
            <Mail size={20} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
            Stay Updated
          </h2>
          <p className="text-text-secondary text-sm mb-8">
            Get updates on our programs, impact stories, and ways to get involved.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-secondary font-semibold bg-secondary/5 py-4 rounded-xl"
            >
              <CheckCircle size={20} />
              Thank you for subscribing!
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-5 py-3.5 rounded-xl border border-border bg-white text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm shadow-sm"
              />
              <button
                type="submit"
                className="btn-primary flex items-center gap-2 !px-6 whitespace-nowrap"
              >
                <Send size={14} />
                Subscribe
              </button>
            </form>
          )}

          <p className="text-text-secondary/40 text-[11px] mt-4">No spam, ever. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  );
}
