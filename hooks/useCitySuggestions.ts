import Constants from 'expo-constants';
import { useState } from 'react';
import { fetchJSON } from '../lib/fetchJSON';

// Represents a city suggestion from the API
export interface CitySuggestion {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}

// API key is loaded from app config at runtime
const API_KEY = Constants.expoConfig?.extra?.WEATHER_API_KEY || '';

// Fetches city suggestions for a given search string.
// Useful for autocomplete or search dropdowns.
export default function useCitySuggestions() {
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);

  // Calls OpenWeatherMap's geocoding API to get city matches.
  const fetchSuggestions = async (query: string, limit = 5) => {
    // If the query is empty or just spaces, clear suggestions and exit
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      // Calls the geocoding endpoint with the user's query
      const response = await fetchJSON<CitySuggestion[]>(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
          query
        )}&limit=${limit}&appid=${API_KEY}`
      );
      // Only set suggestions if the response is an array
      setSuggestions(Array.isArray(response) ? response : []);
    } catch (error) {
      // On error, log and clear suggestions so UI doesn't show stale data
      console.error('Suggestion fetch error:', error);
      setSuggestions([]);
    }
  };

  // Expose the current suggestions and the fetch function
  return { suggestions, fetchSuggestions };
}
