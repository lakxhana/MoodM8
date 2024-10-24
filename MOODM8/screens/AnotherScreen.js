import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnotherScreen = () => {
  return (
    <View style={styles.container}>
      <Text>This is another screen!</Text>
      {}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default AnotherScreen;
