import { ActivityIndicator, StyleSheet, View } from 'react-native';

// Simple loading spinner for async operations.
// Centered with vertical margin for spacing.
export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#888" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
