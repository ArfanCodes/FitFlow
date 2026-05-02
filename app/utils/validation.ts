// ============================================================
// utils/validation.ts — Per-step validation logic
//
// Rules:
// - Returns a string error message if validation fails
// - Returns null if the step is valid
// - Never uses Alert.alert() — errors are displayed inline
// ============================================================

import { FormData } from '../types';

/**
 * Validates the current step's formData.
 * @param step  — the current step ID (1, 2, 3, 3.5, 4, 5)
 * @param formData — full form state
 * @returns error message string, or null if valid
 */
export const validateCurrentStep = (
  step: number,
  formData: FormData
): string | null => {
  switch (step) {
    case 1:
      return validateStep1(formData);
    case 2:
      return validateStep2(formData);
    case 3:
      return validateStep3(formData);
    case 3.5:
      return validateStep3b(formData);
    case 4:
      return validateStep4(formData);
    case 5:
      // Summary step — no validation needed before submit
      return null;
    default:
      return null;
  }
};

/** Step 1: Age Range — must select one option */
const validateStep1 = (formData: FormData): string | null => {
  if (!formData.ageRange || formData.ageRange.trim() === '') {
    return 'Please select your age range to continue.';
  }
  return null;
};

/** Step 2: Goal Selection — at least 1 goal required */
const validateStep2 = (formData: FormData): string | null => {
  if (!formData.goals || formData.goals.length === 0) {
    return 'Please select at least one goal to continue.';
  }
  return null;
};

/** Step 3: Work Experience — must answer yes or no */
const validateStep3 = (formData: FormData): string | null => {
  if (formData.hasWorkExperience === null || formData.hasWorkExperience === undefined) {
    return 'Please select whether you have work experience.';
  }
  return null;
};

/** Step 3b: Work Details — all three fields required; years must be a positive number */
const validateStep3b = (formData: FormData): string | null => {
  const details = formData.workDetails;

  if (!details) {
    return 'Please fill in your work details.';
  }

  if (!details.companyName || details.companyName.trim() === '') {
    return 'Company name is required.';
  }

  if (!details.position || details.position.trim() === '') {
    return 'Position / Role is required.';
  }

  if (!details.yearsOfExperience || details.yearsOfExperience.trim() === '') {
    return 'Years of experience is required.';
  }

  const years = parseFloat(details.yearsOfExperience);
  if (isNaN(years) || years < 0) {
    return 'Please enter a valid positive number for years of experience.';
  }

  return null;
};

/** Step 4: Preferences — at least 1 preference required */
const validateStep4 = (formData: FormData): string | null => {
  if (!formData.preferences || formData.preferences.length === 0) {
    return 'Please select at least one preference to continue.';
  }
  return null;
};
