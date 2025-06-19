import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import {
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Card expects a forecast object, temperature unit, and an optional variant (hourly/daily)
interface ForecastCardProps {
  forecast: {
    dt_txt: string;
    main: { temp: number };
    weather: { main: string; description: string; icon: string }[];
  };
  unit: 'metric' | 'imperial';
  variant?: 'hourly' | 'daily';
}

// Returns a background color based on weather type
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

// Converts temperature to the selected unit
const convertTemp = (temp: number, unit: 'metric' | 'imperial') =>
  unit === 'imperial' ? temp * 9 / 5 + 32 : temp;

export default function ForecastCard({
  forecast,
  unit,
  variant = 'daily',
}: ForecastCardProps) {
  // Use theme from context, fallback to system if set
  const { mode } = useThemeMode();
  const system = useColorScheme() ?? 'light';
  const effective = mode === 'system' ? system : mode;
  const theme = getTheme(effective);

  // Parse date for display
  const date = new Date(forecast.dt_txt);
  // Show hour for hourly, weekday for daily
  const label =
    variant === 'hourly'
      ? date.toLocaleString(undefined, { hour: 'numeric' })
      : date.toLocaleString(undefined, { weekday: 'short' });
  // Show month and day for daily
  const subLabel =
    variant === 'daily'
      ? date.toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
        })
      : '';
  // Weather icon from OpenWeatherMap
  const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
  // Card accent color based on weather
  const bgColor = getCardColor(forecast.weather[0].main);
  // Round temperature for display
  const tempDisp = Math.round(
    convertTemp(forecast.main.temp, unit)
  );

  return (
    <View
      style={[
        styles.card,
        variant === 'hourly' && styles.hourlyCard,
        {
          backgroundColor: theme.cardBackground,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <View style={[styles.banner, { backgroundColor: bgColor }]} />
      <Text
        style={[
          styles.label,
          variant === 'daily' && styles.largeDay,
          { color: theme.text },
        ]}
      >
        {label}
      </Text>
      {subLabel ? (
        <Text style={[styles.subLabel, { color: theme.text }]}>
          {subLabel}
        </Text>
      ) : null}
      <Image source={{ uri: iconUrl }} style={[styles.icon, { backgroundColor: theme.iconBackground}]} />
      <Text style={[styles.temp, { color: theme.text }]}>
        {tempDisp}°{unit === 'metric' ? 'C' : 'F'}
      </Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        {forecast.weather[0].description}
      </Text>
    </View>
  );
}

// Styles for card and its elements
const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 8,
    margin: 6,
    alignItems: 'center',
    width: 100,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  banner: {
    height: 6,
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 4,
  },
  hourlyCard: {
    width: 90,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  largeDay: {
    fontSize: 16,
    fontWeight: '700',
  },
  subLabel: {
    fontSize: 12,
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  temp: {
    fontSize: 20,
    fontWeight: '600',
  },
  desc: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
});
