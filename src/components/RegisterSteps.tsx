import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFormContext, Controller } from 'react-hook-form';
import AppInput from './AppInput';
import AppDropdown from './AppDropdown';
import { RegistrationFormData } from '../config/schema';
import { STATUS_OPTIONS, SPORT_OPTIONS } from '../config/constants';
import Colors from '../assets/colors';

export const Step1Details = () => {
  const { control, formState: { errors } } = useFormContext<RegistrationFormData>();

  return (
    <View style={styles.stepContainer}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Name*"
            placeholder="antoine@soch.at"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
            style={{ borderColor: Colors.strokeUnalive }}
          />
        )}
      />
      <Controller
        control={control}
        name="address1"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Address*"
            placeholder="Address Line 1"
            value={value}
            onChangeText={onChange}
            error={errors.address1?.message}
            style={{ borderColor: Colors.strokeUnalive }}
          />
        )}
      />
      <Controller
        control={control}
        name="address2"
        render={({ field: { onChange, value } }) => (
          <AppInput
            placeholder="Address Line 2 (Optional)"
            value={value}
            onChangeText={onChange}
            style={{ borderColor: Colors.strokeUnalive }}
          />
        )}
      />
      <Controller
        control={control}
        name="pinCode"
        render={({ field: { onChange, value } }) => (
          <AppInput
            label="Pin Code*"
            placeholder="110224"
            keyboardType="number-pad"
            maxLength={6}
            value={value}
            onChangeText={onChange}
            error={errors.pinCode?.message}
            style={{ borderColor: Colors.strokeUnalive }}
          />
        )}
      />
    </View>
  );
};

export const Step2Preferences = () => {
  const { control, formState: { errors } } = useFormContext<RegistrationFormData>();

  return (
    <View style={styles.stepContainer}>
      <Controller
        control={control}
        name="playingStatus"
        render={({ field: { onChange, value } }) => (
          <AppDropdown
            label="Playing Status"
            placeholder="Looking for Playground"
            options={STATUS_OPTIONS}
            selectedValue={value}
            onSelect={onChange}
            error={errors.playingStatus?.message}
            style={{ borderColor: Colors.strokeUnalive }}
          />
        )}
      />
      <Controller
        control={control}
        name="selectedSport1"
        render={({ field: { onChange, value } }) => (
          <AppDropdown
            label="Sport you like *"
            placeholder="Badminton"
            options={SPORT_OPTIONS}
            selectedValue={value}
            onSelect={onChange}
            error={errors.selectedSport1?.message}
            style={{ borderColor: Colors.strokeUnalive }}
          />
        )}
      />
    </View>
  );
};

export const Step3Feedback = () => {
  const { control, formState: { errors }, watch } = useFormContext<RegistrationFormData>();
  const feedbackValue = watch('feedback') || '';

  return (
    <View style={styles.stepContainer}>
      <View style={styles.inputGroup}>
        <Controller
          control={control}
          name="feedback"
          render={({ field: { onChange, value } }) => (
            <AppInput
              label="Feedback"
              placeholder="Write your suggestion"
              multiline
              numberOfLines={6}
              maxLength={1000}
              value={value}
              onChangeText={onChange}
              error={errors.feedback?.message}
              style={[styles.textArea, { borderColor: Colors.strokeUnalive }]}
              containerStyle={styles.feedbackInputContainer}
            />
          )}
        />
        <Text style={styles.charCount}>{feedbackValue.length}/1000</Text>
      </View>
    </View>
  );
};

const SummaryItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={styles.summaryValue}>{value || 'Not provided'}</Text>
  </View>
);

export const Step4Summary = () => {
  const { getValues } = useFormContext<RegistrationFormData>();
  const values = getValues();

  return (
    <View style={styles.summaryContainer}>
      <SummaryItem label="Name" value={values.name} />
      <SummaryItem label="Address" value={`${values.address1}${values.address2 ? ', ' + values.address2 : ''}`} />
      <SummaryItem label="Pin Code" value={values.pinCode} />
      <SummaryItem label="Playing Status" value={values.playingStatus} />
      <SummaryItem label="Sport you like" value={values.selectedSport1} />
      <SummaryItem label="Feedback" value={values.feedback} />
    </View>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 24,
  },
  charCount: {
    alignSelf: 'flex-end',
    color: Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 20,
  },
  feedbackInputContainer: {
    marginBottom: 16,
  },
  textArea: {
    height: 214,
    textAlignVertical: 'top',
    padding: 12,
    borderRadius: 8,
  },
  summaryContainer: {
    paddingBottom: 20,
  },
  summaryItem: {
    marginBottom: 24,
  },
  summaryLabel: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    opacity: 0.9,
  },
  summaryValue: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
});
