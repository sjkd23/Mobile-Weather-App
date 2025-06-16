import { View, Text, StyleSheet } from 'react-native';

interface ErrorProps {
  message: string;
}

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
