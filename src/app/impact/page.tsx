import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { IMPACT_STATS } from "@/lib/constants";
import { ArrowRight, Users, Heart, BookOpen, Home, GraduationCap, Handshake, MapPin, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Our Impact", description: "See the measurable impact of Haleyouth Foundation's programs across Nigeria." };

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = { Users, Heart, BookOpen, Home, GraduationCap, Handshake };

const achievements = [
  "500+ reusable menstrual pad kits distributed to girls",
  "700+ pad usage instruction cards distributed",
  "200+ rural students received learning materials",
  "100+ families supported with food and essentials",
  "3 cycles of women empowerment training delivered",
  "$100K+ cumulative scholarship value mentored",
  "STEM workshop and digital literacy training programs delivered",
  "Climate action essay, debate, and social media competitions held",
  "Multiple community sensitization events conducted",
  "Invited to speak at UNGA SDGs Roundtable 2025",
];

export default function ImpactPage() {
  return (
    <>
      <PageHeader title="Our Impact" subtitle="Every number represents a life touched, a community transformed." badge="Measuring What Matters" />

      <section className="py-20 bg-bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {IMPACT_STATS.map((stat) => {
              const Icon = iconMap[stat.icon] || Users;
              return (
                <div key={stat.label} className="bg-white rounded-xl p-5 text-center shadow-sm card-hover">
                  <Icon size={24} className="text-primary mx-auto mb-3" />
                  <p className="text-2xl font-bold text-text-primary">{stat.prefix || ""}{stat.value}{stat.suffix}</p>
                  <p className="text-text-secondary text-xs mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Geographic reach */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Geographic Reach
              </h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                Haleyouth Foundation operates across multiple states in Nigeria, with a focus on underserved communities in Northern Nigeria. Our programs have reached communities in Abuja (FCT), Kogi, Kano, and Kaduna states.
              </p>
              <div className="space-y-3">
                {["Abuja (FCT)", "Kogi State", "Kano State", "Kaduna State"].map((loc) => (
                  <div key={loc} className="flex items-center gap-3 text-text-secondary">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
                Key Achievements
              </h2>
              <ul className="space-y-3">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <TrendingUp size={16} className="text-secondary shrink-0 mt-0.5" />
                    <span className="text-text-secondary text-sm">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SDG Alignment */}
          <div className="bg-primary/5 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-text-primary mb-4">SDG Alignment</h3>
            <p className="text-text-secondary text-sm mb-6 max-w-2xl mx-auto">
              Our programs contribute to 7 of the 17 Sustainable Development Goals.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { num: 1, title: "No Poverty" },
                { num: 2, title: "Zero Hunger" },
                { num: 3, title: "Good Health" },
                { num: 4, title: "Quality Education" },
                { num: 6, title: "Clean Water" },
                { num: 10, title: "Reduced Inequalities" },
                { num: 13, title: "Climate Action" },
                { num: 16, title: "Peace & Justice" },
              ].map((sdg) => (
                <div key={sdg.num} className="bg-white px-4 py-2 rounded-lg shadow-sm">
                  <span className="text-primary font-bold">SDG {sdg.num}</span>
                  <span className="text-text-secondary text-xs block">{sdg.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
