import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <section className="py-20 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none">
          <p className="text-text-secondary">Last updated: April 2026</p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">Introduction</h2>
          <p className="text-text-secondary leading-relaxed">
            Haleyouth Foundation ({SITE_CONFIG.registration}) respects your privacy and is committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">Information We Collect</h2>
          <p className="text-text-secondary leading-relaxed">
            We may collect information you provide directly: name, email address, phone number, and message content through our contact, volunteer, and donation forms. We also collect anonymous usage data through analytics to improve our website experience.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">How We Use Your Data</h2>
          <p className="text-text-secondary leading-relaxed">
            Personal information is used solely to respond to your inquiries, process donations, manage volunteer applications, and send newsletter updates (with your consent). We do not sell or share your data with third parties for marketing purposes.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">Data Protection</h2>
          <p className="text-text-secondary leading-relaxed">
            We implement appropriate security measures to protect your personal data. Donation transactions are processed through secure third-party payment providers (Paystack/Stripe) and we do not store payment card details.
          </p>
          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">Contact</h2>
          <p className="text-text-secondary leading-relaxed">
            For privacy-related inquiries, contact us at <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">{SITE_CONFIG.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
