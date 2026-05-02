// ============================================================
// hooks/usePersistence.ts — AsyncStorage + Firebase persistence
//
// Dual-layer strategy:
//   1. AsyncStorage: instant, offline-safe local save/load
//   2. Firebase: cloud backup, loaded in background on launch
//
// Load order on app open:
//   → AsyncStorage first (immediate restore, no spinner needed)
//   → Firebase in background (overwrites if available)
//   → If Firebase fails: set isSynced = false, show badge
// ============================================================

import { useCallback } from 'react';
import Storage from '../utils/storage';
import { FormData, PersistedState } from '../types';
import {
  saveProgressToFirebase,
  loadProgressFromFirebase,
} from '../services/firebase';

/** AsyncStorage key for progress data */
const STORAGE_KEY = '@guided_flow_progress';
/** AsyncStorage key for the stable device UUID */
const USER_ID_KEY = '@guided_flow_user_id';

// ─── UUID Generation ──────────────────────────────────────────
/**
 * Generates a simple UUID v4 without external library dependencies.
 * Used to create a stable, unique device ID stored in AsyncStorage.
 */
const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};



// ─── Hook ─────────────────────────────────────────────────────
export interface PersistenceHook {
  saveToLocal: (step: number, formData: FormData) => Promise<void>;
  loadFromLocal: () => Promise<PersistedState | null>;
  saveToFirebase: (step: number, formData: FormData) => Promise<boolean>;
  loadFromFirebase: () => Promise<PersistedState | null>;
}

export const usePersistence = (): PersistenceHook => {

  const saveToLocal = useCallback(async (
    step: number,
    formData: FormData
  ): Promise<void> => {
    try {
      const payload: PersistedState = { step, formData };
      await Storage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.warn('[Persistence] Storage save failed:', e);
    }
  }, []);

  /** Loads saved progress; returns null if nothing saved */
  const loadFromLocal = useCallback(async (): Promise<PersistedState | null> => {
    try {
      const saved = await Storage.getItem(STORAGE_KEY);
      if (!saved) return null;
      return JSON.parse(saved) as PersistedState;
    } catch {
      return null;
    }
  }, []);

  /** Gets or creates the stable user ID */
  const getUserId = useCallback(async (): Promise<string> => {
    try {
      const existing = await Storage.getItem(USER_ID_KEY);
      if (existing) return existing;
      const newId = generateUUID();
      await Storage.setItem(USER_ID_KEY, newId);
      return newId;
    } catch {
      return generateUUID();
    }
  }, []);

  const saveToFirebase = useCallback(async (
    step: number,
    formData: FormData
  ): Promise<boolean> => {
    try {
      const userId = await getUserId();
      await saveProgressToFirebase(userId, step, formData);
      return true;
    } catch (e) {
      console.warn('[Persistence] Firebase save failed:', e);
      return false;
    }
  }, [getUserId]);

  const loadFromFirebase = useCallback(async (): Promise<PersistedState | null> => {
    try {
      const userId = await getUserId();
      return await loadProgressFromFirebase(userId);
    } catch (e) {
      console.warn('[Persistence] Firebase load failed:', e);
      return null;
    }
  }, [getUserId]);

  return { saveToLocal, loadFromLocal, saveToFirebase, loadFromFirebase };
};
