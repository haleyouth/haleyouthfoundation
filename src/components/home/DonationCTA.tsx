"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart, BookOpen, Shirt } from "lucide-react";

const amounts = [
  {
    amount: "$25",
    impact: "Provides learning materials for 5 students",
    icon: BookOpen,
  },
  {
    amount: "$50",
    impact: "Supplies reusable pad kits for 10 girls",
    icon: Heart,
  },
  {
    amount: "$100",
    impact: "Sponsors a child's school term",
    icon: Shirt,
  },
];

export default function DonationCTA() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-gradient-to-br from-accent/10 via-accent/5 to-secondary/10 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
              Make a Difference
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-text-primary mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Every Contribution Builds a Brighter Tomorrow
            </h2>
            <p className="text-text-secondary leading-relaxed mb-12 max-w-2xl mx-auto">
              Your generous donation helps us keep girls in school, train young
              people with skills, and transform communities across Nigeria.
            </p>
          </motion.div>

          {/* Amount Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {amounts.map((item, i) => (
              <motion.div
                key={item.amount}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm card-hover text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-accent" />
                </div>
                <p className="text-3xl font-bold text-text-primary mb-2">
                  {item.amount}
                </p>
                <p className="text-text-secondary text-sm">{item.impact}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/get-involved/donate"
              className="inline-flex items-center gap-2 px-10 py-4 bg-accent text-white rounded-xl font-bold text-lg hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <Heart size={20} />
              Donate Now
            </Link>
            <p className="text-text-secondary text-xs mt-4">
              Secure payments via Paystack &amp; Stripe. Tax-deductible where
              applicable.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
