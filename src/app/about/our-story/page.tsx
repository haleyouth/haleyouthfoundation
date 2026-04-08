import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";
import { TIMELINE_EVENTS } from "@/lib/constants";

export const metadata: Metadata = { title: "Our Story" };

export default function OurStoryPage() {
  return (
    <>
      <PageHeader title="Our Story" subtitle="From a vision born of gratitude to a movement impacting thousands." badge="About Us" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-lg max-w-none">
          <p className="text-text-secondary leading-relaxed text-lg">
            Haleyouth Foundation was born from a deeply personal journey. Our founder, <strong>Dr. Lukman Enegi Ismaila</strong>, grew up in Nigeria and benefited from scholarships and support from institutions like the First Surat Group, African Development Bank, Nile University of Nigeria, African University of Science and Technology, and the Petroleum Technology Development Fund (PTDF).
          </p>
          <p className="text-text-secondary leading-relaxed">
            &ldquo;Their belief in me carved my path and guided my motivation to give back,&rdquo; Dr. Ismaila reflects. After completing his PhD and moving to Johns Hopkins University School of Medicine as a Postdoctoral Research Fellow, that motivation became something tangible.
          </p>
          <p className="text-text-secondary leading-relaxed">
            In 2019, Haleyouth Foundation was established — a non-profit committed to empowering youth through mentorship, advancing STEM education, and fostering community development. The name &ldquo;Haleyouth&rdquo; embodies the spirit of strengthening young potentials.
          </p>

          <div className="my-12 grid sm:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image src="/images/events/Back2School.jpg" alt="Back-to-School program" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
              <Image src="/images/events/Garki_IMG_0011.jpg" alt="Pad-a-Girl event" fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-text-primary mt-12 mb-6" style={{ fontFamily: "var(--font-playfair)" }}>Our Journey</h2>

          <div className="space-y-8">
            {TIMELINE_EVENTS.map((event) => (
              <div key={event.year} className="flex gap-6">
                <div className="w-28 shrink-0">
                  <span className="text-primary font-bold text-lg">{event.year}</span>
                </div>
                <div className="border-l-2 border-primary/20 pl-6 pb-4">
                  <h3 className="font-bold text-text-primary text-lg mb-1">{event.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{event.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-primary/5 rounded-xl p-8 border-l-4 border-primary">
            <h3 className="font-bold text-text-primary text-xl mb-3">Looking Ahead</h3>
            <p className="text-text-secondary leading-relaxed">
              Today, through youth-led local programs, we are contributing to SDG 1 (No Poverty), SDG 2 (Zero Hunger), SDG 3 (Good Health and Well-being), SDG 4 (Quality Education), SDG 10 (Reduced Inequalities), SDG 13 (Climate Action), and SDG 16 (Peace, Justice &amp; Strong Institutions). We are ready to expand our reach through strategic partnerships in all our areas of focus.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
