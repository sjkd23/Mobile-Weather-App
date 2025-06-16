import { View, Text, Switch, StyleSheet } from 'react-native';

interface UnitToggleProps {
  unit: 'metric' | 'imperial';
  onToggle: () => void;
}

export default function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>°C</Text>
      <Switch
        value={unit === 'imperial'}
        onValueChange={onToggle}
      />
      <Text style={styles.label}>°F</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 16,
  },
});
