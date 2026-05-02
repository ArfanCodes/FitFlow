# Architecture Overview

## FitFlow — Multi-Step Guided Flow App

---

## 1. High-Level Architecture

```
App (Entry Point)
└── SafeAreaProvider
    └── FlowContainer (Presentational root — no business logic)
        ├── useFlowState hook  ← ALL state + navigation logic
        │   └── usePersistence hook ← AsyncStorage + Firebase I/O
        ├── ProgressBar (animated)
        ├── ErrorBanner (API errors)
        ├── StepRenderer (conditionally renders one step at a time)
        │   ├── Step1_AgeRange
        │   ├── Step2_GoalSelection
        │   ├── Step3_WorkExperience
        │   ├── Step3b_WorkDetails  ← CONDITIONAL
        │   ├── Step4_Preferences
        │   └── Step5_Summary
        └── NavigationBar (Next / Back)
```

---

## 2. Single-Screen Architecture Decision

**Decision:** The entire flow is rendered in one screen. A `step` integer controls which component is visible.

**Why not React Navigation?**
- Avoids prop-drilling the shared `formData` state across navigators
- Step transitions are simple `Animated.timing` slides — no navigator overhead
- Back navigation with preserved state is trivial via `getPrevStep()`
- Conditional steps (Step 3b) are handled with a computed array, not route guards

**Trade-off:** Deep-linking to a specific step requires manual state restoration (handled via AsyncStorage + Firebase on launch).

---

## 3. State Management

**Decision:** `useReducer`-equivalent via `useState` + a single hook (`useFlowState`).

No Redux/Zustand/MobX — the state shape is shallow enough that React state is sufficient and avoids build complexity.

```typescript
interface AppState {
  step: number;        // current step ID (1, 2, 3, 3.5, 4, 5)
  formData: FormData;  // single source of truth for all inputs
  error: string | null;
  isLoading: boolean;
  isSynced: boolean;
}
```

**Why a single `formData` object?**
- Prevents state synchronization bugs between sibling components
- Makes serialization to AsyncStorage/Firebase trivial (one `JSON.stringify`)
- When editing from the Summary screen, all data is already in one place

**Why `step` as a float (3.5)?**
- Step IDs are semantic identifiers, not array indices
- Allows inserting Step 3b between 3 and 4 without renumbering
- `getStepSequence()` handles the ordering dynamically

---

## 4. Conditional Flow Logic

**Decision:** A `getStepSequence(formData)` function returns the ordered step ID array for the current state. All navigation uses this — never hardcoded `step + 1`.

```typescript
const getStepSequence = (formData: FormData): number[] => {
  const steps = [1, 2, 3];
  if (formData.hasWorkExperience === true) steps.push(3.5);
  steps.push(4, 5);
  return steps;
};
```

**Why computed sequence instead of if/else branches?**
- Adding/removing steps requires only modifying `getStepSequence`
- Progress indicator automatically reflects the correct total (4 or 5 steps)
- "Edit" from Summary still navigates correctly regardless of path taken

**Trade-off:** Step 3.5 uses a float ID which is slightly unconventional. An alternative is using string IDs (`"3b"`) but that requires a more complex step comparison throughout.

---

## 5. Dual-Layer Persistence

**Strategy:**
1. **AsyncStorage** — instant, offline-safe, always written on `handleNext`
2. **Firebase Firestore** — cloud backup, written in background (non-blocking)

**Load order on app open:**
```
1. AsyncStorage → restore immediately (no spinner for user)
2. Firebase → overwrites if available (silent background update)
3. Firebase failure → show offline badge, continue normally
```

**Why AsyncStorage first, not Firebase first?**
- Firebase requires a network round-trip (latency)
- Users should never wait for network on launch
- Firebase data is only "better" if they used another device

**Why a stable UUID for Firebase document ID?**
- No auth system required for the demo
- UUID is generated once and stored in AsyncStorage
- Allows data portability if auth is added later

---

## 6. Error Handling Strategy

| Error Type | Where Shown | Behavior |
|---|---|---|
| Validation errors | Inline in step, red text | Cleared on any input change |
| Firebase API errors | `ErrorBanner` at top | Dismissable + Retry button |
| Offline / no sync | Persistent `ErrorBanner` | Non-dismissable, shows until online |
| AsyncStorage failure | `console.warn` only | Non-critical, flow continues |

**Rule:** Firebase failures NEVER crash the app. Every Firestore call is wrapped in `try/catch` and returns a boolean success flag.

**No `Alert.alert()`** for validation — inline errors are less disruptive and don't block the user.

---

## 7. Animation Decisions

| Animation | Implementation | Why |
|---|---|---|
| Step transition | `Animated.timing` slide + fade | Direction-aware (forward/backward) for spatial consistency |
| Progress bar fill | `Animated.timing` width interpolation | Smooth visual feedback on step advance |
| Radio/chip selection | `Animated.spring` scale + bg color | Tactile, springy feel consistent with modern mobile UX |
| Error banner | `Animated.timing` slide down + fade in | Non-jarring appearance; dismissal reverses animation |

**Why `useNativeDriver: false` for some animations?**
- `backgroundColor` and `width` cannot use the native driver
- These are isolated to specific animations; transforms/opacity use native driver where possible

---

## 8. Component Design System

All UI components import from `constants/theme.ts`. No ad-hoc margins or colors.

**Spacing scale:** `4, 8, 12, 16, 24, 32, 48` — every margin/padding uses one of these.
**Reusable components:** `PrimaryButton`, `RadioOption`, `MultiSelectChip`, `TextInputField`, `ProgressBar`, `ErrorBanner`, `SummaryCard`.

**Why enforce a design system?**
- Prevents visual inconsistency as the app scales
- Makes theming (dark mode, brand refresh) a single-file change

---

## 9. TypeScript Strictness

`tsconfig.json` is set to `"strict": true`. Key enforcements:
- No `any` types — all Firebase data is validated before casting
- All optional fields use `?` — never `| undefined` on required fields
- `FormData` is the canonical interface; never ad-hoc inline types

---

## 10. File Structure Rationale

```
/app
  /components  — Reusable UI primitives (no business logic)
  /steps       — Step-specific screens (receive data as props)
  /hooks       — Business logic (state, persistence)
  /services    — External APIs (Firebase)
  /utils       — Pure functions (validation, step sequence)
  /constants   — Design tokens (theme)
  /types       — Shared interfaces
```

This separation means:
- Steps can be tested in isolation with mock props
- Hooks can be tested without rendering components
- Services can be swapped (e.g., Firebase → Supabase) with minimal changes
