import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

// GradientDivider renders a horizontal gradient line that adapts to the current theme.
// Uses theme colors for the gradient, providing a subtle divider between sections.
export default function GradientDivider() {
  const { mode } = useThemeMode();
  // Detect system color scheme if mode is set to system
  const system = useColorScheme() ?? 'light';
  const effective = mode === 'system' ? system : mode;
  // Get theme colors for the divider
  const theme = getTheme(effective);

  return (
    <LinearGradient
      colors={[theme.lineEndColor, theme.lineColor, theme.lineEndColor]}
      start={[0, 0]}
      end={[1, 0]}
      style={styles.divider}
    />
  );
}

const styles = StyleSheet.create({
  divider: {
    width: '95%',
    height: 1,
    marginVertical: 8,
    alignSelf: 'center',
  },
});
