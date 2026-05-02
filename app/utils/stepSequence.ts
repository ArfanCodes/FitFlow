// ============================================================
// utils/stepSequence.ts — Step navigation logic
//
// CRITICAL: All navigation (Next / Back) goes through
// getStepSequence(). We never hardcode step + 1 or step - 1.
// Step IDs: 1, 2, 3, 3.5 (conditional), 4, 5
// 3.5 is the internal ID for Step 3b (Work Details).
// ============================================================

import { FormData } from '../types';

/**
 * Returns the ordered list of step IDs for the current formData.
 * Step 3.5 (Work Details) is injected only when hasWorkExperience === true.
 */
export const getStepSequence = (formData: FormData): number[] => {
  const steps: number[] = [1, 2, 3];

  // Conditional step: only appears if user said they have work experience
  if (formData.hasWorkExperience === true) {
    steps.push(3.5); // 3.5 = Step3b_WorkDetails
  }

  steps.push(4, 5);
  return steps;
};

/**
 * Returns the next step ID based on current step and formData.
 * Returns null if already on the last step.
 */
export const getNextStep = (
  currentStep: number,
  formData: FormData
): number | null => {
  const sequence = getStepSequence(formData);
  const idx = sequence.indexOf(currentStep);
  if (idx === -1 || idx >= sequence.length - 1) return null;
  return sequence[idx + 1];
};

/**
 * Returns the previous step ID based on current step and formData.
 * Returns null if already on the first step.
 */
export const getPrevStep = (
  currentStep: number,
  formData: FormData
): number | null => {
  const sequence = getStepSequence(formData);
  const idx = sequence.indexOf(currentStep);
  if (idx <= 0) return null;
  return sequence[idx - 1];
};

/**
 * Returns 1-based position of the current step within the sequence.
 * Used for "Step X of Y" display.
 */
export const getStepPosition = (
  currentStep: number,
  formData: FormData
): { current: number; total: number } => {
  const sequence = getStepSequence(formData);
  const idx = sequence.indexOf(currentStep);
  return {
    current: idx + 1,
    total: sequence.length,
  };
};

/**
 * Progress fraction (0–1) for the animated progress bar.
 */
export const getProgressFraction = (
  currentStep: number,
  formData: FormData
): number => {
  const { current, total } = getStepPosition(currentStep, formData);
  return current / total;
};
