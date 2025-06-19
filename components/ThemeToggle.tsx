
import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { Pressable, StyleSheet, Text } from 'react-native';

// Button to toggle between dark and light themes.
// Uses ThemeContext to get and set the current mode.
export default function ThemeToggle() {
  const { mode, setMode } = useThemeMode();
  // Determine the next mode to switch to.
  const next = mode === 'dark' ? 'light' : 'dark';
  // Get theme colors for the current mode.
  const theme = getTheme(mode);
  return (
    <Pressable
      onPress={() => setMode(next)}
      style={[styles.btn, { backgroundColor: theme.secondary, borderColor: theme.border }]}>
      <Text style={[styles.text, { color: theme.text }]}>
        {mode === 'dark' ? '🌙 DARK' : '☀️ LIGHT'}
      </Text>
    </Pressable>
  );
}

// Styles for the toggle button and text.
const styles = StyleSheet.create({
  btn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1 },
  text: { fontWeight: '500' },
});
