import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Type for unit (Celsius/Fahrenheit)
export type UnitType = 'metric' | 'imperial';

// Key for AsyncStorage
const UNIT_KEY = 'weather-unit';

// Context shape
interface UnitContextType {
  unit: UnitType;
  setUnit: (unit: UnitType) => void;
  toggleUnit: () => void;
  loading: boolean;
}

// Default context value (not used, just for typing)
const UnitContext = createContext<UnitContextType>({
  unit: 'metric',
  setUnit: () => {},
  toggleUnit: () => {},
  loading: true,
});

// Provider component to wrap your app
export function UnitProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useState<UnitType>('metric');
  const [loading, setLoading] = useState(true);

  // Load saved unit from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(UNIT_KEY).then((saved) => {
      if (saved === 'imperial' || saved === 'metric') {
        setUnit(saved);
      }
      setLoading(false);
    });
  }, []);

  // Save unit whenever it changes
  const handleSetUnit = (newUnit: UnitType) => {
    setUnit(newUnit);
    AsyncStorage.setItem(UNIT_KEY, newUnit).catch(() => {});
  };

  // Toggle between units
  const toggleUnit = () => {
    handleSetUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <UnitContext.Provider value={{ unit, setUnit: handleSetUnit, toggleUnit, loading }}>
      {children}
    </UnitContext.Provider>
  );
}

// Custom hook for easy usage
export function useUnit() {
  return useContext(UnitContext);
}
