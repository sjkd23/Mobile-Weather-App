// components/today/LaterTodayForecast.tsx
import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import ForecastCard from '../forecast/ForecastCard';
import GradientDivider from '../GradientLine';
import SectionWrapper from '../SectionWrapper';

// Expects forecast data for today and a temperature unit
interface ForecastProps {
  data: {
    dt_txt: string;
    main: { temp: number };
    weather: { main: string; description: string; icon: string }[];
  }[];
  unit: 'metric' | 'imperial';
}

export default function LaterTodayForecast({ data, unit }: ForecastProps) {
  // Only show the next three forecast entries after the current time
  const now = new Date();
  const nextCutoff = data.filter((d) => new Date(d.dt_txt) > now).slice(0, 3);

  // Use theme from context, falling back to system preference if set
  const { mode } = useThemeMode();
  const system = useColorScheme() ?? 'light';
  const effective = mode === 'system' ? system : mode;
  const theme = getTheme(effective);

  return (
    <SectionWrapper>
      {/* Section header styled with theme color */}
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Later Today
      </Text>
      <GradientDivider />
      <View style={styles.row}>
        {/* Render up to three upcoming forecast cards */}
        {nextCutoff.map((item, idx) => (
          <ForecastCard
            key={idx}
            forecast={item}
            unit={unit}
            variant="hourly"
          />
        ))}
      </View>
    </SectionWrapper>
  );
}

// Layout and typography for the section
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
});
