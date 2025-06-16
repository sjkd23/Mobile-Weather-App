import { View, Text, FlatList, StyleSheet } from 'react-native';
import ForecastCard from './ForecastCard';

interface ForecastProps {
  data: {
    dt_txt: string;
    main: { temp: number };
    weather: { description: string }[];
  }[];
  unit: 'metric' | 'imperial';
}

export default function Forecast({ data, unit }: ForecastProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forecast</Text>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ForecastCard data={item} unit={unit} />}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingLeft: 16,
  },
});
