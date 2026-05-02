// ============================================================
// components/MultiSelectChip.tsx — Premium toggleable chip
// Vector icons instead of emojis. Bold selected state.
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
import { Colors, Spacing, BorderRadius, Typography } from '../constants/theme';

interface MultiSelectChipProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
  iconName?: keyof typeof Ionicons.glyphMap;
  testID?: string;
}

const MultiSelectChip: React.FC<MultiSelectChipProps> = ({
  label,
  isSelected,
  onToggle,
  iconName,
  testID,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;
  const checkAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(bgAnim, {
        toValue: isSelected ? 1 : 0,
        useNativeDriver: false,
        speed: 30,
        bounciness: 3,
      }),
      Animated.spring(checkAnim, {
        toValue: isSelected ? 1 : 0,
        useNativeDriver: true,
        speed: 40,
        bounciness: 8,
      }),
    ]).start();
  }, [isSelected, bgAnim, checkAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true, speed: 70 }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 10 }).start();
  };

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.chipUnselected, Colors.chipSelected],
  });

  const borderColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.chipUnselectedBorder, Colors.primary],
  });

  const checkScale = checkAnim;

  return (
    <Animated.View style={[styles.wrapper, { transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        testID={testID}
        onPress={onToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: isSelected }}
        accessibilityLabel={label}
      >
        <Animated.View style={[styles.chip, { backgroundColor, borderColor }]}>
          {/* Icon */}
          {iconName && (
            <Ionicons
              name={iconName}
              size={16}
              color={isSelected ? Colors.white : Colors.textSecondary}
            />
          )}

          {/* Label */}
          <Text style={[styles.label, isSelected && styles.labelSelected]}>
            {label}
          </Text>

          {/* Animated checkmark */}
          <Animated.View style={[styles.check, { transform: [{ scale: checkScale }] }]}>
            <Ionicons name="checkmark" size={11} color={Colors.white} />
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    margin: Spacing.xs,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 1,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    gap: Spacing.xs,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.chipUnselectedText,
    letterSpacing: 0.1,
  },
  labelSelected: {
    color: Colors.white,
  },
  check: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
});

export default MultiSelectChip;
