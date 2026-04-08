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
    <section ref={ref} className="py-20 lg:py-28 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            What We Do
          </p>
          <h2
            className="text-3xl lg:text-4xl font-bold text-text-primary mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Programs
          </h2>
          <p className="text-text-secondary leading-relaxed">
            From menstrual health to STEM education, we run impactful programs
            that address real challenges facing young people in Nigeria and Africa.
          </p>
        </motion.div>

        {/* Featured Programs - Large Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {featured.map((program, i) => {
            const Icon = iconMap[program.icon] || Heart;
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group block bg-white rounded-2xl overflow-hidden shadow-sm card-hover h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-primary rounded-full">
                      {program.category}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon size={20} className="text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                        {program.title}
                      </h3>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {program.tagline}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      Learn More <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Other Programs - Smaller Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {others.map((program, i) => {
            const Icon = iconMap[program.icon] || Heart;
            return (
              <motion.div
                key={program.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              >
                <Link
                  href={`/programs/${program.slug}`}
                  className="group block bg-white rounded-xl p-4 text-center shadow-sm card-hover h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-primary transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">
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
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition-all"
          >
            View All Programs
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
