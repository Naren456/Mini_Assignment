import { RegistrationFormData } from './schema';

export const STATUS_OPTIONS = ['Looking for Playground', 'Looking for Player'];
export const SPORT_OPTIONS = ['Archery', 'Badminton', 'Basketball', 'Boxing', 'Cricket'];

export const STEPS_CONFIG = {
  1: { header: 'Enter your details', button: 'Next' },
  2: { header: 'Enter your details', button: 'Next' },
  3: { header: 'Share Your Feedback', button: 'Submit' },
  4: { header: 'Your details', button: '' },
} as const;

export type StepNumber = keyof typeof STEPS_CONFIG;

export const STEP_VALIDATION_FIELDS: Record<number, (keyof RegistrationFormData)[]> = {
  1: ['name', 'address1', 'pinCode'],
  2: ['playingStatus', 'selectedSport1'],
  3: ['feedback'],
};
