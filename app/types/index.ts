// ============================================================
// types/index.ts — Shared TypeScript types for the entire app
// All interfaces are strict-typed; no `any` allowed.
// ============================================================

/** Work details collected conditionally when user has work experience */
export interface WorkDetails {
  companyName: string;
  position: string;
  yearsOfExperience: string;
}

/** Single source of truth for all collected user inputs */
export interface FormData {
  ageRange: string;                    // Step 1 — single select
  goals: string[];                     // Step 2 — multi-select
  hasWorkExperience: boolean | null;   // Step 3 — yes/no toggle
  workDetails?: WorkDetails;           // Step 3b — CONDITIONAL
  preferences: string[];               // Step 4 — multi-select
}

/** Top-level application state managed by FlowContainer */
export interface AppState {
  step: number;                  // current step index (uses step IDs: 1,2,3,3.5,4,5)
  formData: FormData;            // all collected inputs
  error: string | null;         // validation or API error message
  isLoading: boolean;           // true during Firebase API calls
  isSynced: boolean | null;     // true = synced, false = failed, null = not yet attempted
}

/** Persisted shape stored in AsyncStorage and Firestore */
export interface PersistedState {
  step: number;
  formData: FormData;
}

/** Props passed from FlowContainer to each Step component */
export interface StepProps {
  formData: FormData;
  error: string | null;
  onUpdateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  onClearError: () => void;
}

/** Props for the navigation bar */
export interface NavigationBarProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
}
