import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";

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
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
