"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope, HandHeart, Handshake, Compass, TreePine, Wrench, Globe } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import { PROGRAMS, PROGRAM_CATEGORIES } from "@/lib/constants";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Heart, BookOpen, GraduationCap, Microscope, Laptop, Stethoscope, HandHeart, Handshake, Compass, TreePine, Wrench, Globe,
};

export default function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? PROGRAMS : PROGRAMS.filter((p) => p.category === activeCategory);

  return (
    <>
      <PageHeader title="Our Programs" subtitle="Impactful programs addressing real challenges facing young people in Nigeria and Africa." badge="What We Do" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {PROGRAM_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-bg-secondary text-text-secondary hover:bg-primary/10 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Programs grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((program, i) => {
              const Icon = iconMap[program.icon] || Heart;
              return (
                <motion.div
                  key={program.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <Link href={`/programs/${program.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm card-hover h-full">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={program.image} alt={program.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 33vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-primary rounded-full">{program.category}</span>
                      {program.featured && <span className="absolute top-4 right-4 px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">Featured</span>}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon size={20} className="text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-text-primary group-hover:text-primary transition-colors">{program.title}</h3>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed mb-4">{program.description}</p>
                      {program.sdgs && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {program.sdgs.map((sdg) => (
                            <span key={sdg} className="w-6 h-6 text-[10px] font-bold bg-primary/10 text-primary rounded flex items-center justify-center">
                              {sdg}
                            </span>
                          ))}
                        </div>
                      )}
                      <span className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        Learn More <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
