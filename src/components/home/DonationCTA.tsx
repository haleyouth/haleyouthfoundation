"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, BookOpen, Shirt, ArrowRight } from "lucide-react";

const amounts = [
  { amount: "$25", impact: "Provides learning materials for 5 students", icon: BookOpen, color: "from-blue-500/10 to-blue-600/5" },
  { amount: "$50", impact: "Supplies reusable pad kits for 10 girls", icon: Heart, color: "from-accent/10 to-accent/5" },
  { amount: "$100", impact: "Sponsors a child's school term", icon: Shirt, color: "from-secondary/10 to-secondary/5" },
];

export default function DonationCTA() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 bg-bg-primary relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.03] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-primary/[0.03] blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-accent/5 rounded-full text-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <Heart size={12} className="fill-accent" />
              Make a Difference
            </span>
            <h2
              className="text-2xl sm:text-3xl lg:text-[42px] font-bold text-text-primary mb-5 leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Every Contribution Builds<br />
              <span className="gradient-text">a Brighter Tomorrow</span>
            </h2>
            <p className="text-text-secondary leading-relaxed text-[15px] max-w-xl mx-auto">
              Your generous donation helps us keep girls in school, train young
              people with marketable skills, and transform communities across Nigeria.
            </p>
          </motion.div>

          {/* Amount Cards */}
          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {amounts.map((item, i) => (
              <motion.div
                key={item.amount}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                className={`card-premium p-7 text-center bg-gradient-to-br ${item.color} border-0`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-accent" />
                </div>
                <p className="text-3xl font-bold text-text-primary mb-2 tracking-tight">
                  {item.amount}
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">{item.impact}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <Link
              href="/get-involved/donate"
              className="btn-accent inline-flex items-center gap-2.5 !text-lg !px-10 !py-4"
            >
              <Heart size={20} className="fill-white" />
              Donate Now
              <ArrowRight size={18} />
            </Link>
            <p className="text-text-secondary/60 text-xs mt-4 tracking-wide">
              Secure payments via Paystack &amp; Stripe &bull; Tax-deductible where applicable
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
