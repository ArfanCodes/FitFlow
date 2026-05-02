// ============================================================
// app/FlowContainer.tsx — Premium root UI container
// Gradient header, icon nav, directional slide animation.
// No emojis anywhere.
// ============================================================

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  ActivityIndicator,
  Text,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFlowState } from './hooks/useFlowState';
import { getStepPosition, getProgressFraction } from './utils/stepSequence';
import ProgressBar from './components/ProgressBar';
import ErrorBanner from './components/ErrorBanner';
import PrimaryButton from './components/PrimaryButton';
import Step1_AgeRange from './steps/Step1_AgeRange';
import Step2_GoalSelection from './steps/Step2_GoalSelection';
import Step3_WorkExperience from './steps/Step3_WorkExperience';
import Step3b_WorkDetails from './steps/Step3b_WorkDetails';
import Step4_Preferences from './steps/Step4_Preferences';
import Step5_Summary from './steps/Step5_Summary';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from './constants/theme';

// ─── Step Renderer ────────────────────────────────────────────
const StepRenderer: React.FC<{
  step: number;
  formData: ReturnType<typeof useFlowState>['state']['formData'];
  error: string | null;
  isLoading: boolean;
  onUpdateField: ReturnType<typeof useFlowState>['updateField'];
  onClearError: ReturnType<typeof useFlowState>['clearError'];
  onEditStep: ReturnType<typeof useFlowState>['handleEditStep'];
  onSubmit: ReturnType<typeof useFlowState>['handleSubmit'];
  onReset: ReturnType<typeof useFlowState>['handleReset'];
}> = ({ step, formData, error, isLoading, onUpdateField, onClearError, onEditStep, onSubmit, onReset }) => {
  const common = { formData, error, onUpdateField, onClearError };
  switch (step) {
    case 1:   return <Step1_AgeRange {...common} />;
    case 2:   return <Step2_GoalSelection {...common} />;
    case 3:   return <Step3_WorkExperience {...common} />;
    case 3.5: return <Step3b_WorkDetails {...common} />;
    case 4:   return <Step4_Preferences {...common} />;
    case 5:
      return (
        <Step5_Summary
          formData={formData}
          isLoading={isLoading}
          onEditStep={onEditStep}
          onSubmit={onSubmit}
          onReset={onReset}
        />
      );
    default:  return null;
  }
};

