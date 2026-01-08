import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { RegistrationFormData, registrationSchema } from '../config/schema';
import { STEP_VALIDATION_FIELDS } from '../config/constants';
export const useRegisterFlow = () => {
  const navigation = useNavigation<any>();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMethods = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      address1: '',
      address2: '',
      pinCode: '',
      playingStatus: '',
      selectedSport1: '',
      feedback: '',
    },
  });

  const { trigger, handleSubmit } = formMethods;

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const goNext = async () => {
    if (currentStep === 4) {
      navigation.navigate('Login');
      return;
    }

    const fieldsToValidate = STEP_VALIDATION_FIELDS[currentStep];
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      if (currentStep < 3) {
        setCurrentStep((prev) => prev + 1);
      } else if (currentStep === 3) {
        setIsSubmitting(true);
        try {
          await new Promise(resolve => setTimeout(() => resolve(undefined), 1000));
          setCurrentStep(4);
        } catch (error) {
          console.error('Submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    }
  };

  return {
    state: {
      currentStep,
      isSubmitting,
      formMethods,
    },
    handlers: {
      goNext,
      goBack,
      handleSubmit,
    },
  };
};
