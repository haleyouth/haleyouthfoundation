import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC7EFrN_fTqv2NJGyevoLZXg1KRWiwrJ0g",
  authDomain: "haleyouth-foundation.firebaseapp.com",
  projectId: "haleyouth-foundation",
  storageBucket: "haleyouth-foundation.firebasestorage.app",
  messagingSenderId: "372768047425",
  appId: "1:372768047425:web:fa8668544510593167e1c0",
  measurementId: "G-5RFZTEGFB9",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

/**
 * Admin-only email helpers, backed by callable Cloud Functions.
 * firebase/functions is imported dynamically so it stays out of the public
 * bundle. The functions reject unauthenticated callers.
 */
export interface EmailRecipient {
  email: string;
  name?: string;
}
export interface EmailDesign {
  greetingTemplate?: string; // "Dear {name}," — {name} personalised per recipient
  heading?: string;
  signName?: string;
  signTitle?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}
export interface SendEmailPayload extends EmailDesign {
  mode: "single" | "test" | "broadcast";
  subject: string;
  body: string;
  to?: string;                 // single / test
  name?: string;               // single / test (for "Dear X,")
  recipients?: EmailRecipient[]; // broadcast
}
export interface SendEmailResult {
  ok: boolean;
  mode: string;
  sent: number;
  total?: number;
  failed?: string[];
}

async function callable<TIn, TOut>(name: string, data: TIn): Promise<TOut> {
  // Ensure Firebase Auth has resolved and a user is present before calling, so
  // the callable attaches the caller's ID token. Without this, a call made
  // before auth restores from persistence is sent unauthenticated and the
  // function rejects it with "unauthenticated".
  await auth.authStateReady();
  if (!auth.currentUser) {
    throw new Error("You are not signed in. Please sign in again and retry.");
  }
  // Force a fresh token so an expired one never causes a silent auth failure.
  await auth.currentUser.getIdToken(/* forceRefresh */ true);

  const { getFunctions, httpsCallable } = await import("firebase/functions");
  const fns = getFunctions(app, "us-central1");
  const fn = httpsCallable<TIn, TOut>(fns, name);
  const res = await fn(data);
  return res.data;
}

export function callSendEmail(input: SendEmailPayload) {
  return callable<SendEmailPayload, SendEmailResult>("sendEmail", input);
}

export function callPreviewEmail(input: EmailDesign & { subject: string; body: string; sampleName?: string }) {
  return callable<typeof input, { html: string }>("previewEmail", input);
}

export const COOKIE_CONSENT_KEY = "hyf-cookie-consent";

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(COOKIE_CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

let analyticsInstance: Analytics | null = null;

export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window === "undefined") return null;
  if (!hasAnalyticsConsent()) return null;
  if (analyticsInstance) return analyticsInstance;
  if (await isSupported()) {
    analyticsInstance = getAnalytics(app);
    return analyticsInstance;
  }
  return null;
};

/**
 * Conversion events for Ad Grants tracking.
 * Mark these as Conversions in GA4 (Admin -> Events).
 */
export type ConversionEvent =
  | "donate_intent"
  | "donate_submitted"
  | "volunteer_applied"
  | "contact_submitted"
  | "partner_applied"
  | "newsletter_signup"
  | "skilltraining_registered";

/**
 * Fire a GA4 event. No-ops when analytics consent has not been given or the
 * environment does not support analytics. Never throws, so a form submission is
 * never blocked by a tracking failure.
 */
export const logConversion = async (
  event: ConversionEvent,
  params?: Record<string, string | number | boolean>
): Promise<void> => {
  try {
    const analytics = await initAnalytics();
    if (!analytics) return;
    const { logEvent } = await import("firebase/analytics");
    logEvent(analytics, event, params);
  } catch {
    // analytics is best-effort; ignore failures
  }
};

export default app;
