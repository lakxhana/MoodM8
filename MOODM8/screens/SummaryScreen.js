import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
const SummaryScreen = ({ route }) => {
  const { elapsedTime } = route.params;
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTime = () => {
      const totalSeconds = Math.floor(elapsedTime / 1000);
      const d = Math.floor(totalSeconds / (3600 * 24));
      const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    };

    calculateTime();
  }, [elapsedTime]);

  return (
    
      <View style={styles.container}>
        <Text style={styles.heading}>My streak is ...</Text>
        <View style={styles.resultContainer}>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{days} Days</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{hours} Hours</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{minutes} Minutes</Text>
          </View>
          <View style={styles.timeBox}>
            <Text style={styles.timeText}>{seconds} Seconds</Text>
          </View>
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.8)', 
    paddingTop: 150,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ab9e7f',
    marginBottom: 20,
  },
  resultContainer: {
    alignItems: 'center',
    borderColor: '#d4caa2'
  },
  timeBox: {
    backgroundColor: '#fff',
    width: 300,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#d4caa2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,

  },
  timeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ab9e7f',
  },
});

export default SummaryScreen;
