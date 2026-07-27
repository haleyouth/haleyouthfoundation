import type { Metadata } from "next";
import Link from "@/components/ui/Link";
import PageHeader from "@/components/ui/PageHeader";
import ImpactMap from "@/components/impact/ImpactMap";
import { IMPACT_STATS } from "@/lib/constants";
import { Users, Heart, BookOpen, Home, GraduationCap, Handshake, TrendingUp, FileText, ExternalLink, CheckCircle2, ShieldCheck, Landmark, ScrollText, Receipt } from "lucide-react";

export const metadata: Metadata = { title: "Our Impact", description: "See the measurable impact of Haleyouth Foundation's programs across Nigeria." };

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = { Users, Heart, BookOpen, Home, GraduationCap, Handshake };

const achievements = [
  "500+ reusable menstrual pad kits distributed to girls",
  "700+ pad usage instruction cards distributed",
  "200+ rural students received learning materials",
  "100+ families supported with food and essentials",
  "3 cycles of women empowerment training delivered",
  "$250K+ cumulative scholarship value mentored",
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

          {/* Interactive impact map */}
          <div className="mb-16">
            <ImpactMap />
          </div>

          {/* Key Achievements */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-text-primary mb-6" style={{ fontFamily: "var(--font-playfair)" }}>
              Key Achievements
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <TrendingUp size={16} className="text-secondary shrink-0 mt-0.5" />
                  <span className="text-text-secondary text-sm">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* SDG Alignment */}
          <div className="bg-gradient-to-br from-primary/5 via-bg-secondary to-secondary/5 rounded-2xl p-8 sm:p-12 text-center mb-16">
            <h3 className="text-2xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>SDG Alignment</h3>
            <p className="text-text-secondary text-sm mb-8 max-w-xl mx-auto">
              Our programs proudly support global efforts in the SDGs
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {[1, 2, 3, 4, 6, 10, 12, 13, 16].map((num) => (
                <div key={num} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 cursor-default">
                  <img src={`/images/sdgs/sdg-${num}.png`} alt={`UN Sustainable Development Goal ${num}`} width={192} height={192} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Transparency & Accountability */}
          <div className="mb-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Transparency &amp; Accountability
              </h2>
              <p className="text-text-secondary text-sm max-w-2xl mx-auto">
                We hold ourselves to clear standards of governance and financial management, so
                every donor and partner can see how funds are used.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <Landmark size={22} className="text-primary mb-3" />
                <h3 className="font-bold text-text-primary text-sm mb-1.5">Registered &amp; Regulated</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Incorporated with Nigeria&rsquo;s Corporate Affairs Commission (CAC RC-138260) and
                  tax-registered.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <ShieldCheck size={22} className="text-primary mb-3" />
                <h3 className="font-bold text-text-primary text-sm mb-1.5">SCUML Registered</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Registered with the Special Control Unit Against Money Laundering (SCUML),
                  Nigeria&rsquo;s anti-money-laundering compliance authority for non-profits (RN: SC 088682).
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <Receipt size={22} className="text-primary mb-3" />
                <h3 className="font-bold text-text-primary text-sm mb-1.5">Donor Receipts</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Every confirmed gift receives a written acknowledgement and receipt within five
                  business days.
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <ScrollText size={22} className="text-primary mb-3" />
                <h3 className="font-bold text-text-primary text-sm mb-1.5">Public Reporting</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  Annual and project reports show what we delivered, who we worked with, and where
                  the money went. See below.
                </p>
              </div>
            </div>
          </div>

          {/* Reports */}
          <div>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-text-primary mb-2" style={{ fontFamily: "var(--font-playfair)" }}>
                Annual Reports
              </h2>
              <p className="text-text-secondary text-sm max-w-2xl mx-auto">
                Year-on-year, what we delivered, who we worked with, and where the money went.
              </p>
            </div>

            {/* 2025 Annual Report, hero card with embedded flipbook */}
            <article className="rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-xl transition-shadow duration-300 mb-6">
              <div className="h-2 bg-gradient-to-r from-primary via-secondary to-accent" />
              <div className="p-6 sm:p-7 lg:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
                      <FileText size={22} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-text-primary leading-tight" style={{ fontFamily: "var(--font-playfair)" }}>
                        2025 Annual Report
                      </h3>
                      <p className="text-xs text-text-secondary/80 mt-1">Reporting period: January to December 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={11} /> Available
                    </span>
                    <a
                      href="https://player.flipsnack.com?hash=NkFDQjU4N0E5RjcrZHRwMHB1ZDJneA=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      Open full view <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-3xl">
                  Headline impact, programme delivery in 2025, the cash position at year end, partner and recognition list,
                  governance and stewardship, and the year ahead in 2026. Flip through the report below, or open it on Flipsnack for a full-screen view.
                </p>

                {/* Flipsnack embed, fixed pixel height for reliable rendering */}
                <div className="rounded-xl overflow-hidden bg-neutral-50 border border-neutral-200 shadow-inner">
                  <iframe
                    src="https://player.flipsnack.com?hash=NkFDQjU4N0E5RjcrZHRwMHB1ZDJneA=="
                    title="Haleyouth Foundation Annual Report 2025"
                    width="100%"
                    height="600"
                    seamless
                    scrolling="no"
                    frameBorder={0}
                    allowFullScreen
                    allow="autoplay; clipboard-read; clipboard-write"
                    className="w-full block"
                    style={{ minHeight: "600px" }}
                  />
                </div>
              </div>
            </article>

            {/* Prior years, compact button-style */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <button
                disabled
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 text-text-secondary/80 text-sm cursor-not-allowed"
                aria-label="2024 Annual Report"
              >
                <FileText size={14} />
                <span className="font-medium">2024 Report</span>
              </button>
              <button
                disabled
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 border border-neutral-200 text-text-secondary/80 text-sm cursor-not-allowed"
                aria-label="2023 Annual Report"
              >
                <FileText size={14} />
                <span className="font-medium">2023 Report</span>
              </button>
            </div>

            <p className="text-center text-xs text-text-secondary/70">
              Looking for an earlier copy?{" "}
              <a href="mailto:info@haleyouthfoundation.org" className="text-primary hover:underline">
                info@haleyouthfoundation.org
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
