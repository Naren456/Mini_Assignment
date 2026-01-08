import { API_CONFIG } from './config';

export const apiService = {
  sendOtp: async (mobile: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/sendOtp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Token': API_CONFIG.TOKEN,
      },
      body: JSON.stringify({ mobile }),
    });
    return response.json();
  },

  resendOtp: async (mobile: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/resendOtp?mobile=${mobile}`, {
      method: 'POST',
      headers: {
        'X-Api-Token': API_CONFIG.TOKEN,
      },
    });
    return response.json();
  },

  verifyOtp: async (mobile: string, otp: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/verifyOtp?mobile=${mobile}&otp=${otp}`, {
      method: 'POST',
      headers: {
        'X-Api-Token': API_CONFIG.TOKEN,
      },
    });
    return response.json();
  },
};
