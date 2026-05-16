import Link from "next/link";
import type { Metadata } from "next";
import { Home, Compass, Heart, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The page you are looking for could not be found. Explore Haleyouth Foundation's programs, impact, and ways to get involved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-bg-primary py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-7xl sm:text-8xl font-bold text-primary/15 mb-4" style={{ fontFamily: "var(--font-playfair)" }}>
          404
        </p>
        <h1
          className="text-2xl sm:text-3xl font-bold text-text-primary mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          We could not find that page
        </h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The link may be broken or the page may have moved. Here are some places to continue from.
        </p>

        <div className="grid sm:grid-cols-2 gap-3 max-w-lg mx-auto">
          <Link
            href="/"
            className="card-premium p-5 text-left hover:border-primary/30 transition-all group"
          >
            <Home size={20} className="text-primary mb-2" />
            <p className="font-semibold text-text-primary text-sm">Home</p>
            <p className="text-text-secondary text-xs mt-0.5">Back to the start</p>
          </Link>

          <Link
            href="/programs"
            className="card-premium p-5 text-left hover:border-primary/30 transition-all group"
          >
            <Compass size={20} className="text-primary mb-2" />
            <p className="font-semibold text-text-primary text-sm">Programs</p>
            <p className="text-text-secondary text-xs mt-0.5">See what we do</p>
          </Link>

          <Link
            href="/get-involved/donate"
            className="card-premium p-5 text-left hover:border-accent/30 transition-all group"
          >
            <Heart size={20} className="text-accent mb-2" />
            <p className="font-semibold text-text-primary text-sm">Donate</p>
            <p className="text-text-secondary text-xs mt-0.5">Support our work</p>
          </Link>

          <Link
            href="/contact"
            className="card-premium p-5 text-left hover:border-primary/30 transition-all group"
          >
            <Mail size={20} className="text-primary mb-2" />
            <p className="font-semibold text-text-primary text-sm">Contact</p>
            <p className="text-text-secondary text-xs mt-0.5">Reach our team</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
