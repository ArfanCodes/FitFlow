// ============================================================
// App.tsx — Entry point
//
// Wraps FlowContainer in SafeAreaProvider for proper insets
// on all device sizes. No navigation library needed — the entire
// flow is a single screen managed by step state.
// ============================================================

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlowContainer from './app/FlowContainer';

export default function App() {
  return (
    <SafeAreaProvider>
      <FlowContainer />
    </SafeAreaProvider>
  );
}
