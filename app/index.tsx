import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { UnitProvider, useUnit } from '@/context/UnitContext';
import Constants from 'expo-constants';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Error from '../components/Error';
import Footer from '../components/Footer';
import Forecast from '../components/forecast/Forecast';
import Header from '../components/Header';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import CurrentWeatherCard from '../components/today/CurrentWeatherCard';
import LaterTodayForecast from '../components/today/LaterTodayForecast';
import UnitToggle from '../components/UnitToggle';
import useCitySuggestions, { CitySuggestion } from '../hooks/useCitySuggestions';
import useWeatherData from '../hooks/useWeatherData';
import { fetchJSON } from '../lib/fetchJSON';

const GEO_API_BASE = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = Constants.expoConfig?.extra?.WEATHER_API_KEY || '';

// Main screen for the weather app. Handles theme, search, suggestions, and weather data.
function HomeScreenInner() {
  // Theme setup: respects system or user preference.
  const { mode } = useThemeMode();
  const systemScheme = useColorScheme() ?? 'light';
  const effective = mode === 'system' ? systemScheme : mode;
  const theme = getTheme(effective);

  // City input and coordinates state.
  const [cityDisplay, setCityDisplay] = useState('Montreal, CA');
  const [coords, setCoords] = useState<{ lat: number | null; lon: number | null }>({
    lat: null,
    lon: null,
  });
  const [error, setError] = useState<string | null>(null);

  // Unit from context
  const { unit, toggleUnit, loading: loadingUnit } = useUnit();

  // City autocomplete suggestions.
  const { suggestions, fetchSuggestions } = useCitySuggestions();

  // Weather and forecast data for the selected coordinates.
  const { weather, forecast, loading, error: weatherError } = useWeatherData(
    coords.lat,
    coords.lon
  );

  // Show weather errors in the UI.
  useEffect(() => {
    if (weatherError) setError(weatherError);
  }, [weatherError]);

  // When the user types, update city input and fetch new suggestions.
  const handleChange = useCallback(
    (newDisplay: string) => {
      setCityDisplay(newDisplay);
      setCoords({ lat: null, lon: null });
      setError(null);
      fetchSuggestions(newDisplay);
    },
    [fetchSuggestions]
  );

  // When a suggestion is picked, update display and coordinates.
  const handleSelect = useCallback((loc: CitySuggestion) => {
    const displayString = `${loc.name}${loc.state ? `, ${loc.state}` : ''}, ${loc.country}`;
    setCityDisplay(displayString);
    setCoords({ lat: loc.lat, lon: loc.lon });
    setError(null);
    // clear dropdown
    fetchSuggestions('');
  }, [fetchSuggestions]);

  // On search, geocode the city name to coordinates.
  const handleSearch = useCallback(async () => {
    const query = cityDisplay.trim();
    if (!query) {
      setError('Please enter a city name.');
      return;
    }
    try {
      const geoUrl = `${GEO_API_BASE}?q=${encodeURIComponent(query)}&limit=1&appid=${API_KEY}`;
      const geoResults = await fetchJSON(geoUrl);

      if (Array.isArray(geoResults) && geoResults.length > 0) {
        handleSelect(geoResults[0]);
      } else {
        setError('Location not found.');
        setCoords({ lat: null, lon: null });
      }
    } catch (err: any) {
      console.error('Geocoding error:', err);
      setError(err.message || 'Failed to fetch location.');
      setCoords({ lat: null, lon: null });
    }
  }, [cityDisplay, handleSelect]);

  // Initial weather fetch for the default city.
  useEffect(() => {
    handleSearch(); // initial lookup
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Main content: header, search, suggestions, weather, forecast, and footer.
  const content = (
    <View style={styles.inner}>
      <Header />

      <SearchBar
        value={cityDisplay}
        onChange={handleChange}
        onSearch={handleSearch}
      />

      {/* ▼ suggestions dropdown ▼ */}
      {suggestions.length > 0 && (
        <View
          style={[
            styles.suggestionsContainer,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
            },
          ]}
        >
          {suggestions.map((loc) => (
            <Pressable
              key={`${loc.name}-${loc.lat}-${loc.lon}`}
              onPress={() => handleSelect(loc)}
              style={styles.suggestionItem}
            >
              <Text style={[styles.suggestionText, { color: theme.text }]}>
                {loc.name}
                {loc.state ? `, ${loc.state}` : ''}, {loc.country}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      {/* ▲ end dropdown ▲ */}

      <UnitToggle unit={unit} onToggle={toggleUnit} />
      {loading && <Loader />}
      {error && <Error message={error} />}
      {weather && <CurrentWeatherCard weather={weather} unit={unit} />}
      {forecast?.list && (
        <>
          <LaterTodayForecast data={forecast.list} unit={unit} />
          <Forecast data={forecast.list} unit={unit} />
        </>
      )}
      <Footer />
    </View>
  );

  // While unit is loading from storage, show loader
  if (loadingUnit) {
    return (
      <View style={[styles.inner, { flex: 1, justifyContent: 'center' }]}>
        <Loader />
      </View>
    );
  }

  // Use FlatList for layout to enable scrolling if needed.
  return (
    <>
      <StatusBar
        barStyle={effective === 'dark' ? 'light-content' : 'dark-content'}
      />
      <FlatList
        data={[1]}
        renderItem={() => content}
        keyExtractor={() => 'content'}
        contentContainerStyle={styles.contentContainer}
        style={[styles.container, { backgroundColor: theme.background }]}
      />
    </>
  );
}

// Wrap the screen with UnitProvider to provide context.
export default function HomeScreen() {
  return (
    <UnitProvider>
      <HomeScreenInner />
    </UnitProvider>
  );
}

// Styles for layout and dropdown.
const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: 14, paddingBottom: 40 },
  inner: { alignItems: 'center' },

  // dropdown styles
  suggestionsContainer: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    maxHeight: 200,
    marginBottom: 8,
    overflow: 'hidden',
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  suggestionText: {
    fontSize: 16,
  },
});
