// ============================================================
// steps/Step2_GoalSelection.tsx — Premium multi-select goals
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StepProps } from '../types';
import MultiSelectChip from '../components/MultiSelectChip';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

const GOAL_OPTIONS: { label: string; iconName: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Lose Weight',     iconName: 'scale-outline' },
  { label: 'Build Muscle',    iconName: 'barbell-outline' },
  { label: 'Improve Fitness', iconName: 'pulse-outline' },
  { label: 'Eat Healthier',   iconName: 'nutrition-outline' },
  { label: 'Reduce Stress',   iconName: 'leaf-outline' },
  { label: 'Sleep Better',    iconName: 'moon-outline' },
];

const Step2_GoalSelection: React.FC<StepProps> = ({
  formData,
  error,
  onUpdateField,
  onClearError,
}) => {
  const toggleGoal = (goal: string) => {
    const next = formData.goals.includes(goal)
      ? formData.goals.filter((g) => g !== goal)
      : [...formData.goals, goal];
    onUpdateField('goals', next);
    onClearError();
  };

  const count = formData.goals.length;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {/* Hero */}
      <View style={styles.heroBadge}>
        <Ionicons name="trophy-outline" size={28} color={Colors.primary} />
      </View>

      <Text style={styles.title}>What are your goals?</Text>
      <Text style={styles.subtitle}>
        Select everything you want to achieve. We'll build your plan around them.
      </Text>

      {/* Live count badge */}
      <View style={styles.countRow}>
        <View style={[styles.countBadge, count > 0 && styles.countBadgeActive]}>
          <Ionicons
            name={count > 0 ? 'checkmark-circle' : 'ellipse-outline'}
            size={14}
            color={count > 0 ? Colors.primary : Colors.textMuted}
          />
          <Text style={[styles.countText, count > 0 && styles.countTextActive]}>
            {count === 0 ? 'None selected' : `${count} goal${count > 1 ? 's' : ''} selected`}
          </Text>
        </View>
      </View>

      {/* Chip grid */}
      <View style={styles.chipGrid}>
        {GOAL_OPTIONS.map(({ label, iconName }) => (
          <MultiSelectChip
            key={label}
            label={label}
            iconName={iconName}
            isSelected={formData.goals.includes(label)}
            onToggle={() => toggleGoal(label)}
            testID={`goal-chip-${label}`}
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
  countRow: {
    marginBottom: Spacing.base,
  },
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
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  countTextActive: {
    color: Colors.primary,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -Spacing.xs,
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

export default Step2_GoalSelection;
