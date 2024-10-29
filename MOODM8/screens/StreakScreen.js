import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';

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
      "Are you sure you want to RESET the timer?",
      "",
      [
        { text: "No", onPress: () => {}, style: "cancel" },
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
      startTime: new Date(currentDateTime.getTime() - elapsedTime).toISOString(),
      resetTime: currentDateTime.toISOString(),
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
    navigation.navigate('Summary', { elapsedTime });
  };

  const handleNavigateToHistory = () => {
    navigation.navigate('History', { history }); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.dateTimeBox}>
        <Text style={styles.dateText}>{formattedDate}</Text>
        <Text style={styles.timeText}>{formattedTime}</Text>
      </View>

      <View style={styles.startContainer}>
        <Text style={styles.startText}>Press 'Start' button to start Streak</Text>
        <TouchableOpacity
          style={[
            styles.startButton,
            { backgroundColor: isRunning ? '#ab9e7f' : '#afcfd6' } // Change color based on isRunning
          ]}
          onPress={handleStartPress}
        >
          <Text style={styles.startButtonText}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stopwatchBox}>
        <Text style={styles.stopwatchText}>{formatElapsedTime(elapsedTime)}</Text>
      </View>

      <View style={styles.streakContainer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetPress}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navigateButton} onPress={handleNavigateToSummary}>
          <Text style={styles.navigateButtonText}>Summary</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navigateButton, styles.historyButton]} onPress={handleNavigateToHistory}>
          <Text style={styles.navigateButtonText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles remain the same with added startButton and startButtonText
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(240, 240, 240, 0.8)',
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
    color: '#ab9e7f',
    marginRight: 10,
  },
  startButton: {
    borderRadius: 5,
    padding: 10,
    minWidth: '27%',
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stopwatchBox: {
    marginTop: 20,
    marginBottom: 100,
    backgroundColor:'#afcfd6',
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
    fontSize: 49,
    fontWeight: 'bold',
    color: 'white',
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 50,
  },
  resetButton: {
    backgroundColor: '#afcfd6',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    minWidth: '30%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navigateButton: {
    backgroundColor: '#afcfd6',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    minWidth: '30%',
    alignItems: 'center',
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
