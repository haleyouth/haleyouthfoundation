import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// Types
export interface ContactSubmission {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "reviewed" | "responded" | "archived";
  createdAt: Timestamp | null;
}

export interface VolunteerSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  skills: string;
  availability: string;
  experience: string;
  motivation: string;
  status: "new" | "reviewed" | "accepted" | "declined";
  createdAt: Timestamp | null;
}

export interface PartnerSubmission {
  id?: string;
  orgName: string;
  contactName: string;
  email: string;
  website: string;
  type: string;
  proposal: string;
  status: "new" | "reviewed" | "accepted" | "declined";
  createdAt: Timestamp | null;
}

export interface NewsletterSubscription {
  id?: string;
  email: string;
  createdAt: Timestamp | null;
}

// Submit functions (frontend)
export async function submitContact(data: Omit<ContactSubmission, "id" | "status" | "createdAt">) {
  return addDoc(collection(db, "submissions_contact"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export async function submitVolunteer(data: Omit<VolunteerSubmission, "id" | "status" | "createdAt">) {
  return addDoc(collection(db, "submissions_volunteer"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export async function submitPartner(data: Omit<PartnerSubmission, "id" | "status" | "createdAt">) {
  return addDoc(collection(db, "submissions_partner"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export async function submitNewsletter(email: string) {
  return addDoc(collection(db, "submissions_newsletter"), {
    email,
    createdAt: serverTimestamp(),
  });
}

// Donation submission
export interface DonationSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  amount: number;
  currency: "usd" | "ngn";
  program: string;
  message: string;
  method: string;
  anonymous: boolean;
  status: "pending" | "confirmed" | "completed";
  createdAt: Timestamp | null;
}

export async function submitDonation(data: Omit<DonationSubmission, "id" | "status" | "createdAt">) {
  return addDoc(collection(db, "submissions_donations"), {
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

// Fetch functions (admin)
export async function fetchSubmissions<T extends { id?: string }>(
  collectionName: string
): Promise<T[]> {
  const q = query(collection(db, collectionName), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as T));
}

export async function updateSubmissionStatus(
  collectionName: string,
  docId: string,
  status: string
) {
  return updateDoc(doc(db, collectionName, docId), { status });
}

export async function deleteSubmission(collectionName: string, docId: string) {
  return deleteDoc(doc(db, collectionName, docId));
}
