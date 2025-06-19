import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { StyleSheet, View } from 'react-native';

// Wraps content in a themed container.
// Uses ThemeContext to set background color based on current mode.
export default function SectionWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);
  return <View style={[styles.wrapper, { backgroundColor: theme.secondary }]}>{children}</View>;
}

// Basic styling for section containers.
const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    paddingVertical: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
});
