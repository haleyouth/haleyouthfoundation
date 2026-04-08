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
      initial={{ opacity: 0, y: 60, scale: 0.85 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.2 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div className="glass-card rounded-2xl p-7 text-center transition-all duration-500 hover:-translate-y-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/25 to-gold/5 border border-gold/20 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:from-gold/35 transition-all duration-500">
          <Icon size={28} className="text-gold" />
        </div>
        <div className="mb-2">
          <span className="text-5xl lg:text-[56px] font-extrabold text-white counter-number leading-none">
            {stat.prefix || ""}{count}
          </span>
          <span className="text-3xl lg:text-4xl font-bold text-gold">{stat.suffix}</span>
        </div>
        <p className="text-white/40 text-sm font-medium tracking-wide uppercase">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export default function ImpactStats() {
  const { ref, inView } = useScrollAnimation(0.1);

  return (
    <section
      ref={ref}
      className="py-32 lg:py-40 section-gradient-blue relative overflow-hidden"
    >
      {/* Ambient light effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[700px] h-[700px] rounded-full bg-blue-400/[0.04] blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[600px] h-[600px] rounded-full bg-green-400/[0.03] blur-[120px]" />
        <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-gold/[0.03] blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 bg-white/[0.08] backdrop-blur-md rounded-full border border-white/[0.08] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-semibold uppercase tracking-[0.2em]">
              Our Impact
            </span>
          </motion.div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Real Impact,<br />
            <span className="gradient-text-warm">Real Numbers</span>
          </h2>
          <p className="text-white/50 leading-relaxed text-lg max-w-xl mx-auto">
            Every number represents a life touched, a community transformed, and a step toward a more equitable future.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {IMPACT_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* Divider */}
        <div className="my-20 flex items-center justify-center gap-4">
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-white/15" />
          <span className="text-white/20 text-xs uppercase tracking-[0.3em] font-medium">SDG Alignment</span>
          <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-white/15" />
        </div>

        {/* SDG Section with real images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="text-center"
        >
          <p className="text-white/35 text-sm mb-8 max-w-lg mx-auto">
            Our programs contribute to 9 of the 17 UN Sustainable Development Goals
          </p>
          <SDGRow goals={[1, 2, 3, 4, 6, 10, 12, 13, 16]} size="lg" />
        </motion.div>
      </div>
    </section>
  );
}
