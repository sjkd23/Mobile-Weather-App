import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';
import { fetchJSON } from '../lib/fetchJSON';

const GEO_API_BASE = 'https://api.openweathermap.org/geo/1.0/direct';
const API_KEY = process.env.EXPO_PUBLIC_WEATHER_API_KEY || '';

export interface CitySuggestion {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export default function useCitySuggestions(query: string, limit = 5): CitySuggestion[] {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const ctrl = new AbortController();
    const url = `${GEO_API_BASE}?q=${encodeURIComponent(debouncedQuery)}&limit=${limit}&appid=${API_KEY}`;

    fetchJSON(url, { signal: ctrl.signal })
      .then((data) => setSuggestions(data))
      .catch((err) => {
        if (err.name !== 'AbortError') {
          console.error('City suggestions error:', err);
          setSuggestions([]);
        }
      });

    return () => ctrl.abort();
  }, [debouncedQuery, limit]);

  return suggestions;
}
