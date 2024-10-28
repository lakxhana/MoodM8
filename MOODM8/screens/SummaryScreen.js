import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import backgroundImage from '../assets/logo_bg_1.png';

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
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>My sober streak is ...</Text>
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
    </ImageBackground>
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
    backgroundColor: 'rgba(240, 240, 240, 0.8)', // Optional overlay color
    paddingTop: 150,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#706752',
    marginBottom: 20,
  },
  resultContainer: {
    alignItems: 'center',
    borderColor: '#d4caa2'
  },
  timeBox: {
    backgroundColor: '#afcfd6',
    width: 300,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#d4caa2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    borderColor: '#d4caa2',
    borderWidth: 2,
  },
  timeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#706752',
  },
});

export default SummaryScreen;
