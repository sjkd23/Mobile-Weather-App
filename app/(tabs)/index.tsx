import { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import { fetchJSON } from '../../lib/fetchJSON';
import Header from '../../components/Header';
import SearchBar from '../../components/SearchBar';
import UnitToggle from '../../components/UnitToggle';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import CurrentWeatherCard from '../../components/CurrentWeatherCard';
import Forecast from '../../components/forecast/Forecast';
import useWeatherData from '../../hooks/useWeatherData';
import Footer from '../../components/Footer';

const GEO_API_BASE = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY || '';

export default function HomeScreen() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [cityDisplay, setCityDisplay] = useState('Montreal, CA');
  const [coords, setCoords] = useState({ lat: null as number | null, lon: null as number | null });
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [error, setError] = useState<string | null>(null);

  const { weather, forecast, loading, error: weatherError } = useWeatherData(coords.lat, coords.lon);

  useEffect(() => {
    if (weatherError) setError(weatherError);
  }, [weatherError]);

  const handleChange = useCallback((newDisplay: string) => {
    setCityDisplay(newDisplay);
    setCoords({ lat: null, lon: null });
    setError(null);
  }, []);

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
        const loc = geoResults[0];
        const displayString = `${loc.name}${loc.state ? `, ${loc.state}` : ''}, ${loc.country}`;
        setCityDisplay(displayString);
        setCoords({ lat: loc.lat, lon: loc.lon });
      } else {
        setError('Location not found.');
        setCoords({ lat: null, lon: null });
      }
    } catch (err: any) {
      console.error('Geocoding error:', err);
      setError(err.message || 'Failed to fetch location.');
      setCoords({ lat: null, lon: null });
    }
  }, [cityDisplay]);

  const handleSelect = useCallback((loc: any) => {
    const displayString = `${loc.name}${loc.state ? `, ${loc.state}` : ''}, ${loc.country}`;
    setCityDisplay(displayString);
    setCoords({ lat: loc.lat, lon: loc.lon });
    setError(null);
  }, []);

  useEffect(() => {
    handleSearch();
  }, []);

  const toggleUnit = () => {
    setUnit(prev => (prev === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />

      <Header theme={theme} onChange={setTheme} />
      <SearchBar value={cityDisplay} onChange={handleChange} onSelect={handleSelect} onSearch={handleSearch} />
      <UnitToggle unit={unit} onToggle={toggleUnit} />

      {loading && <Loader />}
      {error && <Error message={error} />}
      {weather && <CurrentWeatherCard weather={weather} unit={unit} />}
      {forecast?.list && <Forecast data={forecast.list} unit={unit} />}


      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 16,
  },
});
