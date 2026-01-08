import { API_CONFIG } from './config';

const request = async (endpoint: string, options: any = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_CONFIG.BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'X-Api-Token': API_CONFIG.TOKEN,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.message || `Error: ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error: any) {
    if (error.message === 'Network request failed') {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};

export const apiService = {
  sendOtp: (mobile: string) => 
    request('/sendOtp', {
      method: 'POST',
      body: JSON.stringify({ mobile }),
    }),

  resendOtp: (mobile: string) => 
    request(`/resendOtp?mobile=${mobile}`, {
      method: 'POST',
    }),

  verifyOtp: (mobile: string, otp: string) => 
    request(`/verifyOtp?mobile=${mobile}&otp=${otp}`, {
      method: 'POST',
    }),
};
