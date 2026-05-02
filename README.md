# <img src="https://cdn.simpleicons.org/expo/000000" width="26" alt="Expo icon" /> FitFlow

FitFlow is a guided fitness onboarding app built with Expo and React Native. It collects a user's profile step by step, saves progress locally, syncs it to Firebase, and lets the user review everything before submitting.

## <img src="https://api.iconify.design/ion:sparkles-outline.svg?color=%23000000" width="22" alt="Features icon" /> Features

### <img src="https://api.iconify.design/ion:git-branch-outline.svg?color=%23000000" width="18" alt="Flow icon" /> Guided Profile Flow

FitFlow uses a clean multi-step flow instead of a bulky screen stack. The user moves through one focused question at a time, which keeps the experience simple and easy to follow.

- <img src="https://api.iconify.design/ion:person-outline.svg?color=%23000000" width="16" alt="Person icon" /> Age range selection
- <img src="https://api.iconify.design/ion:trophy-outline.svg?color=%23000000" width="16" alt="Trophy icon" /> Fitness goal selection
- <img src="https://api.iconify.design/ion:briefcase-outline.svg?color=%23000000" width="16" alt="Briefcase icon" /> Work experience question
- <img src="https://api.iconify.design/ion:business-outline.svg?color=%23000000" width="16" alt="Business icon" /> Conditional work details form
- <img src="https://api.iconify.design/ion:flash-outline.svg?color=%23000000" width="16" alt="Flash icon" /> Workout preference selection
- <img src="https://api.iconify.design/ion:reader-outline.svg?color=%23000000" width="16" alt="Reader icon" /> Final profile review

### <img src="https://api.iconify.design/ion:shuffle-outline.svg?color=%23000000" width="18" alt="Conditional icon" /> Conditional Step Logic

The work details screen only appears when the user says they have professional work experience. If they select no, the app skips that screen and clears old work details so the final profile stays clean.

### <img src="https://api.iconify.design/ion:checkmark-circle-outline.svg?color=%23000000" width="18" alt="Validation icon" /> Step-by-Step Validation

Each screen validates only the information it needs before the user can continue.

- <img src="https://api.iconify.design/ion:calendar-outline.svg?color=%23000000" width="16" alt="Calendar icon" /> Age range must be selected
- <img src="https://api.iconify.design/ion:trophy-outline.svg?color=%23000000" width="16" alt="Trophy icon" /> At least one goal is required
- <img src="https://api.iconify.design/ion:briefcase-outline.svg?color=%23000000" width="16" alt="Briefcase icon" /> Work experience must be answered
- <img src="https://api.iconify.design/ion:business-outline.svg?color=%23000000" width="16" alt="Business icon" /> Company, role, and years of experience are required when work details are shown
- <img src="https://api.iconify.design/ion:flash-outline.svg?color=%23000000" width="16" alt="Flash icon" /> At least one preference is required

Errors are shown inline, so the user can fix the issue without being interrupted by popup alerts.

### <img src="https://api.iconify.design/ion:apps-outline.svg?color=%23000000" width="18" alt="Selection icon" /> Single and Multi-Select Inputs

The app uses card-style radio options for single-choice questions and chip-based controls for multi-select questions. It feels quick on mobile and keeps the choices easy to scan.

### <img src="https://api.iconify.design/ion:create-outline.svg?color=%23000000" width="18" alt="Edit icon" /> Editable Summary

Before submitting, the user gets a full summary of their profile. Each section can be edited, so they do not have to restart the whole flow to fix one answer.

### <img src="https://api.iconify.design/ion:save-outline.svg?color=%23000000" width="18" alt="Save icon" /> Local Progress Saving

Progress is saved with AsyncStorage, so the user can close the app and come back without losing their answers.

### <img src="https://api.iconify.design/ion:cloud-done-outline.svg?color=%23000000" width="18" alt="Cloud icon" /> Firebase Sync

The app syncs profile progress to Firebase Firestore using a stable device ID. Local saving happens first, while Firebase sync runs in the background.

### <img src="https://api.iconify.design/ion:cloud-offline-outline.svg?color=%23000000" width="18" alt="Offline icon" /> Offline-Friendly Handling

If Firebase is unavailable, the app keeps working and saves progress locally. Sync errors are shown clearly, and the user can retry instead of losing their data.

