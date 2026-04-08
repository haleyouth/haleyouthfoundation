"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { HERO_SLIDES } from "@/lib/constants";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1000px] overflow-hidden bg-bg-dark">
      {/* Background images with Ken Burns effect */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.headline}
            fill
            className="object-cover"
            priority={current === 0}
            sizes="100vw"
          />
          <div className="hero-overlay absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute inset-0 z-[5] pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 rounded-full bg-primary/[0.05] blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/15 rounded-full text-white/80 text-xs font-medium tracking-wider uppercase mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Haleyouth Foundation
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${current}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {slide.headline}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-6 text-base sm:text-lg lg:text-xl text-white/75 leading-relaxed max-w-2xl font-light"
              >
                {slide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-10 flex flex-wrap gap-4"
              >
                <Link href="/get-involved/donate" className="btn-accent inline-flex items-center gap-2 text-base">
                  <Heart size={18} />
                  Donate Now
                </Link>
                <Link
                  href={slide.cta.href}
                  className="px-7 py-3.5 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-base border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  {slide.cta.text}
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom bar with navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6 border-t border-white/10">
            {/* Slide indicators */}
            <div className="flex items-center gap-4">
              <span className="text-white/40 text-sm font-mono">
                {String(current + 1).padStart(2, "0")} / {String(HERO_SLIDES.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className="relative h-1 rounded-full overflow-hidden transition-all duration-500"
                    style={{ width: i === current ? 48 : 16 }}
                  >
                    <div className="absolute inset-0 bg-white/20" />
                    {i === current && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 7, ease: "linear" }}
                        key={`progress-${current}`}
                        className="absolute inset-0 bg-white rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Arrow navigation */}
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous slide"
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                aria-label="Next slide"
                className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
