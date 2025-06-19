import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import GradientDivider from '../GradientLine';

// Expects current weather data and a temperature unit
interface WeatherCardProps {
  weather: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min?: number;
      temp_max?: number;
      humidity?: number;
      pressure?: number;
    };
    weather: { main: string; description: string; icon: string }[];
    wind?: { speed: number };
    clouds?: { all: number };
    visibility?: number;
    sys?: { country: string };
  };
  unit: 'metric' | 'imperial';
}

// Converts temperature to the selected unit
const convertTemp = (temp: number, unit: 'metric' | 'imperial') =>
  unit === 'imperial' ? temp * 9 / 5 + 32 : temp;

// Picks a banner color based on the main weather type
const getCardColor = (main: string) => {
  switch (main.toLowerCase()) {
    case 'clear':
      return '#FFE082';
    case 'clouds':
      return '#CFD8DC';
    case 'rain':
    case 'drizzle':
      return '#81D4FA';
    case 'thunderstorm':
      return '#B39DDB';
    case 'snow':
      return '#E1F5FE';
    default:
      return '#E0E0E0';
  }
};

export default function CurrentWeatherCard({
  weather,
  unit,
}: WeatherCardProps) {
  // Toggle for showing extra weather details
  const [expanded, setExpanded] = useState(false);

  // Use theme from context, fallback to system if needed
  const { mode } = useThemeMode();
  const system = useColorScheme() ?? 'light';
  const effective = mode === 'system' ? system : mode;
  const theme = getTheme(effective);

  // Weather icon from OpenWeatherMap
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  // Prepare main temperature values
  const temp = Math.round(convertTemp(weather.main.temp, unit) * 10) / 10;
  const feelsLike =
    Math.round(convertTemp(weather.main.feels_like, unit) * 10) / 10;
  const high = weather.main.temp_max
    ? Math.round(convertTemp(weather.main.temp_max, unit))
    : null;
  const low = weather.main.temp_min
    ? Math.round(convertTemp(weather.main.temp_min, unit))
    : null;
  const wind = weather.wind?.speed
    ? Math.round(weather.wind.speed)
    : null;
  const visibility = weather.visibility
    ? (weather.visibility / 1000).toFixed(1)
    : null;

  // Banner color based on weather type
  const bgColor = getCardColor(weather.weather[0].main);

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.cardBackground,
          shadowColor: theme.shadow,
        },
      ]}
    >
      {/* Top banner shows weather type color */}
      <View style={[styles.banner, { backgroundColor: bgColor }]} />

      <Text style={[styles.city, { color: theme.text }]}>
        {weather.name}, {weather.sys?.country}
      </Text>
      <Image source={{ uri: iconUrl }} style={[styles.icon, { backgroundColor: theme.iconBackground }]} />
      <Text style={[styles.temp, { color: theme.text }]}>
        {temp}°{unit === 'metric' ? 'C' : 'F'}
      </Text>
      <Text style={[styles.description, { color: theme.text }]}>
        {weather.weather[0].description}
      </Text>
      <Text style={[styles.feels, { color: theme.text }]}>
        Feels like {feelsLike}°
      </Text>
      {high !== null && low !== null && (
        <Text style={[styles.highLow, { color: theme.text }]}>
          H: {high}° / L: {low}°
        </Text>
      )}

      {/* Expand/collapse for extra details */}
      <Pressable
        onPress={() => setExpanded(!expanded)}
        style={[styles.toggleBtn, { backgroundColor: theme.secondary }]}
      >
        <Text style={[styles.toggleText, { color: theme.primary }]}>
          {expanded ? 'Hide Details ▲' : 'More Details ▼'}
        </Text>
      </Pressable>

      {expanded && (
        <View
          style={[styles.details, { backgroundColor: theme.secondary }]}
        >
          <GradientDivider />
          {weather.main.humidity !== undefined && (
            <View style={styles.detailRow}>
              <Text
                style={[styles.detailLabel, { color: theme.text }]}
              >
                💧 Humidity
              </Text>
              <Text
                style={[styles.detailValue, { color: theme.text }]}
              >
                {weather.main.humidity}%
              </Text>
            </View>
          )}
          {weather.main.pressure !== undefined && (
            <View style={styles.detailRow}>
              <Text
                style={[styles.detailLabel, { color: theme.text }]}
              >
                📊 Pressure
              </Text>
              <Text
                style={[styles.detailValue, { color: theme.text }]}
              >
                {weather.main.pressure} hPa
              </Text>
            </View>
          )}
          {wind !== null && (
            <View style={styles.detailRow}>
              <Text
                style={[styles.detailLabel, { color: theme.text }]}
              >
                🌬️ Wind Speed
              </Text>
              <Text
                style={[styles.detailValue, { color: theme.text }]}
              >
                {wind} {unit === 'metric' ? 'm/s' : 'mph'}
              </Text>
            </View>
          )}
          {visibility && (
            <View style={styles.detailRow}>
              <Text
                style={[styles.detailLabel, { color: theme.text }]}
              >
                👁️ Visibility
              </Text>
              <Text
                style={[styles.detailValue, { color: theme.text }]}
              >
                {visibility} km
              </Text>
            </View>
          )}
          {weather.clouds?.all !== undefined && (
            <View style={styles.detailRow}>
              <Text
                style={[styles.detailLabel, { color: theme.text }]}
              >
                ☁️ Cloudiness
              </Text>
              <Text
                style={[styles.detailValue, { color: theme.text }]}
              >
                {weather.clouds.all}%
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

// Styles for card layout, banner, and details
const styles = StyleSheet.create({
  card: {
    padding: 0,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  banner: {
    height: 12,
    width: '100%',
    marginBottom: 8,
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  icon: {
    width: 80,
    height: 80,
    marginVertical: 8,
    borderRadius: 40,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  description: {
    textTransform: 'capitalize',
    marginTop: 4,
  },
  feels: {
    fontSize: 14,
    marginTop: 2,
  },
  highLow: {
    fontSize: 14,
    marginTop: 4,
  },
  toggleBtn: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  toggleText: {
    fontWeight: '600',
    fontSize: 14,
  },
  details: {
    marginTop: 14,
    width: '100%',
    padding: 14,
    borderRadius: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '500',
  },
});
