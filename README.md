<div align="center">

<img src="https://cdn.simpleicons.org/expo/FFFFFF" width="48" alt="Expo" />

# FitFlow

A guided fitness onboarding app built with Expo and React Native.
FitFlow walks users through a focused, step-by-step profile setup, saves progress locally, syncs to the cloud, and lets them review everything before submitting.

<br/>

[![Expo SDK](https://img.shields.io/badge/Expo_SDK-54-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)

</div>

---

## Overview

FitFlow replaces a sprawling form with a one-question-at-a-time flow. Every step is isolated, validated before moving on, and saved immediately so users never lose their progress. When they reach the end, they get a clean summary where they can jump back and fix anything without restarting.

---

## Features

### <img src="https://api.iconify.design/ion:git-branch-outline.svg?color=%23FFFFFF" width="18" alt="Flow" /> Guided Multi-Step Flow

The onboarding is broken into focused screens instead of one long form. Users answer one thing at a time and move forward at their own pace. Progress is always visible through an animated bar at the top.

| Step | Screen | What it collects |
|------|--------|-----------------|
| 1 | Age Range | User selects their age bracket |
| 2 | Goal Selection | One or more fitness goals |
| 3 | Work Experience | Whether they have professional work history |
| 3b | Work Details | Company, role, and years — only shown if Step 3 is "yes" |
| 4 | Workout Preferences | One or more workout types they prefer |
| 5 | Profile Summary | Full review before final submission |

---

### <img src="https://api.iconify.design/ion:shuffle-outline.svg?color=%23FFFFFF" width="18" alt="Conditional" /> Conditional Step Logic

Step 3b only appears when the user says they have work experience. Selecting "no" skips that screen entirely and clears any previously entered work details from state so the final profile stays accurate.

---

### <img src="https://api.iconify.design/ion:checkmark-circle-outline.svg?color=%23FFFFFF" width="18" alt="Validation" /> Per-Step Validation

Each screen checks only what it needs before letting the user continue. There are no full-form submissions or page-level errors — just focused, inline feedback right where the problem is.

- Age range must be selected before moving on
- At least one fitness goal must be chosen
- Work experience question must be answered
- Company, role, and years are all required when work details are visible
- At least one workout preference must be selected

Errors appear inline beneath the relevant field and disappear as soon as the user corrects them.

---

### <img src="https://api.iconify.design/ion:apps-outline.svg?color=%23FFFFFF" width="18" alt="Inputs" /> Selection Controls

Single-choice questions use card-style radio options that are easy to tap and scan on a phone screen. Multi-choice questions use chip controls that let users toggle multiple answers without any extra UI overhead.

---

### <img src="https://api.iconify.design/ion:create-outline.svg?color=%23FFFFFF" width="18" alt="Edit" /> Editable Summary Screen

Before submitting, users see every answer in a structured summary. Each section has an edit button that takes them directly back to that step. They can fix one answer and return to the summary without going through the whole flow again.

---

### <img src="https://api.iconify.design/ion:save-outline.svg?color=%23FFFFFF" width="18" alt="Save" /> Local Progress Persistence

Every time the user advances a step, their answers are saved to `AsyncStorage`. Closing the app mid-flow and reopening it puts them right back where they left off.

---

### <img src="https://api.iconify.design/ion:cloud-done-outline.svg?color=%23FFFFFF" width="18" alt="Cloud" /> Firebase Cloud Sync

When the user submits their profile, the data is written to Firestore under a stable device ID generated at first launch. Local saving happens first, and the Firebase write runs as a background operation so it never blocks the UI.

---

### <img src="https://api.iconify.design/ion:cloud-offline-outline.svg?color=%23FFFFFF" width="18" alt="Offline" /> Offline Resilience

If the device has no network connection, the app keeps working. Local saves always succeed, and the sync failure is shown clearly with a retry option. Nothing is lost.

---

### <img src="https://api.iconify.design/ion:film-outline.svg?color=%23FFFFFF" width="18" alt="Animations" /> Motion and Transitions

The flow includes a handful of animations that make it feel finished without being distracting.

- Step transitions slide in and out based on direction (forward or back)
- The progress bar animates smoothly between steps
- Selection cards and chips give visual feedback on tap
- The error banner animates in when validation fails

---

### <img src="https://api.iconify.design/ion:phone-portrait-outline.svg?color=%23FFFFFF" width="18" alt="Mobile" /> Mobile-First Layout

The UI accounts for notches, gesture bars, and varying screen sizes through `react-native-safe-area-context`. Navigation controls sit at the bottom where thumbs naturally rest, and nothing important is hidden behind system chrome.

---

### <img src="https://api.iconify.design/ion:color-palette-outline.svg?color=%23FFFFFF" width="18" alt="Design" /> Shared Design System

All visual constants — colors, spacing, typography, border radius, and shadow values — live in a single theme file. Components are built once and reused throughout every step.

| Component | Purpose |
|-----------|---------|
| `RadioOption` | Card-style single-select control |
| `MultiSelectChip` | Toggleable chip for multi-select inputs |
| `TextInputField` | Styled text input with label and error state |
| `ProgressBar` | Animated step progress indicator |
| `ErrorBanner` | Animated inline error message |
| `SummaryCard` | Read-only profile section with edit action |
| `PrimaryButton` | Main action button used across all steps |

---

## Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| <img src="https://cdn.simpleicons.org/expo/FFFFFF" width="14" /> Expo SDK | 54 | App runtime, dev tooling, and native build pipeline |
| <img src="https://cdn.simpleicons.org/react/FFFFFF" width="14" /> React | 19 | Component model and UI rendering |
| <img src="https://cdn.simpleicons.org/react/FFFFFF" width="14" /> React Native | 0.81 | Cross-platform mobile UI layer |
| <img src="https://cdn.simpleicons.org/typescript/FFFFFF" width="14" /> TypeScript | 5.9 | Static typing for state, props, and service contracts |
| <img src="https://cdn.simpleicons.org/firebase/FFFFFF" width="14" /> Firebase | 12 | Firestore cloud persistence |
| <img src="https://api.iconify.design/ion:archive-outline.svg?color=%23FFFFFF" width="14" /> AsyncStorage | 2.2 | On-device progress saving |
| <img src="https://api.iconify.design/ion:brush-outline.svg?color=%23FFFFFF" width="14" /> Expo Linear Gradient | 15 | Gradient accents in the UI |
| <img src="https://api.iconify.design/ion:apps-outline.svg?color=%23FFFFFF" width="14" /> Expo Vector Icons | 15 | Ionicons used throughout the interface |
| <img src="https://api.iconify.design/ion:shield-outline.svg?color=%23FFFFFF" width="14" /> Safe Area Context | 5.6 | Notch and gesture-bar spacing |
| <img src="https://cdn.simpleicons.org/googlechrome/FFFFFF" width="14" /> React Native Web | 0.21 | Web support via Expo |
| <img src="https://api.iconify.design/ion:key-outline.svg?color=%23FFFFFF" width="14" /> UUID | 14 | Stable device ID generation |

---

## Project Structure

```
fitflow/
├── app/
│   ├── components/        # Shared UI components (RadioOption, Chip, etc.)
│   ├── constants/         # Theme tokens (colors, spacing, typography)
│   ├── hooks/             # Custom hooks for state and persistence
│   ├── services/          # Firebase config and Firestore write logic
│   ├── steps/             # Individual onboarding step screens
│   ├── types/             # Shared TypeScript interfaces
│   ├── utils/             # Helper functions (device ID, validation)
│   └── FlowContainer.tsx  # Central orchestrator for step navigation
├── App.tsx
└── index.ts
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run in browser
npm run web
```

> A `.env` file with your Firebase project config is required before running.

---

<div align="center">

Built by Team RogueDevs

</div>
