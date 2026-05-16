import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";
import { SITE_CONFIG } from "@/lib/constants";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: "Haleyouth Foundation",
  alternateName: "Haleyouth",
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/images/logo_l.png`,
  description:
    "Registered Nigerian non-profit empowering youth through mentorship, STEM education, menstrual-health programs, and climate-resilient community development across Nigeria.",
  foundingDate: String(SITE_CONFIG.founded),
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_CONFIG.addressParts.streetAddress,
    addressRegion: SITE_CONFIG.addressParts.addressRegion,
    postalCode: SITE_CONFIG.addressParts.postalCode,
    addressCountry: SITE_CONFIG.addressParts.addressCountry,
  },
  email: SITE_CONFIG.email,
  identifier: `CAC ${SITE_CONFIG.registrationNumber}`,
  sameAs: [
    SITE_CONFIG.social.facebook,
    SITE_CONFIG.social.twitter,
    SITE_CONFIG.social.linkedin,
    SITE_CONFIG.social.instagram,
  ],
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Haleyouth Foundation — Strengthening Youth Potentials",
    template: "%s | Haleyouth Foundation",
  },
  description:
    "Haleyouth Foundation is a registered non-profit empowering youth through mentorship, advancing STEM education, and fostering community development in Nigeria and across Africa.",
  keywords: [
    "Haleyouth Foundation",
    "youth empowerment",
    "Nigeria NGO",
    "STEM education",
    "girl child education",
    "African development",
    "community development",
    "scholarships",
    "climate action",
  ],
  authors: [{ name: "Haleyouth Foundation" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://haleyouthfoundation.org",
    siteName: "Haleyouth Foundation",
    title: "Haleyouth Foundation — Strengthening Youth Potentials",
    description:
      "Empowering youth through mentorship, STEM education, and community development in Nigeria and across Africa.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@HaleYouth_F",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
