import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientDivider from './GradientLine';
import ThemeToggle from './ThemeToggle';

// Header displays the app title and a theme toggle button.
// It adapts its background and text color based on the current theme mode.
export default function Header() {
  // Get current theme mode and setter from context
  const { mode, setMode } = useThemeMode();
  // Detect system color scheme (light/dark)
  const system = useColorScheme() ?? 'light';
  // Use system mode if selected, otherwise use chosen mode
  const effective = mode === 'system' ? system : mode;
  // Get theme colors for the effective mode
  const theme = getTheme(effective);

  return (
    <SafeAreaView
      edges={['top']}
      style={[
        styles.safe,
        { backgroundColor: theme.cardBackground },
      ]}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: theme.text }]}>
          Weather Checker
        </Text>
        <ThemeToggle />
      </View>
      <GradientDivider />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden', // Ensures rounded corners clip child views
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
