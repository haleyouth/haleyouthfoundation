"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope, HandHeart, Handshake, Compass, TreePine, Wrench, Globe, Sparkles } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { PROGRAMS, PROGRAM_CATEGORIES } from "@/lib/constants";
import { SDGBadge } from "@/components/ui/SDGIcons";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope, HandHeart, Handshake, Compass, TreePine, Wrench, Globe,
};

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHeader title="Our Programs" subtitle="Impactful programs addressing real challenges facing young people in Nigeria and Africa." badge="What We Do" />

      <section className="py-24 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-14">
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
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-7"
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
                    <Link href={`/programs/${program.slug}`} className="group block card-premium overflow-hidden h-full">
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
