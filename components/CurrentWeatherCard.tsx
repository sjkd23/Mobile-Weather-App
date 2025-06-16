import { View, Text, StyleSheet } from 'react-native';

interface CurrentWeatherProps {
  weather: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
    };
    weather: { description: string }[];
  };
  unit: 'metric' | 'imperial';
}

export default function CurrentWeatherCard({ weather, unit }: CurrentWeatherProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{weather.name}</Text>
      <Text style={styles.temp}>
        {weather.main.temp}° {unit === 'metric' ? 'C' : 'F'}
      </Text>
      <Text style={styles.feels}>
        Feels like: {weather.main.feels_like}°
      </Text>
      <Text style={styles.desc}>
        {weather.weather[0].description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    alignItems: 'center',
    width: '90%',
  },
  city: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 32,
    fontWeight: '600',
  },
  feels: {
    fontSize: 16,
    marginTop: 4,
  },
  desc: {
    fontStyle: 'italic',
    color: '#666',
    marginTop: 8,
  },
});
