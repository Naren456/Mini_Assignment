# StapuBox OTP Mini-Assignment

This project implements a 3-screen React Native flow for mobile number login via OTP, integrated with the StapuBox API.

## 🚀 Features

- **Screen 1: Login**
  - Modern, premium UI with a dark theme.
  - 10-digit Indian mobile number validation.
  - API integration to send OTP.
- **Screen 2: Verify OTP**
  - Custom 4-digit OTP input with auto-focus and auto-next logic.
  - **Auto-read SMS** for Android using the SMS Retriever API.
  - **Auto-submit** once the 4th digit is filled.
  - 60-second cooldown timer for "Resend OTP".
  - "Change number" link to return to the login screen.
- **Screen 3: Success**
  - Clean success state with a checkmark and welcome message.

## 🛠️ Tech Stack

- **React Native** (v0.83.1)
- **TypeScript**
- **React Navigation** (Stack)
- **Native Modules**: `react-native-sms-retriever` for Android SMS auto-reading.

## 📦 Setup & Run

### Prerequisites
- Node.js (v20+)
- React Native Environment Setup for Android/iOS.

### Installation
1. Install dependencies:
   ```sh
   npm install
   ```
2. (iOS only) Install pods:
   ```sh
   cd ios && pod install && cd ..
   ```

### Running the App
- **Android**:
  ```sh
  npm run android
  ```
- **iOS**:
  ```sh
  npm run ios
  ```

## 🔌 API Configuration

The API settings are located in `src/api/config.ts`. If you have a different API token, please update it there.

```typescript
export const API_CONFIG = {
  BASE_URL: 'https://stapubox.com/trial',
  TOKEN: 'your_token_here',
};
```

## 📝 Design Decisions

- **Premium UI**: Used a deep dark theme (`#0F0F10`) with vibrant blue highlights (`#007AFF`) and consistent spacing/typography for a high-end sports UX feel.
- **Performance**: Used functional components with hooks and optimized re-renders for the custom OTP inputs.
- **Error Handling**: Implemented robust error catching for all API calls with user-friendly alerts.

## ⚠️ Known Issues / Limitations
- SMS Auto-read is Android-exclusive as per the SMS Retriever API.
- The `X-Api-Token` should be kept secure; for this assignment, it's defined in the code for easy demonstration.
