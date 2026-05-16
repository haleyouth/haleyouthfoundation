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

export default app;
