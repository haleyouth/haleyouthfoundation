"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight, Award, Users, Globe } from "lucide-react";

export default function AboutPreview() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-bg-primary relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 pattern-dots opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3.5]">
              {/* Main image */}
              <div className="absolute top-0 left-0 w-[68%] h-[72%] rounded-2xl overflow-hidden shadow-2xl z-10 shine-effect">
                <Image
                  src="/images/events/UNGA80_a.jpg"
                  alt="Dr. Ismaila at UNGA SDGs Roundtable"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 65vw, 35vw"
                />
              </div>
              {/* Secondary image */}
              <div className="absolute bottom-0 right-0 w-[58%] h-[62%] rounded-2xl overflow-hidden shadow-2xl z-20 border-[5px] border-white shine-effect">
                <Image
                  src="/images/events/JabiAK ADAAVA 37.jpg"
                  alt="Pad-a-Girl community event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 28vw"
                />
              </div>
              {/* Floating stat card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-4 left-4 bg-white rounded-xl p-4 shadow-xl z-30 border border-border/50"
              >
                <p className="text-3xl font-bold gradient-text">2,000+</p>
                <p className="text-xs text-text-secondary font-medium">Youth Reached</p>
              </motion.div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/5 rounded-2xl rotate-12 -z-10" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/5 rounded-full -z-10" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-full text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              About Us
            </span>
            <h2
              className="text-3xl lg:text-[40px] font-bold text-text-primary leading-[1.15] mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Empowering Youth,<br />
              <span className="gradient-text">Building Peace</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4 text-[15px]">
              Founded in 2019 by <strong className="text-text-primary">Dr. Lukman Enegi Ismaila</strong>, Haleyouth Foundation
              operates at the intersection of youth empowerment, girl-child education, gender equity, and climate action.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8 text-[15px]">
              From distributing reusable menstrual pads in Northern Nigeria to speaking at the United Nations General Assembly in New York — we believe that <em>local action sparks global change</em>.
            </p>

            {/* Quote */}
            <div className="relative mb-8 pl-5 border-l-[3px] border-primary/30">
              <div className="absolute -left-2.5 top-0 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-primary rounded-full" />
              </div>
              <p className="text-text-primary italic leading-relaxed text-[15px]">
                &ldquo;When we succeed in our plan, lives change, and communities experience true peace and progress.&rdquo;
              </p>
              <cite className="text-sm text-text-secondary mt-2 block not-italic font-medium">
                Dr. Lukman Enegi Ismaila — <span className="text-primary">Founder &amp; Chairman</span>
              </cite>
            </div>

            {/* Mini stats */}
            <div className="flex gap-8 mb-8">
              {[
                { icon: Award, value: "2019", label: "Founded" },
                { icon: Users, value: "2K+", label: "Youth" },
                { icon: Globe, value: "9+", label: "Partners" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center">
                    <stat.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-text-primary leading-none">{stat.value}</p>
                    <p className="text-xs text-text-secondary">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/about/our-story"
              className="btn-primary inline-flex items-center gap-2 text-sm"
            >
              Read Our Story
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
