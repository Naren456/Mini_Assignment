import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiService } from '../api/apiService';
import { SafeAreaView } from 'react-native-safe-area-context';
const LoginScreen = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<any>();

  const handleSendOtp = async () => {

 
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
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

          <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="9999999999"
            placeholderTextColor="#8E8E93"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />
          </View>
          </View>
          
          <View>
          <TouchableOpacity 
            onPress={handleSendOtp} 
            style={[styles.button , (!mobile||loading) && styles.buttonDisabled]}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText ,((mobile||loading) && styles.buttonDisabled)}>Send OTP</Text>
            )}
          </TouchableOpacity>
          </View>

          
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
    backgroundColor:'#2D2E2F'
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
    fontSize :20,
    fontWeight:'600',
    lineHeight:28,
    color:'#fff'
  },
  formContainer :{
    width:'100%'
  },
  inputRow:{
    flexDirection:'row',
     marginBottom:24,
     height:56,
  },
  countryCode:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3A3A3C',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginRight: 10,
    width: 80,
  },
  countryCodeText:{
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  arrowIcon:{
     color: '#FFFFFF',
    fontSize: 10,
  },
  buttonDisabled:{
    opacity: 0.5
  },

  button:{
    backgroundColor: '#FFFFFF0A', 
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  buttonText:{
    color: '#FFFFFF21',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDisabled: {
    color: '#8E8E93',
  },
  input: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#FFFFFF', 
    fontSize: 12,    
    fontWeight: '600', 
  },
  link: {
    color: '#2398FE', 
    fontSize: 12,     
    fontWeight: '600', 
  }
});