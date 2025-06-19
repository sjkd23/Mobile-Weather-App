import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

// Footer displays attribution and copyright.
// It adapts its background and text color based on the current theme.
export default function Footer() {
  const { mode } = useThemeMode();
  // Detect system color scheme if mode is set to system
  const system = useColorScheme() ?? 'light';
  const effective = mode === 'system' ? system : mode;
  // Get theme colors for the footer
  const theme = getTheme(effective);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.footerBackground }]}
    >
      <Text style={[styles.text, { color: theme.text }]}>
        Powered by the OpenWeatherMap API
      </Text>
      <Text style={[styles.text, { color: theme.text }]}>© Dylan Stauch</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 2,
  },
});
