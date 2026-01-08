import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../assets/colors';

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
}) => {
  return (
    <View style={styles.header}>
      {showBack ? (
        <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
          <Text style={styles.backButtonText}>{"<"}</Text>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 40 }} />
      )}
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
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
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
});

export default AppHeader;
