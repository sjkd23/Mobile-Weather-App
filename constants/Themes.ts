
import { Colors } from './Colors';

// ThemeMode defines the available theme options.
export type ThemeMode = 'light' | 'dark' | 'system';

// themes maps each mode to its color palette.
export const themes = {
  light: {
    ...Colors.light,
  },
  dark: {
    ...Colors.dark,
  },
};

// Returns the color palette for the given mode.
// If mode is 'system', the caller decides which palette to use based on device settings.
export function getTheme(mode: ThemeMode) {
  if (mode === 'light') return themes.light;
  if (mode === 'dark') return themes.dark;
  // Default to light if mode is 'system' or unrecognized.
  return themes.light;
}
