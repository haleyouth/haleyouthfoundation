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
import { db, callSendEmail, callPreviewEmail, type EmailRecipient, type SendEmailResult, type EmailDesign } from "./firebase";
export type { EmailRecipient, SendEmailResult, EmailDesign } from "./firebase";

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

export interface SkillTrainingSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  dob: string;
  gender: string;
  program: string;
  education: string;
  experience: string;
  hasLaptop: string;
  hasInternet: string;
  availability: string;
  motivation: string;
  status: "new" | "reviewed" | "shortlisted" | "referred" | "declined";
  createdAt: Timestamp | null;
}

export interface StemForAllSubmission {
  id?: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  location: string;
  dob: string;
  gender: string;
  education: string;
  occupation: string;
  experience: string;
  hasDevice: string;
  hasInternet: string;
  hoursPerWeek: string;
  interests: string;
  motivation: string;
  commitment: string; // recorded confirmation of the dedication pledge
  status: "new" | "reviewed" | "shortlisted" | "enrolled" | "declined";
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

export async function submitSkillTraining(
  data: Omit<SkillTrainingSubmission, "id" | "status" | "createdAt">
) {
  return addDoc(collection(db, "submissions_skilltraining"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export async function submitStemForAll(
  data: Omit<StemForAllSubmission, "id" | "status" | "createdAt">
) {
  return addDoc(collection(db, "submissions_stemforall"), {
    ...data,
    status: "new",
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

// ---- Outbound email (admin-only, via Cloud Functions) ----
// The admin panel calls callable Cloud Functions that render a branded email and
// send it through the Brevo API server-side. The Brevo key never touches the
// browser, and the functions reject unauthenticated callers.

/** Send one branded email to a single recipient (e.g. reply to a submission). */
export async function sendEmail(input: { to: string; subject: string; body: string; name?: string }) {
  return callSendEmail({ mode: "single", ...input });
}

/** Send a test copy to one address, exactly as recipients will receive it. */
export async function sendTestEmail(input: { to: string; subject: string; body: string; name?: string }) {
  return callSendEmail({ mode: "test", ...input });
}

/** Broadcast the branded email to many recipients, one personalised send each. */
export async function broadcastEmail(input: {
  subject: string;
  body: string;
  recipients: EmailRecipient[];
}): Promise<SendEmailResult> {
  return callSendEmail({ mode: "broadcast", ...input });
}

/** Render the branded HTML preview (no send) for the admin to view/verify. */
export async function previewEmail(input: { subject: string; body: string; sampleName?: string }) {
  return callPreviewEmail(input);
}
