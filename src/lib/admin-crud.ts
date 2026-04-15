import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

// Generic CRUD for any collection
export async function fetchAll<T extends { id?: string }>(col: string): Promise<T[]> {
  try {
    const q = query(collection(db, col), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
  } catch {
    // If ordering fails (no createdAt), fetch without order
    const snap = await getDocs(collection(db, col));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T));
  }
}

export async function addItem(col: string, data: Record<string, unknown>) {
  return addDoc(collection(db, col), { ...data, createdAt: serverTimestamp() });
}

export async function updateItem(col: string, id: string, data: Record<string, unknown>) {
  return updateDoc(doc(db, col, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteItem(col: string, id: string) {
  return deleteDoc(doc(db, col, id));
}
