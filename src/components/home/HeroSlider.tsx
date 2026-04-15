"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { HERO_SLIDES } from "@/lib/constants";

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  const goTo = useCallback((idx: number) => {
    setFade(false);
    setTimeout(() => {
      setCurrent(idx);
      setFade(true);
    }, 300);
  }, []);

  const next = useCallback(() => goTo((current + 1) % HERO_SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative w-full h-[100svh] min-h-[480px] max-h-[900px] overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.headline}
          fill
          className={`object-cover transition-all duration-700 ${fade ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-xl sm:max-w-2xl lg:max-w-3xl transition-all duration-500 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-full text-white/80 text-[10px] sm:text-xs font-medium tracking-wider uppercase mb-3 sm:mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Haleyouth Foundation
            </div>

            {/* Headline */}
            <h1
              className="text-[22px] leading-tight sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {slide.headline}
            </h1>

            {/* Subtitle */}
            <p className="mt-3 sm:mt-4 text-[13px] sm:text-base lg:text-lg text-white/70 leading-relaxed max-w-lg lg:max-w-2xl">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="mt-4 sm:mt-7 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <Link
                href="/get-involved/donate"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-accent to-[#BF360C] text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Donate Now
              </Link>
              <Link
                href={slide.cta.href}
                className="inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 bg-white/10 text-white text-sm font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all text-center"
              >
                {slide.cta.text}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4 border-t border-white/10">
            {/* Dots */}
            <div className="flex gap-1.5">
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === current ? "w-7 sm:w-9 bg-white" : "w-2.5 sm:w-3 bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-1.5">
              <button onClick={prev} aria-label="Previous" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
              <button onClick={next} aria-label="Next" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
