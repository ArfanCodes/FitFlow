// ============================================================
// constants/theme.ts — Premium Design System Tokens
// ============================================================

/**
 * Canonical button height shared by ALL PrimaryButton variants.
 * Changing this value here guarantees every button updates together.
 */
export const BUTTON_HEIGHT = 54;

export const Colors = {
  // Brand
  primary: '#4F46E5',
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',
  primaryGhost: '#EEF2FF',

  // Gradient stops
  gradientStart: '#4F46E5',
  gradientMid: '#7C3AED',
  gradientEnd: '#6D28D9',

  // Surfaces
  background: '#F5F5F9',
  card: '#FFFFFF',
  cardAlt: '#FAFAFA',

  // Status
  error: '#EF4444',
  errorLight: '#FEF2F2',
  errorBorder: '#FECACA',
  success: '#10B981',
  successLight: '#ECFDF5',
  successBorder: '#6EE7B7',
  warning: '#F59E0B',
  warningLight: '#FFFBEB',
  warningBorder: '#FCD34D',
  offline: '#64748B',
  offlineLight: '#F1F5F9',

  // Text
  text: '#0F172A',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // Borders
  border: '#E2E8F0',
  borderFocus: '#4F46E5',
  borderStrong: '#CBD5E1',

  // Chip
  chipSelected: '#4F46E5',
  chipSelectedText: '#FFFFFF',
  chipUnselected: '#F8FAFC',
  chipUnselectedText: '#475569',
  chipUnselectedBorder: '#E2E8F0',

  // Misc
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(15, 23, 42, 0.5)',

  // Step indicator
  stepActive: '#4F46E5',
  stepDone: '#818CF8',
  stepPending: '#E2E8F0',
};

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
};

export const Typography = {
  displayTitle: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: Colors.text,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
    lineHeight: 30,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
    lineHeight: 22,
  },
  labelSmall: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text,
    lineHeight: 18,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    color: Colors.text,
    lineHeight: 22,
  },
  hint: {
    fontSize: 13,
    fontWeight: '400' as const,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  error: {
    fontSize: 12,
    fontWeight: '500' as const,
    color: Colors.error,
    lineHeight: 16,
  },
  button: {
    fontSize: 15,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500' as const,
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
  overline: {
    fontSize: 11,
    fontWeight: '700' as const,
    color: Colors.primary,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  },
};

export const Shadows = {
  xs: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  md: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#64748B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  primary: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 14,
    elevation: 10,
  },
  primarySm: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 5,
  },
};
