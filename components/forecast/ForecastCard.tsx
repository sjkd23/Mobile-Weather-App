import { View, Text, StyleSheet } from 'react-native';

interface ForecastCardProps {
  data: {
    dt_txt: string;
    main: { temp: number };
    weather: { description: string }[];
  };
  unit: 'metric' | 'imperial';
}

export default function ForecastCard({ data, unit }: ForecastCardProps) {
  const date = new Date(data.dt_txt);
  const label = date.toLocaleString(undefined, {
    weekday: 'short',
    hour: 'numeric',
  });

  return (
    <View style={styles.card}>
      <Text style={styles.time}>{label}</Text>
      <Text style={styles.temp}>
        {data.main.temp}° {unit === 'metric' ? 'C' : 'F'}
      </Text>
      <Text style={styles.desc}>{data.weather[0].description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    elevation: 3,
  },
  time: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
  },
  desc: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 4,
  },
});
