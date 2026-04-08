"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope, HandHeart, Handshake, Compass, TreePine, Wrench, Globe } from "lucide-react";
import { PROGRAMS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope,
  HandHeart, Handshake, Compass, TreePine, Wrench, Globe,
};

export default function ProgramsShowcase() {
  const { ref, inView } = useScrollAnimation();
  const featured = PROGRAMS.filter((p) => p.featured);
  const others = PROGRAMS.filter((p) => !p.featured).slice(0, 6);

  return (
    <section ref={ref} className="py-24 lg:py-32 section-gradient-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            What We Do
          </span>
          <h2
            className="text-3xl lg:text-[42px] font-bold text-text-primary mb-5 leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Programs
          </h2>
          <p className="text-text-secondary leading-relaxed text-[15px]">
            From menstrual health to STEM education, we run impactful programs
            that address real challenges facing young people in Nigeria and Africa.
          </p>
        </motion.div>

        {/* Featured Programs - Large Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {featured.map((program, i) => {
            const Icon = iconMap[program.icon] || Heart;
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group block card-premium overflow-hidden h-full"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-[11px] font-semibold text-primary rounded-full">
                      {program.category}
                    </span>
                    <span className="absolute top-4 right-4 px-2.5 py-1 bg-accent/90 text-[10px] font-bold text-white rounded-full uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center shrink-0">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {program.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-2.5 transition-all duration-300">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Other Programs - Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {others.map((program, i) => {
            const Icon = iconMap[program.icon] || Heart;
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group block card-premium p-5 text-center h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors duration-300 mb-1">
                    {program.title}
                  </h3>
                  <p className="text-[11px] text-text-secondary line-clamp-2 leading-relaxed">
                    {program.tagline}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 px-7 py-3 border-2 border-primary text-primary rounded-xl font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All 12 Programs
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
