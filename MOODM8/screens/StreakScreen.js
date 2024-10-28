import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import backgroundImage from '../assets/logo_bg_1.png';

const StreakScreen = ({ navigation }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [history, setHistory] = useState([]); // Array to store history

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else if (!isRunning && elapsedTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartPress = () => {
    setIsRunning(!isRunning);
  };

  const handleResetPress = () => {
    Alert.alert(
      "Record Streak",
      "Do you want to record your streak into history?",
      [
        {
          text: "No",
          onPress: () => resetStreak(),
          style: "cancel",
        },
        { text: "Yes", onPress: () => recordStreak() },
      ]
    );
  };

  const resetStreak = () => {
    setIsRunning(false);
    setElapsedTime(0);
  };

  const recordStreak = () => {
    const newRecord = {
      startTime: new Date(currentDateTime.getTime() - elapsedTime),
      resetTime: currentDateTime,
      duration: elapsedTime,
    };

    // Add new record to history and maintain size limit
    setHistory((prevHistory) => {
      if (prevHistory.length >= 50) {
        return [...prevHistory.slice(1), newRecord]; // Remove oldest record
      }
      return [...prevHistory, newRecord]; // Add new record
    });

    // Reset streak
    resetStreak();
  };

  const formatElapsedTime = (time) => {
    const days = String(Math.floor(time / (24 * 3600 * 1000))).padStart(2, '0');
    const hours = String(Math.floor((time % (24 * 3600 * 1000)) / 3600000)).padStart(2, '0');
    const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
    return `${days}:${hours}:${minutes}:${seconds}`;
  };

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  const handleNavigateToSummary = () => {
    navigation.getParent().navigate('Summary', { elapsedTime });
  };
  
  const handleNavigateToHistory = () => {
    navigation.getParent().navigate('History', { history });
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.dateTimeBox}>
          <Text style={styles.dateText}>{formattedDate}</Text>
          <Text style={styles.timeText}>{formattedTime}</Text>
        </View>

        <View style={styles.startContainer}>
          <Text style={styles.startText}>Press 'Start' button to start Streak</Text>
          <Button title={isRunning ? "Stop" : "Start"} onPress={handleStartPress} color="#ab9e7f" />
        </View>

        <View style={styles.stopwatchBox}>
          <Text style={styles.stopwatchText}>{formatElapsedTime(elapsedTime)}</Text>
        </View>

        <View style={styles.streakContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPress}>
            <Text style={styles.resetButtonText}>RESET</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToSummary}>
            <Text style={styles.navigateButtonText}>Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.navigateButton, styles.historyButton]} onPress={handleNavigateToHistory}>
            <Text style={styles.navigateButtonText}>History</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.8)', // Optional overlay color
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  dateTimeBox: {
    position: 'absolute',
    top: 25,
    left: 10,
    backgroundColor: '#c6e7e7',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderColor: '#d4caa2',
    borderWidth: 1,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 20,
    color: '#333',
  },
  startContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  startText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  stopwatchBox: {
    marginTop: 20,
    marginBottom: 100,
    backgroundColor: '#f1e5b6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#d4caa2',
    borderWidth: 1,
    width: 350,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopwatchText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#333',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 50,
  },
  resetButton: {
    backgroundColor: '#ab9e7f',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginRight: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigateButton: {
    backgroundColor: '#ab9e7f',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  historyButton: {
    marginLeft: 11,
  },
  navigateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StreakScreen;
