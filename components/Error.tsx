import { StyleSheet, Text, View } from 'react-native';

interface ErrorProps {
  message: string;
}

// Error displays a warning message in a styled container.
// The message is passed as a prop and shown with a warning icon.
export default function Error({ message }: ErrorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>⚠️ {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  text: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
