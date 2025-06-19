import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import 'react-native-reanimated';

import { ThemeProvider, useThemeMode } from '@/context/ThemeContext';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Handles navigation and theme selection for the app.
// Uses ThemeContext to determine if user wants dark, light, or system theme.
function Layout() {
  const { mode } = useThemeMode();
  // Get system color scheme as fallback.
  const system = useColorScheme() ?? 'light';
  // Use system theme if user selected 'system', otherwise use chosen mode.
  const effective = mode === 'system' ? system : mode;

  // Pick navigation theme based on effective mode.
  const navTheme = effective === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <SafeAreaProvider>
      <NavigationThemeProvider value={navTheme}>
        <Stack>
          {/* Main screen, header hidden for custom UI */}
          <Stack.Screen name="index" options={{ title: 'Weather App', headerShown: false }} />
        </Stack>
        {/* Status bar color matches theme */}
        <StatusBar style={effective === 'dark' ? 'light' : 'dark'} />
      </NavigationThemeProvider>
    </SafeAreaProvider>
  );
}

// Wraps the app in ThemeProvider so theme context is available everywhere.
export default function AppWrapper() {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  );
}
