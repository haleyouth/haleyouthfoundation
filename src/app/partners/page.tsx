import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { PARTNERS } from "@/lib/constants";
import { ArrowRight, ExternalLink } from "lucide-react";

export const metadata: Metadata = { title: "Our Partners" };

const tiers = [
  { key: "strategic", label: "Strategic Partners", description: "Long-term institutional partners supporting our mission at scale." },
  { key: "program", label: "Program Partners", description: "Organizations collaborating on specific programs and initiatives." },
  { key: "knowledge", label: "Knowledge Partners", description: "Institutions providing expertise, platforms, and advocacy support." },
  { key: "event", label: "Event Partners", description: "Organizations co-hosting events and conferences with us." },
];

export default function PartnersPage() {
  return (
    <>
      <PageHeader title="Our Partners" subtitle="Together we achieve more — meet the organizations sharing our vision." badge="Collaboration" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tiers.map((tier) => {
            const partners = PARTNERS.filter((p) => p.tier === tier.key);
            if (partners.length === 0) return null;
            return (
              <div key={tier.key} className="mb-16 last:mb-0">
                <h2 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                  {tier.label}
                </h2>
                <p className="text-text-secondary text-sm mb-8">{tier.description}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {partners.map((partner) => (
                    <div key={partner.name} className="bg-white rounded-xl p-6 shadow-sm card-hover flex flex-col">
                      <div className="h-20 flex items-center justify-center mb-4">
                        <Image src={partner.logo} alt={partner.name} width={160} height={60} className="object-contain max-h-16 w-auto" />
                      </div>
                      <h3 className="font-bold text-text-primary text-center mb-2">{partner.name}</h3>
                      <p className="text-text-secondary text-sm text-center mb-4 flex-1">{partner.description}</p>
                      {partner.website && (
                        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-1 text-primary text-sm font-medium hover:underline">
                          Visit Website <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Partner CTA */}
          <div className="bg-primary/5 rounded-2xl p-8 text-center mt-16">
            <h3 className="text-2xl font-bold text-text-primary mb-3" style={{ fontFamily: "var(--font-playfair)" }}>Become a Partner</h3>
            <p className="text-text-secondary max-w-xl mx-auto mb-6">
              Join our growing network of partners committed to youth empowerment, education, and community development.
            </p>
            <Link href="/get-involved/partner-with-us" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-semibold text-sm hover:bg-primary-dark transition-all">
              Partner With Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
