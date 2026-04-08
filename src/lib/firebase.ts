import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7EFrN_fTqv2NJGyevoLZXg1KRWiwrJ0g",
  authDomain: "haleyouth-foundation.firebaseapp.com",
  projectId: "haleyouth-foundation",
  storageBucket: "haleyouth-foundation.firebasestorage.app",
  messagingSenderId: "372768047425",
  appId: "1:372768047425:web:fa8668544510593167e1c0",
  measurementId: "G-5RFZTEGFB9",
};

// Initialize Firebase (prevent duplicate initialization)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
