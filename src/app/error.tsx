"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (typeof console !== "undefined") {
      console.error(error);
    }
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-bg-primary py-20">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} className="text-accent" />
        </div>
        <h1
          className="text-2xl sm:text-3xl font-bold text-text-primary mb-3"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Something went wrong
        </h1>
        <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-7 max-w-md mx-auto">
          An unexpected error occurred while loading this page. You can try again, or head back home.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="btn-primary inline-flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-text-primary text-sm font-semibold hover:bg-bg-secondary transition-all"
          >
            <Home size={16} /> Back home
          </Link>
        </div>

        {error?.digest && (
          <p className="text-text-secondary/60 text-xs mt-8">Reference: {error.digest}</p>
        )}
      </div>
    </section>
  );
}
