import { ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function MissionStatement() {
  return (
    <section className="bg-bg-secondary border-y border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <ShieldCheck size={20} className="text-primary" />
          </div>
          <p className="text-text-primary text-sm sm:text-base leading-relaxed">
            <span className="font-semibold">Haleyouth Foundation</span> is a registered Nigerian
            non-profit ({SITE_CONFIG.registration}, founded {SITE_CONFIG.founded}) empowering
            youth through mentorship, STEM education, menstrual-health programs, and
            climate-resilient community development across Nigeria.
          </p>
        </div>
      </div>
    </section>
  );
}