// ─── Main Container ───────────────────────────────────────────
const FlowContainer: React.FC = () => {
  const {
    state, handleNext, handleBack, handleEditStep,
    handleSubmit,    updateField,
    clearError,
    retrySync,
    handleReset,
    isRestoringSession,
    navigationDirection,
  } = useFlowState();

  const { step, formData, error, isLoading, isSynced } = state;

  // useSafeAreaInsets gives us the exact gesture-bar / home-indicator height
  // so we can add it explicitly to the nav bar's bottom padding.
  // SafeAreaView only handles 'top' edge — we manage bottom manually here.
  const insets = useSafeAreaInsets();

  // ─── Slide animation ────────────────────────────────────────
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const startX = navigationDirection === 'forward' ? 50 : -50;
    slideAnim.setValue(startX);
    opacityAnim.setValue(0);
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const { current: currentPos, total: totalSteps } = getStepPosition(step, formData);
  const progressFraction = getProgressFraction(step, formData);
  const isFirstStep = currentPos === 1;
  const isLastStep = step === 5;

  // ─── Session Restore ────────────────────────────────────────
  if (isRestoringSession) {
    return (
      <SafeAreaView style={styles.loadingScreen} edges={['top', 'bottom']}>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientMid]}
          style={styles.loadingGradient}
          start={{ x: 0.2, y: 0 }}
          end={{ x: 0.8, y: 1 }}
        >
          <View style={styles.loadingLogoWrap}>
            <Ionicons name="fitness-outline" size={42} color={Colors.white} />
          </View>
          <Text style={styles.loadingAppName}>FitFlow</Text>
          <ActivityIndicator color={Colors.white} size="large" style={{ marginTop: Spacing.xl }} />
          <Text style={styles.loadingHint}>Restoring your session…</Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* edges={['top']} only — bottom inset is applied manually to the
          nav bar via useSafeAreaInsets so we can control exactly which
          element absorbs the gesture-bar space. */}
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* ─── App Header ──────────────────────────────────────── */}
      <View style={styles.header}>
        {/* Logo — always visible */}
        <View style={styles.headerLogoWrap}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientMid]}
            style={styles.headerLogoBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="fitness-outline" size={14} color={Colors.white} />
          </LinearGradient>
          <Text style={styles.headerLogoText}>FitFlow</Text>
        </View>
      </View>

      {/* ─── Error Banners ───────────────────────────────────── */}
      {(error && step === 5) ? (
        <ErrorBanner
          message={error}
          onRetry={retrySync}
          onDismiss={clearError}
          type="error"
        />
      ) : null}

      {/* ─── Progress Bar ────────────────────────────────────── */}
      {step !== 5 && (
        <ProgressBar
          currentStep={currentPos}
          totalSteps={totalSteps}
          progressFraction={progressFraction}
        />
      )}

      {/* ─── Step Content ────────────────────────────────────── */}
      <Animated.View
        style={[
          styles.stepArea,
          { transform: [{ translateX: slideAnim }], opacity: opacityAnim },
        ]}
      >
        <StepRenderer
          step={step}
          formData={formData}
          error={error}
          isLoading={isLoading}
          onUpdateField={updateField}
          onClearError={clearError}
          onEditStep={handleEditStep}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </Animated.View>

      {/* ─── Bottom Nav Bar ──────────────────────────────────── */}
      {step !== 5 && (
        <View
          style={[
            styles.navBar,
            // Issue 1 — Gesture Bar Overlap fix:
            // paddingBottom = gesture-bar height + 16px breathing room.
            // Using inline style (not StyleSheet) because insets.bottom
            // is a runtime value unknown at style-creation time.
            { paddingBottom: insets.bottom + Spacing.base },
          ]}
        >
          {!isFirstStep && (
            <PrimaryButton
              label="Back"
              onPress={handleBack}
              variant="outline"
              iconName="chevron-back"
              iconPosition="left"
              // Issue 5 — flex:1 Back / flex:2 Continue (intentional 1:2 split)
              style={styles.backBtn}
              testID="nav-back"
            />
          )}
          <PrimaryButton
            label="Continue"
            onPress={handleNext}
            isLoading={false}
            iconName="arrow-forward"
            iconPosition="right"
            // Full-width on step 1 (no Back button); flex:2 on all other steps
            style={isFirstStep ? styles.nextBtnFull : styles.nextBtn}
            testID="nav-next"
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // ─── Loading Screen ─────────────────────────────────────────
  loadingScreen: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  loadingGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingLogoWrap: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  loadingAppName: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -1,
  },
  loadingHint: {
    marginTop: Spacing.sm,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },

  // ─── Header ─────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.xxs,
    paddingBottom: 0,
    backgroundColor: Colors.background,
  },
  headerLogoWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  headerLogoBadge: {
    width: 26,
    height: 26,
    borderRadius: BorderRadius.xs,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerLogoText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
    letterSpacing: -0.3,
  },

  // ─── Sync chip ───────────────────────────────────────────────
  syncChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
    paddingVertical: 2,
    paddingHorizontal: Spacing.xs,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  syncChipSynced: {
    backgroundColor: Colors.successLight,
    borderColor: Colors.successBorder,
  },
  syncChipOffline: {
    backgroundColor: Colors.offlineLight,
    borderColor: Colors.border,
  },
  syncChipText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  syncChipTextSynced: { color: Colors.success },
  syncChipTextOffline: { color: Colors.offline },


  // ─── Step area ───────────────────────────────────────────────
  stepArea: {
    flex: 1,
  },

  // ─── Nav bar ────────────────────────────────────────────────
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    // Issue 4 — opaque background so scrolled content never bleeds through
    backgroundColor: Colors.card,          // #FFFFFF — fully opaque
    // Issue 4 — separator line visually anchors the bar to the content above
    borderTopWidth: 1,
    borderTopColor: Colors.border,         // from theme — light separator
    // Issue 1 — paddingTop gives breathing room above the buttons;
    // paddingBottom is set as an inline style using useSafeAreaInsets
    // so it accounts for the gesture bar at runtime.
    paddingTop: Spacing.md,
    // Upward shadow to separate bar from content
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 8,
    gap: Spacing.sm,
  },
  // Issue 5 — flex:1 Back, flex:2 Continue (deliberate 1:2 primary CTA weight)
  backBtn: {
    flex: 1,
  },
  // Issue 5 — Full-width Continue on step 1 (no Back button present)
  nextBtnFull: {
    flex: 1,
  },
  // Issue 5 — flex:2 so Continue clearly dominates when Back is visible
  nextBtn: {
    flex: 2,
  },
});

export default FlowContainer;
