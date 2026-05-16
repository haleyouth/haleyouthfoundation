import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing your use of the Haleyouth Foundation website, including donations, content rights, third-party links, and limitations of liability.",
  alternates: { canonical: "https://haleyouthfoundation.org/terms-of-service" },
};

const LAST_UPDATED = "May 2026";

export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms of Service" />
      <section className="py-20 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none">
          <p className="text-text-secondary">Last updated: {LAST_UPDATED}</p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">1. Acceptance of Terms</h2>
          <p className="text-text-secondary leading-relaxed">
            By accessing or using the Haleyouth Foundation website (the &ldquo;Site&rdquo;) you
            agree to be bound by these Terms of Service and our Privacy Policy. If you do not
            agree, please do not use the Site.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">2. About Haleyouth Foundation</h2>
          <p className="text-text-secondary leading-relaxed">
            Haleyouth Foundation is a non-profit organisation registered in Nigeria under{" "}
            {SITE_CONFIG.registration}. Our registered address is {SITE_CONFIG.address}.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">3. Use of the Site</h2>
          <p className="text-text-secondary leading-relaxed">
            The Site is provided for informational purposes about our programs, impact, and
            opportunities to support our work. You agree not to use the Site to: (a) violate any
            law; (b) infringe intellectual-property or other rights; (c) transmit malware or
            attempt to interfere with the operation of the Site; or (d) misrepresent your
            identity when submitting any form.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">4. Intellectual Property</h2>
          <p className="text-text-secondary leading-relaxed">
            All content on the Site &mdash; text, photographs, logos, graphics, and program
            materials &mdash; is owned by Haleyouth Foundation or used with permission, and is
            protected by Nigerian and international copyright laws. You may share links to our
            content. Reproduction, republication, or commercial use requires prior written
            permission.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">5. Donations</h2>
          <p className="text-text-secondary leading-relaxed">
            Donations made through this Site are processed by regulated third-party providers
            (such as Paystack, Stripe, and Guaranty Trust Bank). All donations are voluntary.
            Funds will be applied to the program you designate, or to our general fund where no
            program is specified. Donations are non-refundable except where required by law or
            in the case of an error attributable to us, in which case you may contact{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
              {SITE_CONFIG.email}
            </a>{" "}
            within 14 days of the transaction.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">6. Receipts and Tax Treatment</h2>
          <p className="text-text-secondary leading-relaxed">
            Every donor receives a written acknowledgement within 5 business days of confirmed
            payment. Haleyouth Foundation is a CAC-registered non-profit; donations may be
            tax-deductible in Nigeria under applicable provisions. Donors outside Nigeria should
            consult their own tax advisor regarding deductibility.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">7. Third-Party Links</h2>
          <p className="text-text-secondary leading-relaxed">
            The Site links to partner organisations, social-media channels, and payment
            processors. We are not responsible for the content, privacy practices, or terms of
            third-party sites.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">8. Disclaimers</h2>
          <p className="text-text-secondary leading-relaxed">
            The Site is provided &ldquo;as is&rdquo; without warranties of any kind, whether
            express or implied. We do not warrant that the Site will be uninterrupted or
            error-free. To the maximum extent permitted by law, Haleyouth Foundation is not
            liable for indirect, incidental, or consequential damages arising from your use of
            the Site.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">9. Governing Law</h2>
          <p className="text-text-secondary leading-relaxed">
            These Terms are governed by the laws of the Federal Republic of Nigeria. Any
            dispute will be resolved in the competent courts of Nigeria.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">10. Changes &amp; Contact</h2>
          <p className="text-text-secondary leading-relaxed">
            We may revise these Terms from time to time; the &ldquo;Last updated&rdquo; date at
            the top reflects the most recent revision. Continued use of the Site after a
            revision constitutes acceptance of the new Terms. Questions about these Terms?
            Contact us at{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
              {SITE_CONFIG.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
