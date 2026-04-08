"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { IMPACT_STATS } from "@/lib/constants";
import { Users, Heart, BookOpen, Home, GraduationCap, Handshake } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Users, Heart, BookOpen, Home, GraduationCap, Handshake,
};

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: (typeof IMPACT_STATS)[number];
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(stat.value, 2000, inView);
  const Icon = iconMap[stat.icon] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-accent" />
      </div>
      <p className="text-4xl lg:text-5xl font-bold text-white counter-number mb-2">
        {stat.prefix || ""}
        {count}
        {stat.suffix}
      </p>
      <p className="text-white/70 text-sm font-medium">{stat.label}</p>
    </motion.div>
  );
}

export default function ImpactStats() {
  const { ref, inView } = useScrollAnimation(0.2);

  return (
    <section
      ref={ref}
      className="py-20 lg:py-28 bg-gradient-to-br from-primary-dark via-primary to-primary-dark relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white" />
        <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            Our Impact
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Measuring What Matters
          </h2>
          <p className="text-white/75 leading-relaxed">
            Every number represents a life touched, a community transformed, and
            a step toward a more equitable future.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {IMPACT_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* SDG alignment */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-xs uppercase tracking-wider mb-3">
            Contributing to Sustainable Development Goals
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[1, 2, 3, 4, 5, 10, 12, 13, 16].map((sdg) => (
              <span
                key={sdg}
                className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-xs font-bold text-white"
              >
                {sdg}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
