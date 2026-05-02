// ============================================================
// components/RadioOption.tsx — Premium single-select card
// Uses Ionicons instead of emojis. Gradient border on selection.
// ============================================================

import React, { useRef, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../constants/theme';

interface RadioOptionProps {
  label: string;
  sublabel?: string;
  isSelected: boolean;
  onSelect: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  testID?: string;
}

const RadioOption: React.FC<RadioOptionProps> = ({
  label,
  sublabel,
  isSelected,
  onSelect,
  iconName,
  testID,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const selectionAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.spring(selectionAnim, {
      toValue: isSelected ? 1 : 0,
      useNativeDriver: false,
      speed: 25,
      bounciness: 4,
    }).start();
  }, [isSelected, selectionAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 60 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 6 }).start();
  };

  const borderColor = selectionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.border, Colors.primary],
  });

  const bgColor = selectionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.white, Colors.primaryGhost],
  });

  const radioScale = selectionAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        { transform: [{ scale: scaleAnim }] },
        isSelected && Shadows.primarySm,
      ]}
    >
      <TouchableOpacity
        testID={testID}
        onPress={onSelect}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        accessibilityRole="radio"
        accessibilityState={{ selected: isSelected }}
        accessibilityLabel={label}
      >
        <Animated.View style={[styles.card, { backgroundColor: bgColor, borderColor }]}>
          {/* Left icon badge */}
          {iconName && (
            <View style={[styles.iconBadge, isSelected && styles.iconBadgeSelected]}>
              <Ionicons
                name={iconName}
                size={20}
                color={isSelected ? Colors.primary : Colors.textSecondary}
              />
            </View>
          )}

          {/* Labels */}
          <View style={styles.textBlock}>
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{label}</Text>
            {sublabel && (
              <Text style={styles.sublabel}>{sublabel}</Text>
            )}
          </View>

          {/* Custom animated radio dot */}
          <View style={[styles.radioRing, isSelected && styles.radioRingSelected]}>
            <Animated.View style={[styles.radioFill, { transform: [{ scale: radioScale }] }]} />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    gap: Spacing.md,
  },
  iconBadge: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBadgeSelected: {
    backgroundColor: Colors.primaryGhost,
    borderColor: Colors.primaryLight,
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...Typography.label,
    color: Colors.text,
  },
  labelSelected: {
    color: Colors.primary,
  },
  sublabel: {
    ...Typography.hint,
  },
  radioRing: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: Colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioRingSelected: {
    borderColor: Colors.primary,
  },
  radioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
});

export default RadioOption;
