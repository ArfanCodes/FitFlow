// ============================================================
// components/PrimaryButton.tsx — Premium gradient CTA button
// ============================================================

import React, { useRef } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  Animated,
  ViewStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography, BUTTON_HEIGHT } from '../constants/theme';

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  variant?: 'filled' | 'outline' | 'ghost';
  iconName?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  testID?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  isLoading = false,
  disabled = false,
  variant = 'filled',
  iconName,
  iconPosition = 'right',
  style,
  testID,
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 60,
      bounciness: 0,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 5,
    }).start();
  };

  const isDisabled = disabled || isLoading;
  const iconColor = variant === 'filled' ? Colors.white : Colors.primary;

  const contentRow = isLoading ? (
    <ActivityIndicator color={variant === 'filled' ? Colors.white : Colors.primary} size="small" />
  ) : (
    <View style={styles.labelRow}>
      {iconName && iconPosition === 'left' && (
        <Ionicons name={iconName} size={18} color={iconColor} style={{ marginRight: 6 }} />
      )}
      <Text
        style={[
          styles.label,
          variant === 'outline' && styles.labelOutline,
          variant === 'ghost' && styles.labelGhost,
        ]}
      >
        {label}
      </Text>
      {iconName && iconPosition === 'right' && (
        <Ionicons name={iconName} size={18} color={iconColor} style={{ marginLeft: 6 }} />
      )}
    </View>
  );

  // ── Filled variant: gradient with proper shadow ──────────────
  if (variant === 'filled') {
    return (
      <Animated.View
        style={[
          styles.shadowWrap,
          isDisabled && { shadowOpacity: 0, elevation: 0 },
          { transform: [{ scale: scaleAnim }] },
          style,
        ]}
      >
        {/* Shadow sits on THIS view — no overflow:hidden here */}
        <TouchableOpacity
          testID={testID}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          activeOpacity={1}
          style={styles.filledTouchable}
          accessibilityRole="button"
          accessibilityLabel={label}
        >
          <LinearGradient
            colors={
              isDisabled
                ? ['#94A3B8', '#94A3B8']
                : [Colors.gradientStart, Colors.gradientMid]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            {contentRow}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  // ── Outline / Ghost variants ─────────────────────────────────
  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        testID={testID}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
        activeOpacity={0.75}
        style={[
          styles.base,
          variant === 'outline' && styles.outline,
          variant === 'ghost' && styles.ghost,
          isDisabled && styles.disabled,
        ]}
        accessibilityRole="button"
        accessibilityLabel={label}
      >
        {contentRow}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  // ── Shadow wrapper: NO overflow:hidden so the drop-shadow isn't clipped ──
  shadowWrap: {
    borderRadius: BorderRadius.lg,          // must match filledTouchable
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.38,
    shadowRadius: 14,
    elevation: 10,
  },
  // Clips the LinearGradient to rounded corners (overflow is safe here
  // because it's the inner layer, not the shadow layer)
  filledTouchable: {
    borderRadius: BorderRadius.lg,          // ← from theme constant
    overflow: 'hidden',
  },
  // gradient: exact same height + padding as `base` so both variants
  // render at identical visual size — BUTTON_HEIGHT is the single source
  gradient: {
    height: BUTTON_HEIGHT,                  // ← shared constant
    paddingVertical: Spacing.base,          // ← from theme constant
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Shared base for outline / ghost — pixel-identical to `gradient`
  base: {
    height: BUTTON_HEIGHT,                  // ← same shared constant
    paddingVertical: Spacing.base,          // ← same theme constant
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,          // ← same theme constant
    alignItems: 'center',
    justifyContent: 'center',
  },
  outline: {
    borderWidth: 1.5,
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryGhost,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.45,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    ...Typography.button,
    color: Colors.white,
  },
  labelOutline: {
    color: Colors.primary,
  },
  labelGhost: {
    color: Colors.primary,
  },
});

export default PrimaryButton;
