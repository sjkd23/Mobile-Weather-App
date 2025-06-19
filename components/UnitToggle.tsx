
import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { Pressable, StyleSheet, Text, View } from 'react-native';

// Expects the current unit and a toggle handler
interface Props { unit: 'metric' | 'imperial'; onToggle: () => void; }

export default function UnitToggle({ unit, onToggle }: Props) {
  // Grab the current theme mode (light/dark)
  const { mode } = useThemeMode();
  // Get theme colors for the current mode
  const theme = getTheme(mode);
  // Used to highlight the selected unit
  const isC = unit === 'metric';

  return (
    <View style={[styles.container, { backgroundColor: theme.secondary }]}>
      {/* Celsius button: highlighted if selected */}
      <Pressable onPress={onToggle} style={[styles.btn, isC && { backgroundColor: theme.primary }]}>
        <Text style={isC ? styles.textActive : styles.text}>°C</Text>
      </Pressable>
      {/* Fahrenheit button: highlighted if selected */}
      <Pressable onPress={onToggle} style={[styles.btn, !isC && { backgroundColor: theme.primary }]}>
        <Text style={!isC ? styles.textActive : styles.text}>°F</Text>
      </Pressable>
    </View>
  );
}

// Styles for the toggle container and buttons
const styles = StyleSheet.create({
  container: { flexDirection: 'row', borderRadius: 8, overflow: 'hidden', marginVertical: 8 },
  btn: { flex: 1, alignItems: 'center', paddingVertical: 6 },
  text: { color: '#555', fontSize: 14 },
  textActive: { color: '#fff', fontSize: 14 },
});
