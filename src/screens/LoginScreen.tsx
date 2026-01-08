import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiService } from '../api/apiService';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { SafeAreaView } from 'react-native-safe-area-context';
import SmsRetriever from 'react-native-sms-retriever';
import Colors from '../assets/colors';

const LoginScreen = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  React.useEffect(() => {
    requestPhoneNumber();
  }, []);

  const requestPhoneNumber = async () => {
    try {
      const phoneNumber = await SmsRetriever.requestPhoneNumber();
      if (phoneNumber) {
        // Remove country code if present (e.g., +91)
        const cleanNumber = phoneNumber.replace(/[^0-9]/g, '').slice(-10);
        setMobile(cleanNumber);
      }
    } catch (error) {
      console.log('Phone Number Request Error:', error);
    }
  };

  const handleSendOtp = async () => {
    if (!mobile || mobile.length !== 10) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      const response = await apiService.sendOtp(mobile);
      if (response.status === 'success' || response.otp) {
        navigation.navigate('Otp', { mobile });
      } else {
        Alert.alert('Error', response.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
    //   navigation.navigate('Otp', { mobile });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <View style={styles.content}>
        <View style={styles.headerContainer} >
          <Text style={styles.header}>Login to Your Account</Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
              <Text style={styles.arrowIcon}>▼</Text>
            </View>

            <AppInput 
              containerStyle={styles.inputContainer}
              placeholder="9999999999"
              keyboardType="number-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
              style={styles.inputStyle}
            />
          </View>
          
          <AppButton 
            title="Send OTP" 
            onPress={handleSendOtp} 
            loading={loading}
            disabled={!mobile}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text 
                onPress={() => navigation.navigate('Register')} 
                style={styles.link}
              >
                Create Account
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Colors.background
  },
  content:{
    flex:1,
    paddingHorizontal:24,
    justifyContent:'center'
  },
  headerContainer :{
    marginBottom :48,
    alignItems:'center'
  },
  header : {
    fontSize : 20,
    fontWeight: '600',
    lineHeight: 32,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  formContainer :{
    width:'100%'
  },
  inputRow:{
    flexDirection:'row',
     marginBottom:24,
     height:56,
  },
  inputContainer:{
    flex:1,
    borderWidth: 0, 
    paddingHorizontal: 0,
    marginRight: 0,
    width: '100%',
    marginBottom: 0,
  },
  inputStyle: {
    fontSize: 18,
    fontWeight: '500',
  },
  countryCode:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.borderEmpty,
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 10,
    width: 80,
  },
  countryCodeText:{
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  arrowIcon:{
     color: Colors.textPrimary,
    fontSize: 10,
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.textPrimary, 
    fontSize: 12,    
    fontWeight: '600', 
  },
  link: {
    color: Colors.link, 
    fontSize: 12,     
    fontWeight: '600', 
  }
});