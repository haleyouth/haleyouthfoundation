import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { ArrowRight, Target, Eye, Heart, Users, Shield, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Haleyouth Foundation — our mission, vision, leadership, and journey from grassroots Nigeria to global impact.",
};

const values = [
  { icon: Heart, title: "Compassion", description: "We lead with empathy, prioritizing the dignity and wellbeing of every individual we serve." },
  { icon: Shield, title: "Integrity", description: "We maintain transparency and accountability in all our operations and financial management." },
  { icon: Users, title: "Inclusivity", description: "We ensure our programs reach the most marginalized communities, especially girls and women." },
  { icon: Globe, title: "Innovation", description: "We combine local wisdom with creative approaches to solve community challenges sustainably." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Haleyouth Foundation"
        subtitle="Empowering youth, building peace, and transforming communities across Nigeria and Africa since 2019."
        badge="Who We Are"
      />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Our Story
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                Haleyouth Foundation was founded in 2019 by passionate young professionals driven by a hunger for change. Our team comprises individuals who benefited from scholarships and institutional support, which guided their motivation to give back to their communities.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                That collective investment in education carved a path and inspired the creation of the Haleyouth Foundation — a non-profit committed to empowering youth through mentorship, advancing STEM education, and fostering community development.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                Through various programmes, the foundation has reached thousands of young people and women in Nigeria, creating opportunities for growth, resilience, and leadership aligned with the Sustainable Development Goals.
              </p>

              <blockquote className="border-l-4 border-primary pl-4 py-2 mb-8 bg-primary/5 rounded-r-lg">
                <p className="text-text-primary italic">
                  &ldquo;Start local. Pick a problem you can see and touch. Define clear goals. Onboard fellow changemakers. Define your impact plan. Review and adapt.&rdquo;
                </p>
                <cite className="text-sm text-text-secondary mt-2 block not-italic font-medium">
                  — Haleyouth Foundation, UNGA SDGs Roundtable 2025
                </cite>
              </blockquote>

              <div className="flex flex-wrap gap-3">
                <Link href="/about/our-story" className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark transition-all">
                  Read Full Story <ArrowRight size={16} />
                </Link>
                <Link href="/about/leadership" className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-primary text-primary rounded-lg font-semibold text-sm hover:bg-primary hover:text-white transition-all">
                  Meet Our Team <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image src="/images/events/UNGA80_a.jpg" alt="Haleyouth Foundation at UNGA" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <p className="text-3xl font-bold text-primary">2019</p>
                <p className="text-sm text-text-secondary">Year Founded</p>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/10 rounded-full -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Target size={24} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Our Mission</h3>
              <p className="text-text-secondary leading-relaxed">
                To empower youth through mentorship, advance STEM education for all, and foster community development that creates lasting positive change in Nigeria and across Africa. We believe in building resilient communities and advancing equity for a brighter tomorrow.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Eye size={24} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-playfair)" }}>Our Vision</h3>
              <p className="text-text-secondary leading-relaxed">
                Youth empowerment for immediate transformation of our society. We envision a world where every young person has access to quality education, economic opportunities, and the support needed to become agents of peace, justice, and sustainable development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-text-primary text-center mb-12" style={{ fontFamily: "var(--font-playfair)" }}>Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-xl card-hover bg-bg-secondary">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section className="py-12 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-text-secondary text-sm">
            Haleyouth Foundation is a registered non-profit organization — <strong>CAC/IT/NO 154820</strong> — fully compliant and tax-registered in Nigeria.
          </p>
        </div>
      </section>
    </>
  );
}
