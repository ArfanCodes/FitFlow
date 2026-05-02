// ============================================================
// steps/Step3_WorkExperience.tsx — Premium Yes/No toggle
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StepProps } from '../types';
import RadioOption from '../components/RadioOption';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';

const Step3_WorkExperience: React.FC<StepProps> = ({
  formData,
  error,
  onUpdateField,
  onClearError,
}) => {
  const handleSelect = (value: boolean) => {
    if (!value) {
      onUpdateField('workDetails', undefined);
    }
    onUpdateField('hasWorkExperience', value);
    onClearError();
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero */}
      <View style={styles.heroBadge}>
        <Ionicons name="briefcase-outline" size={28} color={Colors.primary} />
      </View>

      <Text style={styles.title}>Work Experience</Text>
      <Text style={styles.subtitle}>
        Do you have any professional work experience?
      </Text>

      {/* Context card */}
      <View style={styles.contextCard}>
        <View style={styles.contextIconWrap}>
          <Ionicons name="information-circle-outline" size={18} color={Colors.primary} />
        </View>
        <Text style={styles.contextText}>
          Selecting <Text style={styles.bold}>Yes</Text> will unlock an extra step
          where you can add your company, role, and years of experience.
        </Text>
      </View>

      <View style={styles.options}>
        <RadioOption
          label="Yes, I have experience"
          sublabel="I've worked professionally before"
          iconName="checkmark-circle-outline"
          isSelected={formData.hasWorkExperience === true}
          onSelect={() => handleSelect(true)}
          testID="work-experience-yes"
        />
        <RadioOption
          label="No, I'm new to the workforce"
          sublabel="Student or first-time job seeker"
          iconName="sparkles-outline"
          isSelected={formData.hasWorkExperience === false}
          onSelect={() => handleSelect(false)}
          testID="work-experience-no"
        />
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
  subtitle: { ...Typography.subtitle, marginBottom: Spacing.lg },
  contextCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.primaryGhost,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primaryLight + '44',
  },
  contextIconWrap: {
    marginTop: 1,
  },
  contextText: {
    ...Typography.hint,
    color: Colors.primary,
    flex: 1,
    lineHeight: 20,
  },
  bold: { fontWeight: '700' },
  options: { gap: Spacing.sm },
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

export default Step3_WorkExperience;
