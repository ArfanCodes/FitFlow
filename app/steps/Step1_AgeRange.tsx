// ============================================================
// steps/Step1_AgeRange.tsx — Premium age range selector
// Ionicons instead of emojis. Rich card layout with sublabels.
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StepProps } from '../types';
import RadioOption from '../components/RadioOption';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

const AGE_OPTIONS: {
  label: string;
  sublabel: string;
  iconName: keyof typeof Ionicons.glyphMap;
}[] = [
  { label: 'Under 18',  sublabel: 'Teen / Student',          iconName: 'school-outline' },
  { label: '18 – 24',   sublabel: 'Young adult',             iconName: 'rocket-outline' },
  { label: '25 – 34',   sublabel: 'Early career',            iconName: 'trending-up-outline' },
  { label: '35 – 44',   sublabel: 'Established professional', iconName: 'briefcase-outline' },
  { label: '45+',       sublabel: 'Senior professional',     iconName: 'ribbon-outline' },
];

const Step1_AgeRange: React.FC<StepProps> = ({
  formData,
  error,
  onUpdateField,
  onClearError,
}) => {
  const handleSelect = (age: string) => {
    onUpdateField('ageRange', age);
    onClearError();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Step hero icon */}
      <View style={styles.heroRow}>
        <View style={styles.heroBadge}>
          <Ionicons name="person-outline" size={28} color={Colors.primary} />
        </View>
      </View>

      <Text style={styles.title}>How old are you?</Text>
      <Text style={styles.subtitle}>
        We personalise your experience based on your age group.
      </Text>

      {/* Info strip */}
      <View style={styles.infoStrip}>
        <Ionicons name="lock-closed-outline" size={13} color={Colors.textSecondary} />
        <Text style={styles.infoText}>Your data is private and never shared.</Text>
      </View>

      <View style={styles.options}>
        {AGE_OPTIONS.map(({ label, sublabel, iconName }) => (
          <RadioOption
            key={label}
            label={label}
            sublabel={sublabel}
            iconName={iconName}
            isSelected={formData.ageRange === label}
            onSelect={() => handleSelect(label)}
            testID={`age-option-${label}`}
          />
        ))}
      </View>

      {error && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle-outline" size={14} color={Colors.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: Spacing.base, paddingBottom: Spacing.xl },
  heroRow: {
    alignItems: 'flex-start',
    marginBottom: Spacing.base,
  },
  heroBadge: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.primaryGhost,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.primaryLight + '55',
  },
  title: {
    ...Typography.displayTitle,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.subtitle,
    marginBottom: Spacing.md,
  },
  infoStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.background,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  infoText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  options: { gap: Spacing.xs },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.sm,
    padding: Spacing.sm,
    backgroundColor: Colors.errorLight,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.errorBorder,
  },
  errorText: { ...Typography.error },
});

export default Step1_AgeRange;
