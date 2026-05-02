// ============================================================
// steps/Step3b_WorkDetails.tsx — Premium work details form
// Icon-equipped inputs, field-level error targeting.
// ============================================================

import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StepProps, WorkDetails } from '../types';
import TextInputField from '../components/TextInputField';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

const getFieldError = (
  error: string | null,
  field: 'companyName' | 'position' | 'yearsOfExperience'
): string | undefined => {
  if (!error) return undefined;
  const map: Record<string, string[]> = {
    companyName: ['Company name'],
    position: ['Position', 'Role'],
    yearsOfExperience: ['Years of experience', 'valid positive number'],
  };
  return map[field].some((kw) => error.includes(kw)) ? error : undefined;
};

const Step3b_WorkDetails: React.FC<StepProps> = ({
  formData, error, onUpdateField, onClearError,
}) => {
  const details: WorkDetails = formData.workDetails ?? {
    companyName: '',
    position: '',
    yearsOfExperience: '',
  };

  const updateDetail = (field: keyof WorkDetails, value: string) => {
    onUpdateField('workDetails', { ...details, [field]: value });
    onClearError();
  };

  const hasFieldError =
    getFieldError(error, 'companyName') ||
    getFieldError(error, 'position') ||
    getFieldError(error, 'yearsOfExperience');

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={110}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Hero */}
        <View style={styles.heroBadge}>
          <Ionicons name="business-outline" size={28} color={Colors.primary} />
        </View>

        <Text style={styles.title}>Your Work History</Text>
        <Text style={styles.subtitle}>
          Tell us about your most recent or current role.
        </Text>

        {/* Completion indicator */}
        <View style={styles.completionRow}>
          {(['companyName', 'position', 'yearsOfExperience'] as const).map((f) => (
            <View
              key={f}
              style={[
                styles.completionDot,
                details[f].trim().length > 0 && styles.completionDotFilled,
              ]}
            />
          ))}
          <Text style={styles.completionLabel}>
            {[details.companyName, details.position, details.yearsOfExperience]
              .filter((v) => v.trim().length > 0).length}{' '}
            / 3 fields completed
          </Text>
        </View>

        {/* Inputs */}
        <TextInputField
          label="Company Name"
          value={details.companyName}
          onChangeText={(t) => updateDetail('companyName', t)}
          placeholder="e.g. Google, Shopify, Acme Corp"
          error={getFieldError(error, 'companyName')}
          iconName="business-outline"
          autoCapitalize="words"
          returnKeyType="next"
          testID="input-company-name"
        />

        <TextInputField
          label="Position / Role"
          value={details.position}
          onChangeText={(t) => updateDetail('position', t)}
          placeholder="e.g. Software Engineer, Designer"
          error={getFieldError(error, 'position')}
          iconName="id-card-outline"
          autoCapitalize="words"
          returnKeyType="next"
          testID="input-position"
        />

        <TextInputField
          label="Years of Experience"
          value={details.yearsOfExperience}
          onChangeText={(t) => updateDetail('yearsOfExperience', t)}
          placeholder="e.g. 3 or 0.5"
          error={getFieldError(error, 'yearsOfExperience')}
          iconName="time-outline"
          keyboardType="decimal-pad"
          returnKeyType="done"
          hint="Enter a number (e.g. 0.5 for 6 months)"
          testID="input-years"
        />

        {/* General error not tied to a specific field */}
        {error && !hasFieldError && (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle-outline" size={14} color={Colors.error} />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
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
  subtitle: { ...Typography.subtitle, marginBottom: Spacing.base },
  completionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.background,
    padding: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  completionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
    borderWidth: 1,
    borderColor: Colors.borderStrong,
  },
  completionDotFilled: {
    backgroundColor: Colors.success,
    borderColor: Colors.successBorder,
  },
  completionLabel: {
    ...Typography.caption,
    marginLeft: Spacing.xxs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    padding: Spacing.sm,
    backgroundColor: Colors.errorLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.errorBorder,
  },
  errorText: { ...Typography.error },
});

export default Step3b_WorkDetails;
