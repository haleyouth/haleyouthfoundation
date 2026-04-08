"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";

export default function AboutPreview() {
  const { ref, inView } = useScrollAnimation();

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative w-full aspect-[4/3]">
              <div className="absolute top-0 left-0 w-[65%] h-[75%] rounded-2xl overflow-hidden shadow-2xl z-10">
                <Image
                  src="/images/events/UNGA80_a.jpg"
                  alt="Dr. Ismaila at UNGA SDGs Roundtable"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 60vw, 30vw"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[55%] h-[65%] rounded-2xl overflow-hidden shadow-2xl z-20 border-4 border-white">
                <Image
                  src="/images/events/JabiAK ADAAVA 37.jpg"
                  alt="Pad-a-Girl community event"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/10 rounded-full -z-10" />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">
              About Haleyouth Foundation
            </p>
            <h2
              className="text-3xl lg:text-4xl font-bold text-text-primary leading-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Empowering Youth, Building Peace, Transforming Communities
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Founded in 2019 by Dr. Lukman Enegi Ismaila, Haleyouth Foundation
              operates at the intersection of youth empowerment, girl-child
              education, gender equity, and climate action — serving Nigeria and
              the broader African continent.
            </p>
            <p className="text-text-secondary leading-relaxed mb-6">
              From distributing reusable menstrual pads in Northern Nigeria to
              speaking at the United Nations General Assembly in New York, we
              believe that local action sparks global change.
            </p>

            {/* Quote */}
            <blockquote className="border-l-4 border-primary pl-4 py-2 mb-8 bg-primary/5 rounded-r-lg">
              <p className="text-text-primary italic leading-relaxed">
                &ldquo;When we succeed in our plan, lives change, and communities
                experience true peace and progress.&rdquo;
              </p>
              <cite className="text-sm text-text-secondary mt-2 block not-italic font-medium">
                — Dr. Lukman Enegi Ismaila, Founder &amp; Chairman
              </cite>
            </blockquote>

            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-primary">2019</p>
                <p className="text-sm text-text-secondary">Founded</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">2,000+</p>
                <p className="text-sm text-text-secondary">Youth Reached</p>
              </div>
              <div className="w-px bg-border" />
              <div>
                <p className="text-3xl font-bold text-primary">9+</p>
                <p className="text-sm text-text-secondary">Global Partners</p>
              </div>
            </div>

            <Link
              href="/about/our-story"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark transition-all hover:gap-3"
            >
              Read Our Full Story
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
