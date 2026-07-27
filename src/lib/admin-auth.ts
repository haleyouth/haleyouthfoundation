/**
 * Admin authentication via Firebase Auth.
 *
 * Replaces the previous hardcoded-credential + localStorage scheme, which was
 * public in the shipped bundle and trivially bypassable. Real access control now
 * lives in Firebase Auth (login) and firestore.rules (`request.auth != null` on
 * every admin write).
 *
 * firebase/auth is imported dynamically so it stays out of the public site
 * bundle and only loads inside the /admin area.
 *
 * Setup (one time, in the Firebase console):
 *   Authentication -> Sign-in method -> enable Email/Password
 *   Authentication -> Users -> Add user (the admin email + a strong password)
 */
import app from "@/lib/firebase";

export type AdminUser = { uid: string; email: string | null };

export async function signInAdmin(
  email: string,
  password: string
): Promise<AdminUser> {
  const { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } =
    await import("firebase/auth");
  const auth = getAuth(app);
  await setPersistence(auth, browserLocalPersistence);
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return { uid: cred.user.uid, email: cred.user.email };
}

export async function signOutAdmin(): Promise<void> {
  const { getAuth, signOut } = await import("firebase/auth");
  await signOut(getAuth(app));
}

/**
 * Subscribe to auth state. Calls `cb` with the current user (or null) once
 * resolved, and again on every change. Returns an unsubscribe function.
 */
export async function watchAdmin(
  cb: (user: AdminUser | null) => void
): Promise<() => void> {
  const { getAuth, onAuthStateChanged } = await import("firebase/auth");
  const auth = getAuth(app);
  return onAuthStateChanged(auth, (user) => {
    cb(user ? { uid: user.uid, email: user.email } : null);
  });
}

/**
 * Turn a Firebase Auth error code into a friendly message.
 */
export function authErrorMessage(err: unknown): string {
  const code =
    typeof err === "object" && err !== null && "code" in err
      ? String((err as { code: unknown }).code)
      : "";
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password. Please try again.";
    case "auth/invalid-email":
      return "That does not look like a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Please wait a moment and try again.";
    case "auth/network-request-failed":
      return "Network error. Check your connection and try again.";
    default:
      return "Sign in failed. Please try again.";
  }
}
