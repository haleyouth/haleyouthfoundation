"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function AboutPreview() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section ref={ref} className="py-12 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Images */}
          <div className={`relative transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute top-0 left-0 w-[65%] h-[72%] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl z-10">
                <Image src="/images/events/UNGA80_a.jpg" alt="UNGA event" fill className="object-cover" sizes="(max-width: 1024px) 60vw, 30vw" />
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[60%] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl z-20 border-[3px] sm:border-4 border-white">
                <Image src="/images/events/JabiAK ADAAVA 37.jpg" alt="Pad-a-Girl event" fill className="object-cover" sizes="(max-width: 1024px) 50vw, 25vw" />
              </div>
              {/* Stat badge */}
              <div className="absolute -bottom-2 left-2 sm:-bottom-3 sm:left-3 bg-white rounded-lg sm:rounded-xl p-2.5 sm:p-3 shadow-lg z-30 border border-gray-100">
                <p className="text-xl sm:text-2xl font-bold text-primary">2,000+</p>
                <p className="text-[10px] sm:text-xs text-gray-500">Youth Reached</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className={`transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-primary text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" /> About Us
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
              Empowering Youth,{" "}
              <span className="gradient-text">Building Peace</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-3">
              Founded in 2019 by passionate young professionals with a hunger for change, Haleyouth Foundation operates at the intersection of youth empowerment, girl-child education, gender equity, and climate action.
            </p>
            <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed mb-5">
              From distributing reusable menstrual pads in Northern Nigeria to speaking at the United Nations — we believe that <em>local action sparks global change</em>.
            </p>

            {/* Quote */}
            <div className="border-l-[3px] border-primary/30 pl-4 mb-6 py-1">
              <p className="text-gray-800 italic text-sm leading-relaxed">
                &ldquo;When we succeed in our plan, lives change, and communities experience true peace and progress.&rdquo;
              </p>
              <p className="text-xs text-gray-500 mt-1">— <span className="text-primary">Haleyouth Foundation</span></p>
            </div>

            {/* Mini stats */}
            <div className="flex gap-5 sm:gap-8 mb-6">
              {[{ v: "2019", l: "Founded" }, { v: "2K+", l: "Youth" }, { v: "9+", l: "Partners" }].map((s) => (
                <div key={s.l}>
                  <p className="text-lg sm:text-xl font-bold text-gray-900">{s.v}</p>
                  <p className="text-[10px] sm:text-xs text-gray-500">{s.l}</p>
                </div>
              ))}
            </div>

            <Link href="/about/our-story" className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all">
              Read Our Story
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
