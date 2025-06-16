import { View, TextInput, StyleSheet, Button } from 'react-native';

interface SearchBarProps {
  value: string;
  onChange: (text: string) => void;
  onSearch: () => void;
  onSelect?: (option: any) => void; // for future autocomplete/suggestions
}

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city..."
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSearch}
        returnKeyType="search"
      />
      <Button title="Search" onPress={onSearch} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    padding: 8,
    width: '100%',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
