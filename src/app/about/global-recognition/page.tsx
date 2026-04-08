import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import { Award, Globe, Mic, BookOpen } from "lucide-react";

export const metadata: Metadata = { title: "Global Recognition" };

const recognitions = [
  {
    icon: Mic,
    title: "UNGA SDGs Roundtable Discussion 2025",
    org: "Journalists and Writers Foundation, New York",
    description: 'Our Chairman was invited to speak on "Youth-Led Initiatives That Build Peace & Social Cohesion" at the SDGs Roundtable in the margins of the United Nations General Assembly. This milestone amplified African youth voices on a global stage.',
    image: "/images/events/DSC04757.jpg",
  },
  {
    icon: Award,
    title: "British Council Climate Action Grant 2025",
    org: "British Council Alumni UK",
    description: "Haleyouth Foundation won the Alumni UK Climate Action Grant for the Pad-a-Girl Sustainable Wellness project, reaching 500+ girls with reusable menstrual pad kits and climate awareness education in Northern Nigeria.",
    image: "/images/events/Garki_IMG_0011.jpg",
  },
  {
    icon: BookOpen,
    title: "MICCAI 2025 Oral Presentation",
    org: "Medical Image Computing and Computer Assisted Intervention Society",
    description: "The AfriBiobank project, a pan-African medical-imagery biobank conceived by our team, was selected for oral presentation at MICCAI 2025 — positioning Africa as a healthcare innovation hub powered by local data.",
  },
  {
    icon: Globe,
    title: "TEDx Okene Partnership 2023",
    org: "TEDx",
    description: "Haleyouth Foundation partnered with TEDx Okene and provided travel grants for youth to attend the event, expanding access to transformative ideas and networking opportunities.",
  },
];

export default function GlobalRecognitionPage() {
  return (
    <>
      <PageHeader title="Global Recognition" subtitle="Our work is recognized from grassroots Nigeria to the United Nations in New York." badge="About Us" />

      {/* UNGA feature */}
      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/events/UNGA80_a.jpg" alt="Haleyouth Foundation at UNGA" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">Highlight</span>
              <h2 className="text-3xl font-bold text-text-primary mt-2 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                Speaking at the United Nations
              </h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                In September 2025, our Chairman was invited to speak at the SDGs Roundtable Discussion in the margins of the United Nations General Assembly in New York, hosted by the Journalists and Writers Foundation.
              </p>
              <p className="text-text-secondary leading-relaxed mb-6">
                The talk on &ldquo;Youth-Led Initiatives That Build Peace &amp; Social Cohesion&rdquo; drew from grassroots experiences at Haleyouth Foundation — demonstrating how local action can drive peace, justice, and sustainable development on a global stage.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src="/images/events/UNGA80_b.jpg" alt="UNGA SDGs group photo" fill className="object-cover" sizes="200px" />
                </div>
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <Image src="/images/events/Unga80_c.jpg" alt="Receiving recognition plaque" fill className="object-cover" sizes="200px" />
                </div>
              </div>
            </div>
          </div>

          {/* All recognitions */}
          <h2 className="text-2xl font-bold text-text-primary text-center mb-10" style={{ fontFamily: "var(--font-playfair)" }}>
            Recognition &amp; Milestones
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {recognitions.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm card-hover">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-primary text-sm font-medium mb-2">{item.org}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
