"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Handshake } from "lucide-react";
import { PARTNERS } from "@/lib/constants";

export default function PartnersCarousel() {
  const { ref, inView } = useScrollAnimation();
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section ref={ref} className="py-24 lg:py-28 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Handshake size={12} />
            Our Partners
          </span>
          <h2
            className="text-3xl lg:text-[42px] font-bold text-text-primary mb-5 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Trusted By <span className="gradient-text">Leading Organizations</span>
          </h2>
          <p className="text-text-secondary leading-relaxed text-[15px]">
            We collaborate with international organizations, foundations, and institutions that share our vision.
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="relative py-8"
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10" />

        <div className="flex partner-scroll items-center">
          {doubled.map((partner, i) => {
            const inner = (
              <div className="flex items-center justify-center w-40 h-20 px-4 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={140}
                  height={60}
                  className="object-contain max-h-14 w-auto"
                />
              </div>
            );

            return partner.website ? (
              <a
                key={`${partner.name}-${i}`}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-8"
                title={partner.name}
              >
                {inner}
              </a>
            ) : (
              <div key={`${partner.name}-${i}`} className="flex-shrink-0 mx-8" title={partner.name}>
                {inner}
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all duration-300"
        >
          View All Partners <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
