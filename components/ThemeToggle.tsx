import { View, Text, Switch, StyleSheet } from 'react-native';

interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>🌞</Text>
      <Switch
        value={theme === 'dark'}
        onValueChange={onToggle}
      />
      <Text style={styles.label}>🌙</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
  },
  label: {
    fontSize: 16,
  },
});
