import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native';

const HistoryScreen = ({ route }) => {
  const { history } = route.params;

  const formatElapsedTime = (time) => {
    const days = String(Math.floor(time / (24 * 3600 * 1000))).padStart(2, '0');
    const hours = String(Math.floor((time % (24 * 3600 * 1000)) / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  return (
    
      <View style={styles.container}>
        <Text style={styles.title}>Streak History</Text>
        <ScrollView contentContainerStyle={styles.historyList}>
          {history.slice().reverse().map((item, index) => (
            <View key={index} style={styles.historyBox}>
              <Text style={styles.historyText}>Start Time: {new Date(item.startTime).toLocaleString()}</Text>
              <Text style={styles.historyText}>Reset Time: {new Date(item.resetTime).toLocaleString()}</Text>
              <Text style={styles.historyText}>Duration: {formatElapsedTime(item.duration)}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
  
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#E7EAEC', 
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    color: '#706752',
  },
  historyList: {
    alignItems: 'center',
  },
  historyBox: {
    backgroundColor: '#afcfd6',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderColor: '#c6e7e7',
    borderWidth: 1,
    width: '100%',
  },
  historyText: {
    fontSize: 17,
    color: '#fff',
  },
});

export default HistoryScreen;
