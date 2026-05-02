// ============================================================
// components/ProgressBar.tsx — Compact animated progress bar
// Single-row label + slim track. Dots removed to save space.
// ============================================================

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius } from '../constants/theme';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  progressFraction: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  progressFraction,
}) => {
  const widthAnim = useRef(new Animated.Value(progressFraction)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progressFraction,
      duration: 420,
      useNativeDriver: false,
    }).start();
  }, [progressFraction, widthAnim]);

  return (
    <View style={styles.container}>
      {/* Single compact label row */}
      <View style={styles.labelRow}>
        <Text style={styles.stepLabel}>
          Step <Text style={styles.stepNum}>{currentStep}</Text> of {totalSteps}
        </Text>
        <Text style={styles.percentLabel}>
          {Math.round(progressFraction * 100)}%
        </Text>
      </View>

      {/* Slim progress track */}
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fillWrapper,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={[Colors.gradientStart, Colors.gradientMid]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.fill}
          />
        </Animated.View>

        {/* Small glowing tip dot */}
        <Animated.View
          style={[
            styles.tipDot,
            {
              left: widthAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['-2%', '98%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.base,
    paddingTop: 0,
    paddingBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.textSecondary,
    letterSpacing: 0.2,
  },
  stepNum: {
    fontWeight: '700',
    color: Colors.primary,
  },
  percentLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  track: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    position: 'relative',
  },
  fillWrapper: {
    height: '100%',
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  fill: {
    flex: 1,
  },
  tipDot: {
    position: 'absolute',
    top: '50%',
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.white,
    marginTop: -5,
    borderWidth: 2,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default ProgressBar;
