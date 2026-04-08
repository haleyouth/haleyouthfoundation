import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { Heart, Users, Handshake, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Get Involved" };

const options = [
  { icon: Heart, title: "Donate", description: "Your financial support helps us keep girls in school, train youth, and transform communities.", href: "/get-involved/donate", cta: "Donate Now", accent: true },
  { icon: Users, title: "Volunteer", description: "Share your skills, time, and passion to directly impact the lives of young people.", href: "/get-involved/volunteer", cta: "Apply to Volunteer" },
  { icon: Handshake, title: "Partner With Us", description: "Collaborate with us as an organization to amplify impact and drive change.", href: "/get-involved/partner-with-us", cta: "Become a Partner" },
];

export default function GetInvolvedPage() {
  return (
    <>
      <PageHeader title="Get Involved" subtitle="There are many ways to join the movement and make a difference." badge="Join Us" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {options.map((opt) => (
              <Link key={opt.title} href={opt.href} className="group block bg-white rounded-2xl p-8 shadow-sm card-hover text-center h-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${opt.accent ? "bg-accent/10" : "bg-primary/10"}`}>
                  <opt.icon size={28} className={opt.accent ? "text-accent" : "text-primary"} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{opt.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6">{opt.description}</p>
                <span className={`inline-flex items-center gap-2 font-semibold text-sm group-hover:gap-3 transition-all ${opt.accent ? "text-accent" : "text-primary"}`}>
                  {opt.cta} <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
