// ============================================================
// steps/Step5_Summary.tsx — Premium review & submit screen
// Ionicons throughout. No emojis.
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FormData } from '../types';
import SummaryCard from '../components/SummaryCard';
import PrimaryButton from '../components/PrimaryButton';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '../constants/theme';

interface Step5_SummaryProps {
  formData: FormData;
  isLoading: boolean;
  onEditStep: (step: number) => void;
  onSubmit: () => Promise<void>;
  onReset: () => void;
}

const Step5_Summary: React.FC<Step5_SummaryProps> = ({
  formData,
  isLoading,
  onEditStep,
  onSubmit,
  onReset,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    await onSubmit();
    setSubmitted(true);
  };

  const formatList = (items: string[]): string =>
    items.length > 0 ? items.join(' · ') : 'None selected';

  const formatBool = (val: boolean | null): string => {
    if (val === null) return 'Not answered';
    return val ? 'Yes' : 'No';
  };

  // ─── Success Screen ────────────────────────────────────────
  if (submitted) {
    return (
      <View style={styles.successWrapper}>
        <LinearGradient
          colors={[Colors.gradientStart, Colors.gradientMid]}
          style={styles.successIconBg}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Ionicons name="checkmark" size={48} color={Colors.white} />
        </LinearGradient>

        <Text style={styles.successTitle}>You're all set!</Text>
        <Text style={styles.successSubtitle}>
          Your profile has been successfully submitted. We're personalising your experience right now.
        </Text>

        <PrimaryButton
          label="Return to Home"
          onPress={onReset}
          iconName="home-outline"
          iconPosition="left"
          style={{ width: '100%', marginTop: Spacing.xl }}
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.heroBadge}>
        <Ionicons name="reader-outline" size={28} color={Colors.primary} />
      </View>
      <Text style={styles.title}>Review Your Profile</Text>
      <Text style={styles.subtitle}>
        Tap <Text style={styles.bold}>Edit</Text> on any section to make changes before submitting.
      </Text>

      {/* Summary Cards */}
      <SummaryCard
        title="Age Range"
        iconName="calendar-outline"
        values={[{ label: 'Selected age group', value: formData.ageRange || 'Not provided' }]}
        onEdit={() => onEditStep(1)}
        testID="summary-age"
      />

      <SummaryCard
        title="Goals"
        iconName="trophy-outline"
        values={[{ label: 'Selected goals', value: formatList(formData.goals) }]}
        onEdit={() => onEditStep(2)}
        testID="summary-goals"
      />

      <SummaryCard
        title="Work Experience"
        iconName="briefcase-outline"
        values={[
          { label: 'Has experience', value: formatBool(formData.hasWorkExperience) },
          ...(formData.workDetails ? [
            { label: 'Company', value: formData.workDetails.companyName },
            { label: 'Role', value: formData.workDetails.position },
            { label: 'Years', value: `${formData.workDetails.yearsOfExperience} yrs` },
          ] : []),
        ]}
        onEdit={() => onEditStep(3)}
        testID="summary-work"
      />

      <SummaryCard
        title="Preferences"
        iconName="flash-outline"
        values={[{ label: 'Selected preferences', value: formatList(formData.preferences) }]}
        onEdit={() => onEditStep(4)}
        testID="summary-preferences"
      />

      {/* Submit section */}
      <View style={[styles.submitCard, Shadows.sm]}>
        <View style={styles.submitCardHeader}>
          <Ionicons name="send-outline" size={18} color={Colors.primary} />
          <Text style={styles.submitCardTitle}>Ready to go?</Text>
        </View>
        <Text style={styles.submitCardHint}>
          Your profile will be saved to our servers. You can always update it later.
        </Text>

        <PrimaryButton
          label={submitted ? 'Submitted' : 'Submit Profile'}
          onPress={handleSubmit}
          isLoading={isLoading}
          disabled={submitted}
          iconName="checkmark-circle-outline"
          iconPosition="right"
          testID="submit-button"
        />

        <Text style={styles.termsText}>
          By submitting, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.xxl },

  heroBadge: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryLight + '55',
    marginBottom: Spacing.base,
  },
  title: { ...Typography.displayTitle, marginBottom: Spacing.xs },
  subtitle: { ...Typography.subtitle, marginBottom: Spacing.lg },
  bold: { fontWeight: '700', color: Colors.primary },



  submitCard: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    padding: Spacing.base,
    gap: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  submitCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  submitCardTitle: {
    ...Typography.label,
    color: Colors.primary,
    fontWeight: '700',
  },
  submitCardHint: {
    ...Typography.hint,
    marginBottom: Spacing.xs,
  },
  termsText: {
    ...Typography.caption,
    textAlign: 'center',
    lineHeight: 16,
    color: Colors.textMuted,
  },

  // ─── Success ───────────────────────────────────────────────
  successWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  successIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 12,
  },
  successTitle: {
    ...Typography.displayTitle,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  successSubtitle: {
    ...Typography.subtitle,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: Spacing.lg,
  },

});

export default Step5_Summary;
