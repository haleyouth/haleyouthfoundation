"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TIMELINE_EVENTS } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export default function TimelineSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 lg:py-32 section-gradient-light relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Calendar size={12} />
            Our Journey
          </span>
          <h2
            className="text-3xl lg:text-[42px] font-bold text-text-primary mb-5 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            From Local Action to<br /><span className="gradient-text">Global Impact</span>
          </h2>
          <p className="text-text-secondary leading-relaxed text-[15px]">
            Since 2019, Haleyouth Foundation has grown from a vision into a movement impacting thousands of lives.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{ background: 'linear-gradient(180deg, transparent 0%, #1565C030 10%, #1565C030 90%, transparent 100%)' }}
          />

          {TIMELINE_EVENTS.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`relative flex items-start mb-12 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-3 h-3 bg-primary rounded-full ring-4 ring-bg-secondary" />
              </div>

              {/* Content card */}
              <div
                className={`ml-14 md:ml-0 md:w-[44%] ${
                  i % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                }`}
              >
                <div className="card-premium p-6">
                  <span className="inline-block px-2.5 py-0.5 bg-primary/5 text-primary text-xs font-bold rounded-md mb-2">
                    {event.year}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    {event.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="text-center mt-14"
        >
          <Link
            href="/about/global-recognition"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300"
          >
            See Our Global Recognition <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
