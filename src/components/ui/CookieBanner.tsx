"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { COOKIE_CONSENT_KEY, initAnalytics } from "@/lib/firebase";

type Choice = "accepted" | "declined";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let existing: string | null = null;
    let storageAvailable = true;
    try {
      existing = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
      storageAvailable = false;
    }

    if (existing === "accepted") {
      initAnalytics();
      return;
    }

    if (existing === "declined") return;

    if (!storageAvailable || !existing) {
      queueMicrotask(() => setVisible(true));
    }
  }, []);

  const choose = (choice: Choice) => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    } catch {
      // ignore storage errors
    }
    setVisible(false);
    if (choice === "accepted") {
      initAnalytics();
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md z-[60]"
    >
      <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 sm:p-6">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Cookie size={18} className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-text-primary text-sm">We value your privacy</h2>
            <p className="text-text-secondary text-xs leading-relaxed mt-1">
              We use strictly necessary cookies to run this site, and optional analytics cookies
              (Google Analytics 4) to understand how visitors use it. Analytics cookies are only
              set if you accept. See our{" "}
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <button
            type="button"
            onClick={() => choose("declined")}
            aria-label="Decline analytics cookies"
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 text-text-primary hover:bg-bg-secondary transition-all"
          >
            Decline analytics
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="flex-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-primary text-white hover:bg-primary/90 transition-all"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
