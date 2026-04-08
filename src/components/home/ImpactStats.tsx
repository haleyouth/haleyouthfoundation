"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { IMPACT_STATS } from "@/lib/constants";
import { SDGRow } from "@/components/ui/SDGIcons";
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
  const count = useCountUp(stat.value, 2500, inView);
  const Icon = iconMap[stat.icon] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative group"
    >
      <div className="bg-white/[0.07] backdrop-blur-md border border-white/[0.1] rounded-2xl p-6 text-center hover:bg-white/[0.12] hover:border-white/[0.18] transition-all duration-500 hover:transform hover:-translate-y-1">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500">
          <Icon size={24} className="text-gold" />
        </div>
        <p className="text-4xl lg:text-[44px] font-bold text-white counter-number mb-1 tracking-tight leading-none">
          {stat.prefix || ""}
          {count}
          <span className="text-gold">{stat.suffix}</span>
        </p>
        <p className="text-white/45 text-[13px] font-medium tracking-wide mt-2">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export default function ImpactStats() {
  const { ref, inView } = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      className="py-28 lg:py-36 section-gradient-blue relative overflow-hidden"
    >
      {/* Premium background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.015] blur-[100px]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-gold text-xs font-semibold uppercase tracking-[0.15em] mb-5 border border-white/10"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Measuring What Matters
          </motion.span>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Real Impact,<br />Real Numbers
          </h2>
          <p className="text-white/55 leading-relaxed text-base">
            Every number represents a life touched, a community transformed, and a step toward a more equitable future.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
          {IMPACT_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* SDG Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-24 text-center"
        >
          <div className="inline-block mb-6">
            <div className="h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-6" />
            <p className="text-white/30 text-xs uppercase tracking-[0.25em] font-medium">
              Contributing to UN Sustainable Development Goals
            </p>
          </div>
          <SDGRow goals={[1, 2, 3, 4, 5, 10, 12, 13, 16]} size="md" />
        </motion.div>
      </div>
    </section>
  );
}
