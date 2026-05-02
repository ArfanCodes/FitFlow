// ============================================================
// components/SummaryCard.tsx — Premium review card
// Icon badge, edit button, row layout. No emojis.
// ============================================================

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../constants/theme';

interface SummaryCardProps {
  title: string;
  iconName: keyof typeof Ionicons.glyphMap;
  values: { label: string; value: string }[];
  onEdit: () => void;
  testID?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  iconName,
  values,
  onEdit,
  testID,
}) => {
  return (
    <View style={[styles.card, Shadows.sm]} testID={testID}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientMid]}
            style={styles.iconBadge}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={iconName} size={18} color={Colors.white} />
          </LinearGradient>
          <Text style={styles.title}>{title}</Text>
        </View>

        <TouchableOpacity
          onPress={onEdit}
          style={styles.editBtn}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${title}`}
        >
          <Ionicons name="create-outline" size={14} color={Colors.primary} />
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Values */}
      <View style={styles.body}>
        {values.map(({ label, value }, i) => (
          <View key={i} style={[styles.row, i < values.length - 1 && styles.rowBorder]}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue} numberOfLines={3}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.base,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    ...Typography.label,
    fontWeight: '700',
    fontSize: 15,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
    backgroundColor: Colors.primaryGhost,
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primaryLight + '55',
  },
  editText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 0,
  },
  body: {
    padding: Spacing.base,
    gap: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: Spacing.sm,
    gap: Spacing.base,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rowLabel: {
    ...Typography.hint,
    color: Colors.textMuted,
    flex: 1,
    fontWeight: '500',
  },
  rowValue: {
    ...Typography.hint,
    color: Colors.text,
    fontWeight: '700',
    flex: 2,
    textAlign: 'right',
  },
});

export default SummaryCard;
