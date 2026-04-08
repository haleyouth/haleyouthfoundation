import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import { PROGRAMS } from "@/lib/constants";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

export async function generateStaticParams() {
  return PROGRAMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) return { title: "Program Not Found" };
  return { title: program.title, description: program.description };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = PROGRAMS.find((p) => p.slug === slug);
  if (!program) notFound();

  const idx = PROGRAMS.findIndex((p) => p.slug === slug);
  const prevProgram = idx > 0 ? PROGRAMS[idx - 1] : null;
  const nextProgram = idx < PROGRAMS.length - 1 ? PROGRAMS[idx + 1] : null;

  return (
    <>
      <PageHeader title={program.title} subtitle={program.description} badge={program.category} />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mb-8">
                <Image src={program.image} alt={program.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
              </div>

              <div className="prose max-w-none">
                <h2 className="text-2xl font-bold text-text-primary mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
                  About This Program
                </h2>
                <p className="text-text-secondary leading-relaxed">{program.description}</p>
                <p className="text-text-secondary leading-relaxed mt-4">
                  {program.tagline}. This program is part of Haleyouth Foundation&apos;s commitment to empowering youth, building resilient communities, and advancing sustainable development across Nigeria and Africa.
                </p>
              </div>

              {/* Stats */}
              {program.stats && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-text-primary mb-6">Impact Numbers</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {program.stats.map((stat) => (
                      <div key={stat.label} className="bg-primary/5 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-primary">{stat.value}</p>
                        <p className="text-text-secondary text-xs mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* SDG Goals */}
              {program.sdgs && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-bold text-text-primary mb-4">SDG Alignment</h3>
                  <div className="flex flex-wrap gap-2">
                    {program.sdgs.map((sdg) => (
                      <span key={sdg} className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-bold rounded-lg">
                        SDG {sdg}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-accent/10 rounded-xl p-6">
                <h3 className="font-bold text-text-primary mb-2">Support This Program</h3>
                <p className="text-text-secondary text-sm mb-4">Your donation directly supports this program and the communities it serves.</p>
                <Link href="/get-involved/donate" className="block w-full py-3 bg-accent text-white rounded-lg font-semibold text-center text-sm hover:bg-accent/90 transition-all">
                  <Heart size={14} className="inline mr-1" /> Donate Now
                </Link>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-text-primary mb-2">Want to Help?</h3>
                <p className="text-text-secondary text-sm mb-4">Join as a volunteer for this program.</p>
                <Link href="/get-involved/volunteer" className="block w-full py-3 border-2 border-primary text-primary rounded-lg font-semibold text-center text-sm hover:bg-primary hover:text-white transition-all">
                  Volunteer
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-16 pt-8 border-t border-border">
            {prevProgram ? (
              <Link href={`/programs/${prevProgram.slug}`} className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                <ArrowLeft size={16} /> {prevProgram.title}
              </Link>
            ) : <div />}
            {nextProgram ? (
              <Link href={`/programs/${nextProgram.slug}`} className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                {nextProgram.title} <ArrowRight size={16} />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>
    </>
  );
}
