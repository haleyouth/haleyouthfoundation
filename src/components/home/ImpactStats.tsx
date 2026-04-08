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
  const count = useCountUp(stat.value, 2500, inView);
  const Icon = iconMap[stat.icon] || Users;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="text-center relative group"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] flex items-center justify-center mx-auto mb-5 group-hover:bg-white/[0.12] transition-all duration-300">
        <Icon size={26} className="text-gold" />
      </div>
      <p className="text-4xl lg:text-5xl font-bold text-white counter-number mb-1.5 tracking-tight">
        {stat.prefix || ""}
        {count}
        <span className="text-gold">{stat.suffix}</span>
      </p>
      <p className="text-white/50 text-sm font-medium tracking-wide">{stat.label}</p>
    </motion.div>
  );
}

export default function ImpactStats() {
  const { ref, inView } = useScrollAnimation(0.15);

  return (
    <section
      ref={ref}
      className="py-24 lg:py-32 section-gradient-blue relative overflow-hidden"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-white/[0.03] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[80px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-gold text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Our Impact
          </span>
          <h2
            className="text-3xl lg:text-[42px] font-bold text-white mb-5 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Measuring What Matters
          </h2>
          <p className="text-white/60 leading-relaxed text-[15px]">
            Every number represents a life touched, a community transformed, and a step toward a more equitable future.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {IMPACT_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>

        {/* SDG alignment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0 }}
          className="mt-20 text-center"
        >
          <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-4">
            Contributing to UN Sustainable Development Goals
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { n: 1, c: "#E5243B" }, { n: 2, c: "#DDA63A" }, { n: 3, c: "#4C9F38" },
              { n: 4, c: "#C5192D" }, { n: 5, c: "#FF3A21" }, { n: 10, c: "#DD1367" },
              { n: 12, c: "#BF8B2E" }, { n: 13, c: "#3F7E44" }, { n: 16, c: "#00689D" },
            ].map((sdg) => (
              <span
                key={sdg.n}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: sdg.c + "CC" }}
              >
                {sdg.n}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
