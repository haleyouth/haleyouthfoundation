"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useCountUp } from "@/hooks/useCountUp";
import { ArrowRight, Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope, HandHeart, Handshake, Compass, TreePine, Wrench, Globe } from "lucide-react";
import { PROGRAMS } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope,
  HandHeart, Handshake, Compass, TreePine, Wrench, Globe,
};

function AnimatedStat({ value, inView }: { value: string; inView: boolean }) {
  const numericMatch = value.match(/^(\d+)/);
  if (!numericMatch) return <span>{value}</span>;
  const num = parseInt(numericMatch[1], 10);
  const suffix = value.replace(/^\d+/, "");
  const count = useCountUp(num, 2000, inView);
  return <><span className="counter-number">{count}</span>{suffix}</>;
}

export default function ProgramsShowcase() {
  const { ref, inView } = useScrollAnimation();
  const featured = PROGRAMS.filter((p) => p.featured);
  const others = PROGRAMS.filter((p) => !p.featured).slice(0, 6);

  return (
    <section ref={ref} className="py-28 lg:py-36 section-gradient-light relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/5 rounded-full text-primary text-xs font-semibold uppercase tracking-[0.15em] mb-5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            What We Do
          </span>
          <h2
            className="text-4xl lg:text-5xl font-bold text-text-primary mb-5 leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Programs That <span className="gradient-text">Transform Lives</span>
          </h2>
          <p className="text-text-secondary leading-relaxed text-base">
            From menstrual health to STEM education, we run impactful programs
            that address real challenges facing young people across Africa.
          </p>
        </motion.div>

        {/* Featured Programs - Premium Cards with Stats */}
        <div className="grid md:grid-cols-3 gap-7 mb-12">
          {featured.map((program, i) => {
            const Icon = iconMap[program.icon] || Heart;
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group block card-premium overflow-hidden h-full"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-out"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Category + Featured badges */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between">
                      <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-[11px] font-semibold text-primary rounded-lg shadow-sm">
                        {program.category}
                      </span>
                      <span className="px-2.5 py-1 bg-accent text-[10px] font-bold text-white rounded-lg uppercase tracking-wider shadow-sm">
                        Featured
                      </span>
                    </div>

                    {/* Stats overlay at bottom of image */}
                    {program.stats && (
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <div className="flex gap-3">
                          {program.stats.slice(0, 2).map((stat) => (
                            <div
                              key={stat.label}
                              className="bg-white/15 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10"
                            >
                              <p className="text-white font-bold text-lg leading-none">
                                <AnimatedStat value={stat.value} inView={inView} />
                              </p>
                              <p className="text-white/70 text-[10px] mt-0.5">{stat.label}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-300">
                        <Icon size={22} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-300">
                          {program.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5">
                      {program.tagline}
                    </p>

                    {/* SDG pills */}
                    {program.sdgs && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {program.sdgs.map((sdg) => (
                          <span
                            key={sdg}
                            className="px-2 py-0.5 text-[10px] font-bold text-white rounded-md"
                            style={{
                              backgroundColor:
                                sdg === 3 ? "#4C9F38" :
                                sdg === 4 ? "#C5192D" :
                                sdg === 5 ? "#FF3A21" :
                                sdg === 12 ? "#BF8B2E" :
                                sdg === 13 ? "#3F7E44" :
                                sdg === 1 ? "#E5243B" :
                                sdg === 10 ? "#DD1367" :
                                "#1565C0",
                            }}
                          >
                            SDG {sdg}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      Learn More <ArrowRight size={15} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Other Programs - Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-14">
          {others.map((program, i) => {
            const Icon = iconMap[program.icon] || Heart;
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 25, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group block card-premium p-5 text-center h-full"
                >
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-primary/8 to-primary/3 flex items-center justify-center mx-auto mb-3 group-hover:scale-115 group-hover:from-primary/15 group-hover:to-primary/8 transition-all duration-500 w-[52px] h-[52px]">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-[13px] font-bold text-text-primary group-hover:text-primary transition-colors duration-300 mb-1">
                    {program.title}
                  </h3>
                  <p className="text-[11px] text-text-secondary/70 line-clamp-2 leading-relaxed">
                    {program.tagline}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <Link
            href="/programs"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 border-2 border-primary text-primary rounded-xl font-semibold text-sm hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            View All 12 Programs
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
