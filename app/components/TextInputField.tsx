// ============================================================
// components/TextInputField.tsx — Premium text input field
// Focus ring, error shake, floating label animation.
// ============================================================

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '../constants/theme';

interface TextInputFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string | null;
  placeholder?: string;
  hint?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  testID?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label,
  value,
  onChangeText,
  error,
  placeholder,
  hint,
  iconName,
  testID,
  ...restProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(borderAnim, {
      toValue: isFocused ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isFocused, borderAnim]);

  useEffect(() => {
    if (error) {
      Animated.sequence([
        Animated.timing(shakeAnim, { toValue: 8, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: -8, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 5, duration: 55, useNativeDriver: true }),
        Animated.timing(shakeAnim, { toValue: 0, duration: 55, useNativeDriver: true }),
      ]).start();
    }
  }, [error, shakeAnim]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [error ? Colors.error : Colors.border, Colors.borderFocus],
  });

  const shadowOpacity = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.15],
  });

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: shakeAnim }] }]}>
      <Text style={styles.label}>{label}</Text>

      <Animated.View
        style={[
          styles.inputWrapper,
          { borderColor },
          error && styles.inputWrapperError,
          {
            shadowColor: Colors.primary,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity,
            shadowRadius: 6,
            elevation: isFocused ? 3 : 0,
          },
        ]}
      >
        {iconName && (
          <View style={styles.inputIcon}>
            <Ionicons
              name={iconName}
              size={18}
              color={isFocused ? Colors.primary : Colors.textMuted}
            />
          </View>
        )}
        <TextInput
          testID={testID}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          style={[styles.input, iconName && styles.inputWithIcon]}
          accessibilityLabel={label}
          {...restProps}
        />
        {/* Valid checkmark icon */}
        {value.length > 0 && !error && (
          <View style={styles.validIcon}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
          </View>
        )}
        {/* Error icon */}
        {error && (
          <View style={styles.validIcon}>
            <Ionicons name="alert-circle" size={18} color={Colors.error} />
          </View>
        )}
      </Animated.View>

      {hint && !error && (
        <View style={styles.hintRow}>
          <Ionicons name="information-circle-outline" size={13} color={Colors.textMuted} />
          <Text style={styles.hint}>{hint}</Text>
        </View>
      )}
      {error && (
        <View style={styles.errorRow}>
          <Ionicons name="warning-outline" size={13} color={Colors.error} />
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
  label: {
    ...Typography.labelSmall,
    marginBottom: Spacing.xs,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  inputWrapperError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  inputIcon: {
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    fontSize: 15,
    color: Colors.text,
    minHeight: 52,
  },
  inputWithIcon: {
    paddingLeft: Spacing.xs,
  },
  validIcon: {
    paddingRight: Spacing.md,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
    marginTop: Spacing.xs,
  },
  hint: {
    ...Typography.hint,
    fontSize: 12,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xxs,
    marginTop: Spacing.xs,
  },
  errorText: {
    ...Typography.error,
  },
});

export default TextInputField;
