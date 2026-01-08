import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import Colors from '../assets/colors';

interface AppDropdownProps {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  style?: any;
}

const AppDropdown: React.FC<AppDropdownProps> = ({
  label,
  options,
  selectedValue,
  onSelect,
  placeholder = 'Select option',
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          { borderColor: selectedValue ? Colors.border : Colors.borderEmpty },
          style
        ]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={[
          styles.dropdownButtonText,
          !selectedValue && styles.placeholderText
        ]}>
          {selectedValue || placeholder}
        </Text>
        <Text style={styles.arrow}>▼</Text>
      </TouchableOpacity>
      
      {isOpen && (
        <View style={styles.optionsContainer}>
          <ScrollView 
            style={styles.optionsList} 
            bounces={false}
            nestedScrollEnabled={true}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.option,
                  selectedValue === option && styles.selectedOption,
                  index === options.length - 1 && { borderBottomWidth: 0 }
                ]}
                onPress={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedValue === option && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  dropdownButton: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: '400',
  },
  placeholderText: {
    color: Colors.dropdownPlaceholder,
  },
  arrow: {
    color: Colors.textPrimary,
    fontSize: 10,
  },
  optionsContainer: {
    marginTop: 8,
    backgroundColor: Colors.dropdownBg,
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
    maxHeight: 250,
    overflow: 'hidden',
  },
  optionsList: {
    paddingVertical: 4,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dropdownBorder,
  },
  selectedOption: {
    backgroundColor: Colors.dropdownSelectedBg,
  },
  optionText: {
    fontSize: 15,
    color: Colors.dropdownText,
    fontWeight: '400',
  },
  selectedOptionText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default AppDropdown;
