"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { PARTNERS } from "@/lib/constants";

export default function PartnersCarousel() {
  const { ref, inView } = useScrollAnimation();
  // Duplicate for infinite scroll effect
  const doubled = [...PARTNERS, ...PARTNERS];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Our Partners
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Together We Achieve More
          </h2>
          <p className="text-text-secondary leading-relaxed">
            We are grateful to our partners who share our vision of youth
            empowerment, education, and community transformation across Africa.
          </p>
        </motion.div>
      </div>

      {/* Infinite scroll carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
        className="relative"
      >
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-primary to-transparent z-10" />

        <div className="flex partner-scroll">
          {doubled.map((partner, i) => {
            const inner = (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={160}
                height={80}
                className="object-contain max-h-16 w-auto"
              />
            );
            const cls =
              "flex-shrink-0 mx-6 flex items-center justify-center w-44 h-24 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 cursor-pointer";

            return partner.website ? (
              <a
                key={`${partner.name}-${i}`}
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className={cls}
                title={partner.name}
              >
                {inner}
              </a>
            ) : (
              <div key={`${partner.name}-${i}`} className={cls} title={partner.name}>
                {inner}
              </div>
            );
          })}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:gap-3 transition-all"
        >
          View All Partners <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
