"use client";

import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TIMELINE_EVENTS } from "@/lib/constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TimelineSection() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Our Journey
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            From Local Action to Global Impact
          </h2>
          <p className="text-text-secondary leading-relaxed">
            Since 2019, Haleyouth Foundation has grown from a vision into a
            movement impacting thousands of lives across Nigeria.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 origin-top"
          />

          {TIMELINE_EVENTS.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              className={`relative flex items-start mb-10 last:mb-0 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-bg-secondary z-10" />

              {/* Content card */}
              <div
                className={`ml-16 md:ml-0 md:w-[45%] ${
                  i % 2 === 0 ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"
                }`}
              >
                <div className="bg-white rounded-xl p-5 shadow-sm card-hover">
                  <span className="text-primary font-bold text-sm">
                    {event.year}
                  </span>
                  <h3 className="text-lg font-bold text-text-primary mt-1 mb-2">
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
          transition={{ delay: 1.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/about/global-recognition"
            className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
          >
            See Our Global Recognition <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
