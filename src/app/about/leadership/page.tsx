import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Leadership" };

export default function LeadershipPage() {
  return (
    <>
      <PageHeader title="Our Leadership" subtitle="Meet the people driving Haleyouth Foundation's mission forward." badge="About Us" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Founder card */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden mb-16">
            <div className="grid md:grid-cols-[300px_1fr]">
              <div className="relative h-64 md:h-auto">
                <Image src="/images/events/Unga80_c.jpg" alt="Dr. Lukman Enegi Ismaila" fill className="object-cover" sizes="300px" />
              </div>
              <div className="p-8">
                <span className="text-primary text-sm font-semibold uppercase tracking-wider">Founder &amp; Chairman</span>
                <h2 className="text-2xl font-bold text-text-primary mt-1 mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
                  Dr. Lukman Enegi Ismaila
                </h2>
                <p className="text-text-secondary text-sm mb-4">
                  Postdoctoral Research Fellow, Johns Hopkins University School of Medicine
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  The Chairman works at the intersection of healthcare and computer science. His passion for impact has been firmly rooted in education and community development. He benefited from scholarships and support from several institutions, which guided his motivation to give back.
                </p>
                <p className="text-text-secondary leading-relaxed mb-4">
                  He is also a Fellow of the Datasphere Institute and the architect behind AfriBiobank, a pan-African medical-imagery biobank selected for oral presentation at MICCAI 2025. In 2025, he was invited to speak at the SDGs Roundtable Discussion at the United Nations General Assembly in New York.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">PhD Computer Science</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Johns Hopkins</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Datasphere Fellow</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">UNGA 2025 Speaker</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional team */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-text-primary mb-4">Our Growing Team</h3>
            <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed mb-8">
              Haleyouth Foundation is powered by a dedicated team of volunteers, program facilitators, and community champions. Our team includes stipend volunteers like Hamida, Hadiza, Shamsiyya, and Fauwzziyyah who have been instrumental in our Pad-a-Girl project delivery.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              {["Hamida", "Hadiza", "Shamsiyya", "Fauwzziyyah"].map((name) => (
                <div key={name} className="bg-bg-secondary rounded-xl p-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-xl">{name[0]}</span>
                  </div>
                  <p className="font-medium text-text-primary text-sm">{name}</p>
                  <p className="text-text-secondary text-xs">Project Volunteer</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
