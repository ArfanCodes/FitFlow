// ============================================================
// services/firebase.ts — Firestore config and CRUD functions
//
// IMPORTANT: Every Firestore call MUST be wrapped in try/catch.
// Firebase failures should NEVER crash the app; they surface
// as non-blocking warnings via the `isSynced` flag.
// ============================================================

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  Firestore,
} from 'firebase/firestore';
import { FormData, PersistedState } from '../types';

// ─── Firebase Project Config ─────────────────────────────────
// Values are loaded from .env via Expo's built-in env support.
// All variables must be prefixed with EXPO_PUBLIC_ to be
// accessible in client-side code (Expo SDK 49+).
const firebaseConfig = {
  apiKey:            process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId:     process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Avoid re-initializing the app on hot-reload in development
let app: FirebaseApp;
let db: Firestore;

const initFirebase = (): Firestore => {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return getFirestore(app);
};

// Lazily initialize Firestore so import-time errors are caught gracefully
const getDB = (): Firestore => {
  if (!db) {
    db = initFirebase();
  }
  return db;
};

// ─── Firestore Collection ─────────────────────────────────────
const COLLECTION = 'userProgress';

// ─── Sanitizer ───────────────────────────────────────────────
/**
 * Firestore rejects documents containing `undefined` values.
 * This helper recursively strips every `undefined` field from
 * a plain object so `setDoc` never receives one.
 *
 * - undefined  → field is omitted entirely
 * - null       → kept as-is (Firestore accepts null)
 */
function sanitize<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitize) as unknown as T;

  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    if (value !== undefined) {
      result[key] = sanitize(value);
    }
  }
  return result as T;
}

/**
 * Saves the current step + formData to Firestore.
 * Equivalent to POST /progress.
 *
 * @param userId   — stable device UUID stored in AsyncStorage
 * @param step     — current step ID
 * @param formData — full form state
 * @throws Error if Firestore call fails (caller must handle)
 */
export const saveProgressToFirebase = async (
  userId: string,
  step: number,
  formData: FormData
): Promise<void> => {
  const database = getDB();

  // Sanitize before write — Firestore throws on `undefined` fields
  // (e.g. formData.workDetails is undefined when user skips that step)
  const payload = sanitize({
    step,
    formData,
    updatedAt: new Date().toISOString(),
  });

  await setDoc(doc(database, COLLECTION, userId), payload);
};

/**
 * Loads the saved progress from Firestore.
 * Equivalent to GET /progress.
 *
 * @param userId — stable device UUID
 * @returns Persisted state or null if no document exists
 * @throws Error if Firestore call fails (caller must handle)
 */
export const loadProgressFromFirebase = async (
  userId: string
): Promise<PersistedState | null> => {
  const database = getDB();
  const docSnap = await getDoc(doc(database, COLLECTION, userId));

  if (docSnap.exists()) {
    const data = docSnap.data();
    // Validate that the document has the expected shape before returning
    if (data && typeof data.step === 'number' && data.formData) {
      return { step: data.step, formData: data.formData as FormData };
    }
  }
  return null;
};
