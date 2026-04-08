import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" />
      <section className="py-20 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none">
          <p className="text-text-secondary">Last updated: April 2026</p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">Acceptance of Terms</h2>
          <p className="text-text-secondary leading-relaxed">
            By accessing and using the Haleyouth Foundation website, you accept and agree to be bound by these terms. If you do not agree, please do not use the website.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">Use of Website</h2>
          <p className="text-text-secondary leading-relaxed">
            This website is provided for informational purposes about Haleyouth Foundation&apos;s programs, impact, and opportunities to get involved. All content is the property of Haleyouth Foundation unless otherwise stated.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">Donations</h2>
          <p className="text-text-secondary leading-relaxed">
            Donations made through this website are processed by third-party payment providers. All donations are voluntary and non-refundable unless otherwise agreed. Haleyouth Foundation will use donations in accordance with our stated mission and programs.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">Contact</h2>
          <p className="text-text-secondary leading-relaxed">
            Questions about these terms? Contact us at <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">{SITE_CONFIG.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
