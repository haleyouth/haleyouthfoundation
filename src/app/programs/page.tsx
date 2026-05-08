"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope, HandHeart, Handshake, Compass, TreePine, Wrench, Globe, Languages, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { PROGRAMS, PROGRAM_CATEGORIES } from "@/lib/constants";
import { SDGBadge } from "@/components/ui/SDGIcons";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope, HandHeart, Handshake, Compass, TreePine, Wrench, Globe,
};

const FOCUSED_PROGRAMS: { title: string; tagline: string; Icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { title: "STEM Training", tagline: "Hands-on science, technology, engineering, and mathematics for young innovators.", Icon: Microscope },
  { title: "Humanitarian Projects", tagline: "Food drives, emergency support, and social assistance for families in need.", Icon: HandHeart },
  { title: "Language and Heritage", tagline: "Reviving Nigerian languages and celebrating cultural heritage.", Icon: Languages },
  { title: "Youth Skill Acquisition", tagline: "Practical, marketable skills for economic independence.", Icon: Wrench },
];

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHeader title="Our Programs" subtitle="Impactful programs addressing real challenges facing young people in Nigeria and Africa." badge="What We Do" />

      <section className="py-12 sm:py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Focused Programs - standalone strategic priorities */}
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
              Focused Programs
            </h2>
            <p className="text-text-secondary/80 text-sm mt-2">Our core areas of strategic focus.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-14 sm:mb-20">
            {FOCUSED_PROGRAMS.map((item, i) => {
              const Icon = item.Icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                >
                  <div className="card-premium card-lightning p-7 text-center h-full">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center mx-auto mb-4 transition-all duration-500">
                      <Icon size={26} className="text-primary" />
                    </div>
                    <h3 className="text-base font-bold text-text-primary mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-text-secondary text-[13px] leading-relaxed">
                      {item.tagline}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Current Programs subheading */}
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-text-primary" style={{ fontFamily: "var(--font-playfair)" }}>
              Current Programs
            </h2>
            <p className="text-text-secondary/80 text-sm mt-2">Explore each program in detail — filter by category below.</p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8 sm:mb-14">
            {PROGRAM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-white text-text-secondary hover:bg-primary/5 hover:text-primary border border-gray-200 hover:border-primary/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Programs grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7"
            >
              {filtered.map((program, i) => {
                const Icon = iconMap[program.icon] || Heart;
                return (
                  <motion.div
                    key={program.slug}
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={`/programs/${program.slug}`} className="group block card-premium card-lightning overflow-hidden h-full relative">
                      {/* Image section */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={program.image}
                          alt={program.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-[800ms] ease-out"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                        {/* Hover details overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/85 to-primary/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-5 text-center">
                          <div className="text-white">
                            <Icon size={28} className="mx-auto mb-3 opacity-90" />
                            <h4 className="font-bold text-base mb-2 leading-tight">{program.title}</h4>
                            <p className="text-[12px] leading-relaxed text-white/90 line-clamp-5">{program.description}</p>
                            {program.stats && (
                              <div className="flex justify-center gap-3 mt-3">
                                {program.stats.slice(0, 2).map((stat) => (
                                  <div key={stat.label} className="text-center">
                                    <p className="text-sm font-bold leading-none">{stat.value}</p>
                                    <p className="text-[9px] uppercase tracking-wider text-white/70 mt-1">{stat.label}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                          <span className="px-3 py-1.5 bg-white/95 backdrop-blur-sm text-[11px] font-semibold text-primary rounded-lg shadow-sm">
                            {program.category}
                          </span>
                          {program.featured && (
                            <span className="flex items-center gap-1 px-2.5 py-1.5 bg-accent text-[10px] font-bold text-white rounded-lg uppercase tracking-wider shadow-sm">
                              <Sparkles size={10} /> Featured
                            </span>
                          )}
                        </div>

                        {/* Stats overlay */}
                        {program.stats && (
                          <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                            {program.stats.slice(0, 2).map((stat) => (
                              <div key={stat.label} className="bg-white/15 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10 flex-1">
                                <p className="text-white font-bold text-base leading-none">{stat.value}</p>
                                <p className="text-white/60 text-[10px] mt-0.5">{stat.label}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0 group-hover:from-primary/20 group-hover:to-primary/10 transition-all duration-500">
                            <Icon size={22} className="text-primary" />
                          </div>
                          <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors duration-300 leading-tight">
                            {program.title}
                          </h3>
                        </div>

                        <p className="text-text-secondary text-sm leading-relaxed mb-5 line-clamp-3">
                          {program.description}
                        </p>

                        {/* SDG icons */}
                        {program.sdgs && (
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {program.sdgs.map((sdg) => (
                              <SDGBadge key={sdg} num={sdg} size="sm" />
                            ))}
                          </div>
                        )}

                        {/* CTA */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <span className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            Learn More <ArrowRight size={15} />
                          </span>
                          {program.featured && (
                            <span className="text-[10px] text-text-secondary/50 uppercase tracking-wider">Flagship</span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
