import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchJSON } from '../lib/fetchJSON';

const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherResponse {
  name: string;
  main: { temp: number; feels_like: number };
  weather: { description: string }[];
}

interface ForecastResponse {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { description: string }[];
  }[];
}

export default function useWeatherData(lat: number | null, lon: number | null) {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const fetchAll = useCallback(async () => {
    if (lat == null || lon == null) return;
    controllerRef.current?.abort();
    const ctrl = new AbortController();
    controllerRef.current = ctrl;

    setLoading(true);
    setError(null);

    try {
      const wUrl = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const wData = await fetchJSON(wUrl, { signal: ctrl.signal });
      setWeather(wData);

      const fUrl = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const fData = await fetchJSON(fUrl, { signal: ctrl.signal });
      setForecast(fData);
    } catch (err: any) {
      if (err.name !== 'AbortError') setError(err.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [lat, lon]);

  useEffect(() => {
    fetchAll();
    return () => controllerRef.current?.abort();
  }, [fetchAll]);

  return { weather, forecast, loading, error, refresh: fetchAll };
}
