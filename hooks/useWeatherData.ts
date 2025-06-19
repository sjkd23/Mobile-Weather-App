import Constants from 'expo-constants';
import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchJSON } from '../lib/fetchJSON';

// Reads the API key from app config at runtime
const API_KEY = Constants.expoConfig?.extra?.WEATHER_API_KEY || '';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Shapes for weather and forecast responses
interface WeatherResponse {
  name: string;
  main: { temp: number; feels_like: number };
  weather: { main: string; description: string; icon: string }[];
}

interface ForecastResponse {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { main: string; description: string; icon: string }[];
  }[];
}

// Custom hook for fetching weather and forecast data for a given lat/lon
export default function useWeatherData(lat: number | null, lon: number | null) {
  // Holds current weather data
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  // Holds forecast data
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  // Indicates if a fetch is in progress
  const [loading, setLoading] = useState(false);
  // Stores any error message from fetch
  const [error, setError] = useState<string | null>(null);
  // Used to cancel ongoing fetches if needed
  const controllerRef = useRef<AbortController | null>(null);

  // Fetches both weather and forecast, aborting any previous request
  const fetchAll = useCallback(async () => {
    if (lat == null || lon == null) return;
    controllerRef.current?.abort(); // Cancel previous fetch if still running
    const ctrl = new AbortController();
    controllerRef.current = ctrl;

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const wUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const wData = await fetchJSON(wUrl, { signal: ctrl.signal });
      setWeather(wData);

      // Fetch forecast
      const fUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const fData = await fetchJSON(fUrl, { signal: ctrl.signal });
      setForecast(fData);
    } catch (err: any) {
      // Ignore abort errors, show others
      if (err.name !== 'AbortError') setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  // Refetches data when lat/lon change, cleans up on unmount
  useEffect(() => {
    fetchAll();
    return () => controllerRef.current?.abort();
  }, [fetchAll]);

  // Expose data, loading state, error, and a manual refresh method
  return { weather, forecast, loading, error, refresh: fetchAll };
}
