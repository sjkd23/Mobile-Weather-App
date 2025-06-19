import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

// ThemeMode tracks the user's preference: light, dark, or system default.
type ThemeMode = 'light' | 'dark' | 'system';

// Context holds the current mode and a setter to update it.
type ThemeContextType = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'system',
  setMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Detects the device's color scheme (light/dark).
  const systemColor = useColorScheme();
  // State stores the current theme mode, defaulting to system.
  const [mode, setModeState] = useState<ThemeMode>('system');

  // Updates theme mode and persists it to AsyncStorage.
  const setMode = async (newMode: ThemeMode) => {
    setModeState(newMode);
    await AsyncStorage.setItem('theme-mode', newMode);
  };

  // Loads saved theme mode from AsyncStorage on mount.
  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('theme-mode');
      if (saved) setModeState(saved as ThemeMode);
    };
    load();
  }, []);

  // Provides theme mode and setter to the component tree.
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook for consuming theme mode and setter in components.
export const useThemeMode = () => useContext(ThemeContext);
