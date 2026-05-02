// ============================================================
// steps/Step4_Preferences.tsx — Premium preference selector
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StepProps } from '../types';
import MultiSelectChip from '../components/MultiSelectChip';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

const PREF_OPTIONS: { label: string; iconName: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Morning Workouts',   iconName: 'sunny-outline' },
  { label: 'Evening Workouts',   iconName: 'moon-outline' },
  { label: 'Home Workouts',      iconName: 'home-outline' },
  { label: 'Gym',                iconName: 'barbell-outline' },
  { label: 'Outdoor Activities', iconName: 'walk-outline' },
  { label: 'Online Coaching',    iconName: 'laptop-outline' },
];

const Step4_Preferences: React.FC<StepProps> = ({
  formData,
  error,
  onUpdateField,
  onClearError,
}) => {
  const toggle = (pref: string) => {
    const updated = formData.preferences.includes(pref)
      ? formData.preferences.filter((p) => p !== pref)
      : [...formData.preferences, pref];
    onUpdateField('preferences', updated);
    onClearError();
  };

  const count = formData.preferences.length;
  const allSelected = count === PREF_OPTIONS.length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Hero */}
      <View style={styles.heroBadge}>
        <Ionicons name="flash-outline" size={28} color={Colors.primary} />
      </View>

      <Text style={styles.title}>Your Preferences</Text>
      <Text style={styles.subtitle}>
        How do you like to stay active? Pick everything that resonates.
      </Text>

      {/* Count badge */}
      <View style={styles.countRow}>
        <View style={[styles.countBadge, count > 0 && styles.countBadgeActive]}>
          <Ionicons
            name={count > 0 ? 'checkmark-circle' : 'ellipse-outline'}
            size={14}
            color={count > 0 ? Colors.primary : Colors.textMuted}
          />
          <Text style={[styles.countText, count > 0 && styles.countTextActive]}>
            {count === 0 ? 'None selected' : `${count} preference${count > 1 ? 's' : ''} selected`}
          </Text>
        </View>
      </View>

      {/* Chips */}
      <View style={styles.chipGrid}>
        {PREF_OPTIONS.map(({ label, iconName }) => (
          <MultiSelectChip
            key={label}
            label={label}
            iconName={iconName}
            isSelected={formData.preferences.includes(label)}
            onToggle={() => toggle(label)}
            testID={`pref-chip-${label}`}
          />
        ))}
      </View>

      {/* All-selected reward banner */}
      {allSelected && (
        <View style={styles.rewardBanner}>
          <Ionicons name="star" size={16} color={Colors.success} />
          <Text style={styles.rewardText}>
            All-rounder! Great commitment to your health.
          </Text>
        </View>
      )}

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
  countRow: { marginBottom: Spacing.base },
  countBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  countBadgeActive: {
    backgroundColor: Colors.primaryGhost,
    borderColor: Colors.primaryLight,
  },
  countText: { fontSize: 12, fontWeight: '600', color: Colors.textMuted },
  countTextActive: { color: Colors.primary },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
  },
  rewardBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.base,
    backgroundColor: Colors.successLight,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.successBorder,
  },
  rewardText: {
    fontSize: 13,
    color: '#065F46',
    fontWeight: '600',
  },
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

export default Step4_Preferences;