### <img src="https://api.iconify.design/ion:film-outline.svg?color=%23000000" width="18" alt="Animation icon" /> Smooth Motion

FitFlow includes small animations that make the flow feel more polished without getting in the way.

- <img src="https://api.iconify.design/ion:swap-horizontal-outline.svg?color=%23000000" width="16" alt="Slide icon" /> Direction-aware step transitions
- <img src="https://api.iconify.design/ion:bar-chart-outline.svg?color=%23000000" width="16" alt="Progress icon" /> Animated progress bar
- <img src="https://api.iconify.design/ion:radio-button-on-outline.svg?color=%23000000" width="16" alt="Selection icon" /> Selection feedback on options and chips
- <img src="https://api.iconify.design/ion:alert-circle-outline.svg?color=%23000000" width="16" alt="Alert icon" /> Animated error banner

### <img src="https://api.iconify.design/ion:phone-portrait-outline.svg?color=%23000000" width="18" alt="Mobile icon" /> Mobile-First UI

The interface is built for phones first, with safe-area handling for notches, gesture bars, and different screen sizes. The bottom navigation keeps the main action easy to reach.

### <img src="https://api.iconify.design/ion:color-palette-outline.svg?color=%23000000" width="18" alt="Theme icon" /> Shared Design System

Colors, spacing, typography, shadows, and radius values are managed through a shared theme file. Reusable components keep the design consistent across every step.

- <img src="https://api.iconify.design/ion:radio-button-on-outline.svg?color=%23000000" width="16" alt="Radio icon" /> `RadioOption`
- <img src="https://api.iconify.design/ion:grid-outline.svg?color=%23000000" width="16" alt="Grid icon" /> `MultiSelectChip`
- <img src="https://api.iconify.design/ion:text-outline.svg?color=%23000000" width="16" alt="Text icon" /> `TextInputField`
- <img src="https://api.iconify.design/ion:remove-outline.svg?color=%23000000" width="16" alt="Progress icon" /> `ProgressBar`
- <img src="https://api.iconify.design/ion:alert-circle-outline.svg?color=%23000000" width="16" alt="Alert icon" /> `ErrorBanner`
- <img src="https://api.iconify.design/ion:reader-outline.svg?color=%23000000" width="16" alt="Summary icon" /> `SummaryCard`
- <img src="https://api.iconify.design/ion:arrow-forward-outline.svg?color=%23000000" width="16" alt="Button icon" /> `PrimaryButton`

## <img src="https://api.iconify.design/ion:layers-outline.svg?color=%23000000" width="22" alt="Tech stack icon" /> Tech Stack

- <img src="https://cdn.simpleicons.org/expo/000000" width="16" alt="Expo icon" /> `Expo SDK 54` for the app runtime, development workflow, and native build support
- <img src="https://cdn.simpleicons.org/react/000000" width="16" alt="React icon" /> `React 19` for component-based UI
- <img src="https://cdn.simpleicons.org/react/000000" width="16" alt="React Native icon" /> `React Native 0.81` for cross-platform mobile screens
- <img src="https://cdn.simpleicons.org/typescript/000000" width="16" alt="TypeScript icon" /> `TypeScript 5.9` for strict typing across state, props, and form data
- <img src="https://cdn.simpleicons.org/firebase/000000" width="16" alt="Firebase icon" /> `Firebase 12` for Firestore cloud persistence
- <img src="https://api.iconify.design/ion:archive-outline.svg?color=%23000000" width="16" alt="Storage icon" /> `AsyncStorage` for local progress saving
- <img src="https://api.iconify.design/ion:brush-outline.svg?color=%23000000" width="16" alt="Gradient icon" /> `Expo Linear Gradient` for gradient UI accents
- <img src="https://api.iconify.design/ion:apps-outline.svg?color=%23000000" width="16" alt="Icons icon" /> `Expo Vector Icons` for Ionicons across the interface
- <img src="https://api.iconify.design/ion:shield-outline.svg?color=%23000000" width="16" alt="Safe area icon" /> `React Native Safe Area Context` for notch and gesture-bar spacing
- <img src="https://api.iconify.design/ion:globe-outline.svg?color=%23000000" width="16" alt="Web icon" /> `React Native Web` for web support through Expo

