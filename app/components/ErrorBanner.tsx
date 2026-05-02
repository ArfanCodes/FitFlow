// ============================================================
// components/ErrorBanner.tsx — Slide-in error/warning banner
// Icon-driven. No emojis.
// ============================================================

import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, Typography } from '../constants/theme';

interface ErrorBannerProps {
  message: string;
  onRetry?: () => void;
  onDismiss: () => void;
  type?: 'error' | 'warning' | 'offline';
}

const BANNER_CONFIG = {
  error: {
    bg: Colors.errorLight,
    border: Colors.errorBorder,
    accent: Colors.error,
    icon: 'alert-circle' as const,
    textColor: '#991B1B',
    retryText: 'Retry',
  },
  warning: {
    bg: Colors.warningLight,
    border: Colors.warningBorder,
    accent: Colors.warning,
    icon: 'warning' as const,
    textColor: '#92400E',
    retryText: 'Retry',
  },
  offline: {
    bg: Colors.offlineLight,
    border: Colors.border,
    accent: Colors.offline,
    icon: 'cloud-offline-outline' as const,
    textColor: '#334155',
    retryText: 'Sync',
  },
};

const ErrorBanner: React.FC<ErrorBannerProps> = ({
  message,
  onRetry,
  onDismiss,
  type = 'error',
}) => {
  const slideAnim = useRef(new Animated.Value(-80)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const config = BANNER_CONFIG[type];

  useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 20, bounciness: 4 }),
      Animated.timing(opacityAnim, { toValue: 1, duration: 250, useNativeDriver: true }),
    ]).start();
  }, [slideAnim, opacityAnim]);

  const handleDismiss = () => {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: -80, duration: 220, useNativeDriver: true }),
      Animated.timing(opacityAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start(onDismiss);
  };

  return (
    <Animated.View
      style={[
        styles.banner,
        {
          backgroundColor: config.bg,
          borderColor: config.border,
          transform: [{ translateY: slideAnim }],
          opacity: opacityAnim,
        },
      ]}
      accessibilityRole="alert"
    >
      {/* Accent bar */}
      <View style={[styles.accentBar, { backgroundColor: config.accent }]} />

      {/* Icon */}
      <View style={[styles.iconCircle, { backgroundColor: config.bg }]}>
        <Ionicons name={config.icon} size={20} color={config.accent} />
      </View>

      {/* Message */}
      <Text style={[styles.message, { color: config.textColor }]} numberOfLines={2}>
        {message}
      </Text>

      {/* Actions */}
      <View style={styles.actions}>
        {onRetry && (
          <TouchableOpacity
            onPress={onRetry}
            style={[styles.retryBtn, { borderColor: config.accent }]}
            accessibilityRole="button"
            accessibilityLabel="Retry"
          >
            <Ionicons name="refresh-outline" size={13} color={config.accent} />
            <Text style={[styles.retryText, { color: config.textColor }]}>
              {config.retryText}
            </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={handleDismiss} style={styles.dismissBtn}>
          <Ionicons name="close" size={16} color={config.textColor} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: Spacing.base,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    gap: Spacing.sm,
    paddingRight: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  accentBar: {
    width: 4,
    alignSelf: 'stretch',
    borderRadius: 2,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    ...Typography.hint,
    flex: 1,
    fontWeight: '500',
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  retryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderRadius: BorderRadius.sm,
    paddingVertical: 4,
    paddingHorizontal: Spacing.xs,
  },
  retryText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dismissBtn: {
    padding: Spacing.xs,
  },
});

export default ErrorBanner;
