// ============================================================
// hooks/useFlowState.ts — Central state machine for the flow
//
// Encapsulates ALL state logic:
//   - AppState (step, formData, error, isLoading, isSynced)
//   - handleNext / handleBack navigation using getStepSequence()
//   - saveProgress (dual-layer: AsyncStorage + Firebase)
//   - App launch restoration (local first, Firebase in background)
//   - Retry mechanism for failed Firebase calls
//
// FlowContainer is purely presentational — no logic lives there.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, FormData, PersistedState } from '../types';
import { getStepSequence, getNextStep, getPrevStep } from '../utils/stepSequence';
import { validateCurrentStep } from '../utils/validation';
import { usePersistence } from './usePersistence';

// ─── Default / Initial State ──────────────────────────────────
const DEFAULT_FORM_DATA: FormData = {
  ageRange: '',
  goals: [],
  hasWorkExperience: null,
  workDetails: undefined,
  preferences: [],
};

const INITIAL_STATE: AppState = {
  step: 1,
  formData: DEFAULT_FORM_DATA,
  error: null,
  isLoading: false,
  isSynced: null,   // null = not yet attempted; avoids false "Offline" on first render
};

// ─── Timeout Helper ──────────────────────────────────────────
/**
 * Races a promise against a timeout.
 * If the promise doesn't resolve within `ms` milliseconds,
 * returns `fallback` instead of hanging forever.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  const timer = new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms));
  return Promise.race([promise, timer]);
}

// ─── Hook ─────────────────────────────────────────────────────
export interface FlowStateHook {
  state: AppState;
  handleNext: () => void;
  handleBack: () => void;
  handleEditStep: (targetStep: number) => void;
  handleSubmit: () => Promise<void>;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  clearError: () => void;
  retrySync: () => Promise<void>;
  handleReset: () => void;
  isRestoringSession: boolean;
  navigationDirection: 'forward' | 'backward';
}

export const useFlowState = (): FlowStateHook => {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const [isRestoringSession, setIsRestoringSession] = useState(true);
  const [navigationDirection, setNavigationDirection] = useState<'forward' | 'backward'>('forward');

  // Store the last step + formData for retry purposes
  const lastSavePayload = useRef<{ step: number; formData: FormData } | null>(null);

  const { saveToLocal, loadFromLocal, saveToFirebase, loadFromFirebase } = usePersistence();

  // ─── App Launch: Restore Saved State ────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      setIsRestoringSession(true);

      // Step 1: Load from AsyncStorage immediately (offline-safe)
      const localData = await loadFromLocal();
      if (localData) {
        setState((prev) => ({
          ...prev,
          step: localData.step,
          formData: localData.formData,
        }));
      }

      setIsRestoringSession(false);

      // Step 2: Attempt Firebase load in background (higher priority)
      // isSynced = true if Firebase responds (even if no doc yet = new user)
      // isSynced = false only if Firebase throws (offline / bad creds)
      try {
        const cloudData = await loadFromFirebase();
        if (cloudData) {
          setState((prev) => ({
            ...prev,
            step: cloudData.step,
            formData: cloudData.formData,
            isSynced: true,
          }));
        } else {
          // Firebase connected fine but no doc exists yet (new user) — still synced
          setState((prev) => ({ ...prev, isSynced: true }));
        }
      } catch {
        // Firebase unreachable — mark as failed so the badge shows
        setState((prev) => ({ ...prev, isSynced: false }));
      }
    };

    restoreSession();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount only

  // ─── Save Progress (dual-layer) ──────────────────────────────
  const saveProgress = useCallback(async (step: number, formData: FormData) => {
    // 1. Save locally first — instant, offline-safe, never fails visibly
    await saveToLocal(step, formData);

    // Track the payload so retrySync can resend it later
    lastSavePayload.current = { step, formData };

    // 2. Fire Firebase in the background — completely non-blocking.
    //    Never set isLoading here; the user must never wait for Firebase
    //    during normal step navigation. isSynced updates silently.
    saveToFirebase(step, formData).then((synced) => {
      setState((prev) => ({ ...prev, isSynced: synced }));
    });
  }, [saveToLocal, saveToFirebase]);

  // ─── Field Update ────────────────────────────────────────────
  const updateField = useCallback(<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) => {
    setState((prev) => ({
      ...prev,
      error: null, // Clear error on any input change
      formData: { ...prev.formData, [field]: value },
    }));
  }, []);

  // ─── Clear Error ─────────────────────────────────────────────
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // ─── Handle Next ─────────────────────────────────────────────
  const handleNext = useCallback(() => {
    const { step, formData } = state;

    // Validate current step before advancing
    const validationError = validateCurrentStep(step, formData);
    if (validationError) {
      setState((prev) => ({ ...prev, error: validationError }));
      return;
    }

    // Get next step from sequence (never hardcoded step + 1)
    const nextStep = getNextStep(step, formData);
    if (nextStep === null) return; // Already on last step

    // Clear error and advance
    setState((prev) => ({ ...prev, error: null, step: nextStep }));
    setNavigationDirection('forward');

    // Persist progress (async, non-blocking for navigation)
    saveProgress(nextStep, formData);
  }, [state, saveProgress]);

  // ─── Handle Back ─────────────────────────────────────────────
  const handleBack = useCallback(() => {
    const { step, formData } = state;

    // Back never validates — data is preserved, no errors shown
    const prevStep = getPrevStep(step, formData);
    if (prevStep === null) return; // Already on first step

    setNavigationDirection('backward');
    setState((prev) => ({ ...prev, error: null, step: prevStep }));
  }, [state]);

  // ─── Edit Step (from Summary) ────────────────────────────────
  const handleEditStep = useCallback((targetStep: number) => {
    setNavigationDirection('backward');
    setState((prev) => ({ ...prev, step: targetStep, error: null }));
  }, []);

  // ─── Submit (final save from Summary) ────────────────────────────
  const handleSubmit = useCallback(async () => {
    const { step, formData } = state;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      // 6-second timeout — if Firebase is unreachable, don't block the user forever
      const synced = await withTimeout(saveToFirebase(step, formData), 6000, false);
      setState((prev) => ({
        ...prev,
        isSynced: synced,
        error: synced ? null : 'Submission failed. Your progress is saved locally.',
      }));
    } finally {
      // Always reset loading — even if the timeout fires or an error throws
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [state, saveToFirebase]);

  // ─── Retry Failed Firebase Sync ────────────────────────────────
  const retrySync = useCallback(async () => {
    const payload = lastSavePayload.current;
    if (!payload) return;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const synced = await withTimeout(saveToFirebase(payload.step, payload.formData), 6000, false);
      setState((prev) => ({
        ...prev,
        isSynced: synced,
        error: synced ? null : 'Sync failed again. Check your internet connection.',
      }));
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }, [saveToFirebase]);

  // ─── Reset App State ──────────────────────────────────────────
  const handleReset = useCallback(() => {
    setNavigationDirection('backward');
    setState(INITIAL_STATE);
  }, []);

  return {
    state,
    handleNext,
    handleBack,
    handleEditStep,
    handleSubmit,
    updateField,
    clearError,
    retrySync,
    handleReset,
    isRestoringSession,
    navigationDirection,
  };
};
