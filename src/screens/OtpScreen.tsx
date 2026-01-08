import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { apiService } from '../api/apiService';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import SmsRetriever from 'react-native-sms-retriever';
import Colors from '../assets/colors';

const OtpScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { mobile } = route.params || { mobile: '' };

  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [error, setError] = useState('');

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    startSmsRetriever();
    return () => {
      SmsRetriever.removeSmsListener();
    };
  }, []);

  const startSmsRetriever = async () => {
    try {
      const appHash = await (SmsRetriever as any).getAppHash();
      console.log('Your App Hash is:', appHash);
      
      const registered = await SmsRetriever.startSmsRetriever();
      if (registered) {
        SmsRetriever.addSmsListener((event: any) => {
          if (event && event.message) {
            const otpCode = event.message.match(/\d{4}/);
            if (otpCode && otpCode[0]) {
              const otpArray = otpCode[0].split('');
              setOtp(otpArray);
              handleVerify(otpCode[0]);
            }
          }
        });
      }
    } catch (error) {
      console.log('SMS Retriever Error:', error);
    }
  };

  const handleOtpChange = (value: string, index: number) => {
    
    if (value.length === 4 && /^\d+$/.test(value)) {
      const otpArray = value.split('');
      setOtp(otpArray);
      if (error) setError('');
      handleVerify(value);
      return;
    }

    
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (error) setError('');

    
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    
    const combinedOtp = newOtp.join('');
    if (combinedOtp.length === 4) {
      handleVerify(combinedOtp);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async (otpValue: string) => {
    if (otpValue.length !== 4) return;
    
    setLoading(true);
    try {
      const response = await apiService.verifyOtp(mobile, otpValue);
      if (response.status === 'success') {
        navigation.navigate('Register');
      } else {
        setError(response.message || 'Wrong OTP Entered');
        setOtp(['', '', '', '']);
        inputRefs[0].current?.focus();
      }
    } catch (error: any) {
      setError(error.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (isResendDisabled) return;

    setLoading(true);
    try {
      const response = await apiService.resendOtp(mobile);
      if (response.status === 'success') {
        setTimer(60);
        setIsResendDisabled(true);
        setOtp(['', '', '', '']);
        setError('');
        inputRefs[0].current?.focus();
        Alert.alert('Success', 'OTP resent successfully');
      } else {
        setError(response.message || 'Failed to resend OTP');
      }
    } catch (error: any) {
      setError(error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <AppHeader 
        title="Phone Verification" 
        showBack 
        onBackPress={() => navigation.goBack()} 
      />

      <View style={styles.content}>
        <View style={styles.headerContainer}>
        <Text style={styles.subHeader}>Enter 4 digit OTP sent to your phone{"\n"}number</Text>
        </View>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputRefs[index]}
              style={[
                styles.otpInput,
                { borderColor: digit ? Colors.border : Colors.borderEmpty }
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={index === 0 ? 4 : 1} 
              selectionColor={Colors.secondary}
              autoFocus={index === 0}
              autoComplete="one-time-code"
              textContentType="oneTimeCode"
            />
          ))}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          onPress={handleResend} 
          disabled={isResendDisabled || loading}
        >
          <Text style={[styles.resendText, isResendDisabled && styles.resendDisabledText]}>
            {isResendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
          </Text>
        </TouchableOpacity>

        {loading && (
          <ActivityIndicator size="large" color={Colors.secondary} style={styles.loader} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.buttonDisabled,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 40, 
  },
  headerContainer:{
    marginTop: 20,
    marginBottom: 32,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 32,
    width: '100%', 
  },
  content: {
    paddingHorizontal: 18, 
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 32,
    gap: 12, 
  },
  otpInput: {
    width: 50, 
    height: 50,
    borderWidth: 1,
    borderColor: Colors.borderEmpty,
    borderRadius: 8,
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
  },
  resendText: {
    color: Colors.link,
    fontSize: 14,
    fontWeight: '600',
  },
  resendDisabledText: {
    color: Colors.link,
  },
  loader: {
    marginTop: 40,
  },
  errorText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: '400',
    marginTop: -12,
    marginBottom: 24,
  }
});

export default OtpScreen;