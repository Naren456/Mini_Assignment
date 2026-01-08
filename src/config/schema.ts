import * as z from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  pinCode: z.string().length(6, 'Pin code must be 6 digits'),
  playingStatus: z.string().min(1, 'Playing status is required'),
  selectedSport1: z.string().min(1, 'Sport is required'),
  feedback: z.string().min(1, 'Feedback is required').max(1000, 'Max 1000 characters'),
});

export type RegistrationFormData = z.infer<typeof registrationSchema>;
