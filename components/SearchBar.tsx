import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

interface Props { value: string; onChange: (t: string) => void; onSearch: () => void; }

// Search input with a themed style and a search button.
// Uses ThemeContext to style input and button based on current mode.
export default function SearchBar({ value, onChange, onSearch }: Props) {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <View style={styles.row}>
      <TextInput
        // Input background, text, and border colors adapt to theme.
        style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text, borderColor: theme.border }]}
        placeholder="Search city..."
        placeholderTextColor={theme.muted}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      {/* Search button triggers onSearch, styled with theme's primary color */}
      <Pressable onPress={onSearch} style={[styles.btn, { backgroundColor: theme.primary }]}>
        <Ionicons name="search" size={20} color="#fff" />
      </Pressable>
    </View>
  );
}

// Layout and style for the search bar and button.
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 12,
    marginBottom: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btn: {
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
