<div align="center">

<img src="./assets/icon.png" width="80" alt="FitFlow Logo" />

# FitFlow

A focused fitness onboarding experience built with Expo and React Native.
FitFlow guides users through a clean, step-by-step profile setup with local persistence and cloud synchronization.

[![Expo SDK](https://img.shields.io/badge/Expo_SDK-54-black?style=flat-square&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com)

</div>

## Overview

FitFlow replaces complex forms with a simplified, one-question-at-a-time interface. Each step is isolated and validated before progression, ensuring data integrity. Progress is saved instantly so users can resume their setup at any time.

## Core Features

### Guided Multi-Step Flow
The onboarding process is divided into logical, focused screens. This minimizes cognitive load and keeps the user focused on a single task. An animated progress indicator provides constant feedback on the remaining steps.

| Step | Screen | Collection Goal |
| :--- | :--- | :--- |
| 1 | Age Range | Demographics |
| 2 | Goal Selection | User Objectives |
| 3 | Work Experience | Professional Background |
| 3b | Work Details | Conditional Detail (Role/Years) |
| 4 | Preferences | Training Style |
| 5 | Summary | Final Verification |

### Smart Conditional Logic
The flow adapts to user input. The work details screen only appears if the user indicates they have professional experience. If they opt out, the extra step is skipped and any cached data is automatically cleared to maintain a clean profile state.

### Real-Time Validation
Validation occurs at every step to prevent errors early. Users receive immediate feedback if a selection is missing or if details are incomplete.
* Age range selection is mandatory
* At least one fitness goal must be chosen
* Work experience status must be toggled
* Role and experience years are required when the details screen is active
* At least one workout preference is needed

### Local and Cloud Synchronization
Data is persisted to `AsyncStorage` after every successful step, allowing for seamless app restarts. Upon final submission, the complete profile is synchronized with Firebase Firestore using a persistent device identifier.

### Offline Resilience
The application remains fully functional without an active network connection. Local persistence ensures no data loss, and cloud synchronization is managed with error handling and retry capabilities.

### Refined User Interface
Built with a mobile-first approach, the UI handles system safe areas for modern devices. Smooth transitions and micro-animations provide a polished feel, while a centralized design system ensures consistency across the entire flow.

## Tech Stack

| Component | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| Framework | <img src="https://cdn.simpleicons.org/expo/auto" width="16" /> **Expo SDK** | 54 | Development workflow and runtime |
| UI Library | <img src="https://cdn.simpleicons.org/react/61DAFB" width="16" /> **React Native** | 0.81 | Cross-platform UI components |
| Logic | <img src="https://cdn.simpleicons.org/react/61DAFB" width="16" /> **React** | 19 | State management and component architecture |
| Language | <img src="https://cdn.simpleicons.org/typescript/3178C6" width="16" /> **TypeScript** | 5.9 | Type safety and maintainability |
| Database | <img src="https://cdn.simpleicons.org/firebase/FFCA28" width="16" /> **Firebase** | 12 | Cloud storage and persistence |
| Storage | <img src="https://cdn.simpleicons.org/fastapi/auto" width="16" /> **AsyncStorage** | 2.2 | Local data caching |
| Visuals | <img src="https://cdn.simpleicons.org/css3/auto" width="16" /> **Linear Gradient** | 15 | UI styling and accents |
| Icons | <img src="https://cdn.simpleicons.org/ionic/auto" width="16" /> **Vector Icons** | 15 | Native iconography |

## Project Structure

```text
fitflow/
├── app/
│   ├── components/      # Reusable UI elements
│   ├── constants/       # Theme and styling tokens
│   ├── hooks/           # Persistence and state logic
│   ├── services/        # Firebase and external integrations
│   ├── steps/           # Individual flow screens
│   ├── types/           # Type definitions
│   └── FlowContainer.tsx # Main navigation logic
├── App.tsx
└── index.ts
```

## Setup Instructions

```bash
# Install dependencies
npm install

# Launch development server
npm start

# Platform specific commands
npm run android
npm run ios
npm run web
```

> Ensure a `.env` file containing your Firebase credentials is present in the root directory.

<div align="center">

Built by Arfan

</div>
