import { View, Text, StyleSheet } from 'react-native';

interface HeaderProps {
  theme: 'light' | 'dark';
  onChange: (theme: 'light' | 'dark') => void;
}

export default function Header({ theme }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Weather App</Text>
      {/* Add theme toggle here if needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
