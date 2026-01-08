import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from 'react-native';
import Colors from '../assets/colors';

interface AppInputProps extends TextInputProps {
  label?: string;
  containerStyle?: ViewStyle;
}

const AppInput: React.FC<AppInputProps> = ({
  label,
  containerStyle,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input, 
          { borderColor: props.value ? Colors.border : Colors.borderEmpty },
          style
        ]}
        placeholderTextColor={Colors.textSecondary}
        selectionColor={Colors.secondary}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: Colors.textPrimary,
    fontSize: 16,
  },
});

export default AppInput;
