import React from 'react';
import {
  StyleSheet,
  View,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FormProvider } from 'react-hook-form';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import AppButton from '../components/AppButton';
import { useRegisterFlow } from '../hooks/useRegisterFlow';
import { STEPS_CONFIG, STEP_VALIDATION_FIELDS } from '../config/constants';
import {
  Step1Details,
  Step2Preferences,
  Step3Feedback,
  Step4Summary,
} from '../components/RegisterSteps';
import Colors from '../assets/colors';

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const { state, handlers } = useRegisterFlow();
  const { currentStep, isSubmitting, formMethods } = state;
  const { goNext, goBack } = handlers;
  
  const { watch, formState: { errors } } = formMethods;
  
  const currentStepFields = STEP_VALIDATION_FIELDS[currentStep as keyof typeof STEP_VALIDATION_FIELDS];
  const isStepValid = currentStepFields?.every(field => {
    const value = watch(field);
    return value && !errors[field];
  }) ?? true;

  const currentStepConfig = STEPS_CONFIG[currentStep as keyof typeof STEPS_CONFIG];

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Details />;
      case 2:
        return <Step2Preferences />;
      case 3:
        return <Step3Feedback />;
      case 4:
        return <Step4Summary />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      
      <AppHeader
        title={currentStepConfig.header}
        showBack={currentStep !== 1 && currentStep !== 4}
        onBackPress={goBack}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <FormProvider {...formMethods}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              currentStep === 4 && { paddingHorizontal: 16 }
            ]}
            keyboardShouldPersistTaps="handled"
          >
            {renderStep()}
          </ScrollView>
        </FormProvider>
      </KeyboardAvoidingView>

      {currentStepConfig.button !== '' && (
        <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 24) }]}>
          <AppButton
            title={currentStepConfig.button}
            onPress={goNext}
            loading={isSubmitting}
            disabled={!isStepValid}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  footer: {
    padding: 24,
  },
});

export default RegisterScreen;
