import type { Metadata } from "next";
import PageHeader from "@/components/ui/PageHeader";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Haleyouth Foundation collects, uses, and protects your personal data, including analytics, cookies, donor records, and your rights under the Nigeria Data Protection Regulation.",
  alternates: { canonical: "https://haleyouthfoundation.org/privacy-policy" },
};

const LAST_UPDATED = "May 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <section className="py-20 bg-bg-primary">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none">
          <p className="text-text-secondary">Last updated: {LAST_UPDATED}</p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">1. Data Controller</h2>
          <p className="text-text-secondary leading-relaxed">
            Haleyouth Foundation ({SITE_CONFIG.registration}), a registered Nigerian non-profit, is
            the data controller responsible for personal information collected via this website.
            You can reach our team at{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
              {SITE_CONFIG.email}
            </a>{" "}
            or by post at {SITE_CONFIG.address}.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">2. What We Collect</h2>
          <ul className="text-text-secondary leading-relaxed list-disc pl-5 space-y-1">
            <li>
              <strong>Form submissions</strong> &mdash; name, email address, phone number, message
              content, and any other information you choose to share through our contact,
              volunteer, partnership, donation, and newsletter forms.
            </li>
            <li>
              <strong>Donor records</strong> &mdash; for donations, we additionally retain the
              amount, currency, allocated program, and payment method you indicate.
            </li>
            <li>
              <strong>Analytics data</strong> &mdash; Google Analytics 4 via Firebase collects
              pseudonymous data such as pages viewed, approximate device, browser, IP-derived
              location, and referring URL through cookies (see &sect;7).
            </li>
            <li>
              <strong>Server logs</strong> &mdash; our hosting provider (Firebase Hosting) records
              standard access logs (IP, timestamp, requested URL) for security and operations.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">3. How We Use Your Data</h2>
          <p className="text-text-secondary leading-relaxed">
            We use the information you provide to respond to your inquiries, process donations
            and issue receipts, manage volunteer and partner applications, and send newsletter
            updates where you have opted in. Analytics data is used in aggregate to understand
            how the site is used and to improve content and accessibility. We do not sell your
            data, and we do not share it with third parties for their own marketing.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">4. Legal Basis for Processing</h2>
          <p className="text-text-secondary leading-relaxed">
            We process personal data under the Nigeria Data Protection Regulation (NDPR) and,
            where applicable to visitors from the European Economic Area, the General Data
            Protection Regulation (GDPR). The legal bases we rely on are: <strong>your consent</strong> (when
            you submit a form, subscribe to the newsletter, or accept analytics cookies),
            <strong> performance of an agreement</strong> (when you make a donation), and{" "}
            <strong>legitimate interest</strong> (to operate, secure, and improve the website).
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">5. Third-Party Processors</h2>
          <p className="text-text-secondary leading-relaxed">
            We share personal data only with the service providers we rely on to operate the
            site and our programs. Each provider is bound by their own data-protection terms:
          </p>
          <ul className="text-text-secondary leading-relaxed list-disc pl-5 space-y-1">
            <li>
              <strong>Google &amp; Firebase</strong> &mdash; hosting, Firestore database, Firebase
              Authentication, and Google Analytics 4.
            </li>
            <li>
              <strong>Payment processors</strong> &mdash; for online donations, payments are
              handled by regulated providers such as Paystack and Stripe. We do not see or store
              your full card details.
            </li>
            <li>
              <strong>Guaranty Trust Bank</strong> &mdash; for direct bank-transfer donations to
              our Naira and domiciliary accounts.
            </li>
          </ul>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">6. Data Retention</h2>
          <p className="text-text-secondary leading-relaxed">
            Contact and volunteer form submissions are retained for up to 24 months after our
            last interaction with you. Analytics data is retained for 14 months by default in
            Google Analytics 4. Donor records, including donation receipts, are retained for a
            minimum of 6 years to satisfy Nigerian non-profit financial-record obligations. You
            may request earlier deletion subject to those legal requirements.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">7. Cookies</h2>
          <p className="text-text-secondary leading-relaxed">
            We use a small number of cookies. Strictly necessary cookies keep the site working
            and remember your cookie-consent choice. Optional analytics cookies set by Google
            Analytics 4 / Firebase (<code>_ga</code>, <code>_ga_&lt;ID&gt;</code>) help us
            understand site usage. Analytics cookies are only set after you accept them via the
            consent banner shown on first visit; you can change your choice at any time by
            clearing site data in your browser, or by using the{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Google Analytics opt-out browser add-on
            </a>
            .
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">8. Your Rights</h2>
          <p className="text-text-secondary leading-relaxed">
            Under the NDPR (and GDPR where applicable) you have the right to access your
            personal data, request correction or deletion, object to processing, withdraw
            consent, request portability, and lodge a complaint with the supervisory authority.
            In Nigeria, the supervisory authority is the Nigeria Data Protection Commission
            (NDPC, formerly NITDA). To exercise any of these rights, email us at{" "}
            <a href={`mailto:${SITE_CONFIG.email}`} className="text-primary hover:underline">
              {SITE_CONFIG.email}
            </a>{" "}
            and we will respond within 30 days.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">9. Children</h2>
          <p className="text-text-secondary leading-relaxed">
            Our programs serve young people, but this website is directed at adults (donors,
            volunteers, partners, and guardians). We do not knowingly collect personal data from
            children under 13 through the website. If you believe a child has provided personal
            data, contact us and we will delete it.
          </p>

          <h2 className="text-xl font-bold text-text-primary mt-8 mb-3">10. Changes to This Policy</h2>
          <p className="text-text-secondary leading-relaxed">
            We may update this policy from time to time. The &ldquo;Last updated&rdquo; date at
            the top reflects the most recent revision. Material changes will be announced on the
            site.
          </p>
        </div>
      </section>
    </>
  );
}
