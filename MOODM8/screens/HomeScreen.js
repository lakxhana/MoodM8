import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Modal,
  PanResponder,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const motivationalQuotes = [
  {
    text: "Believe in yourself and all that you are.",
    image: require('../assets/quote1.jpg'),
  },
  {
    text: "Every day is a fresh start.",
    image: require('../assets/quote2.jpg'),
  },
  {
    text: "Stay positive, work hard, make it happen.",
    image: require('../assets/quote3.jpg'),
  }
];

const moodLabels = ["Very Unhappy", "Unhappy", "Neutral", "Happy", "Very Happy"];

const HomeScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [randomQuote, setRandomQuote] = useState(null);
  const navigation = useNavigation();
  const panResponder = useRef();
  const [moodPosition, setMoodPosition] = useState(0);
  const db = getFirestore();
  const auth = getAuth();
  const moodScaleWidth = 380; // Adjusted width for accurate positioning

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);

  useEffect(() => {
    const moodIndex = Math.round(moodPosition / (moodScaleWidth / (moodLabels.length - 1)));
    setSelectedMood(moodIndex);
  }, [moodPosition]);

  const openQuoteModal = () => {
    setIsModalVisible(true);
  };

  const closeQuoteModal = () => {
    setIsModalVisible(false);
  };

  const handleNavigateToBreathing = () => {
    navigation.navigate('Breathing');
  };

  const handleNavigateToMood = () => {
    navigation.navigate('Mood');
  };

  const handleNavigateToGrounding = () => {
    navigation.navigate('Grounding');
  };

  const handleMoodSubmit = async () => {
    if (selectedMood !== null) {
      const user = auth.currentUser; 
      const email = user ? user.email : "anonymous";
      const moodType = selectedMood;

      try {
        await addDoc(collection(db, 'moods'), { 
          email: email,
          mood: moodLabels[selectedMood],
          moodType: moodType.toString(),
          timeStamp: new Date(),
        });

        console.log("Selected Mood: ", moodLabels[selectedMood]);
        console.log("Mood saved successfully!");

        
        Alert.alert("Success!", "Your mood has been recorded successfully.", [{ text: "OK" }]);

        setMoodPosition(0);
        setSelectedMood(null);
      } catch (error) {
        console.error("Error saving mood: ", error);
        Alert.alert("Error", "There was an issue saving your mood. Please try again.");
      }
    }
  };

  panResponder.current = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => {
      return gestureState.dx !== 0;
    },
    onPanResponderMove: (_, gestureState) => {
      let newPosition = moodPosition + gestureState.dx;

      if (newPosition < 0) newPosition = 0;
      if (newPosition > moodScaleWidth) newPosition = moodScaleWidth;

      setMoodPosition(newPosition);
    },
    onPanResponderRelease: () => {
      const moodIndex = Math.round(moodPosition / (moodScaleWidth / (moodLabels.length - 1)));
      setMoodPosition(moodIndex * (moodScaleWidth / (moodLabels.length - 1)));
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>MOODM8</Text>
        <Text style={styles.motivation}>Welcome Back</Text>
      </View>

      <View style={styles.quoteCard}>
        {randomQuote && (
          <TouchableOpacity onPress={openQuoteModal}>
            <ImageBackground source={randomQuote.image} style={styles.quoteBackground}>
              <Text style={styles.quoteText}>{randomQuote.text}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.moodContainer}>
        <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        <View style={styles.scaleContainer}>
          <View style={styles.moodLabelsContainer}>
            {moodLabels.map((label, index) => (
              <Text key={index} style={styles.moodLabel}>
                {index}
              </Text>
            ))}
          </View>
          <View style={styles.moodScale} {...panResponder.current.panHandlers}>
            <View
              style={[
                styles.dragIndicator,
                { left: moodPosition, transform: [{ translateX: -10 }] },
              ]}
            />
          </View>
        </View>
        <Text style={styles.selectedMoodText}>
          Selected Mood: {selectedMood !== null ? moodLabels[selectedMood] : "None"}
        </Text>

        <TouchableOpacity onPress={handleMoodSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Mood</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>For You</Text>
        <View style={styles.card}>
          <TouchableOpacity onPress={handleNavigateToBreathing}>
            <Text style={styles.cardText}>Breathing Exercise</Text>
            <Text style={styles.cardSubText}>Breathing Guide</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <TouchableOpacity onPress={handleNavigateToGrounding}>
            <Text style={styles.cardText}>Grounding Techniques</Text>
            <Text style={styles.cardSubText}>5-4-3-2-1 Techniques</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <TouchableOpacity onPress={handleNavigateToMood}>
            <Text style={styles.cardText}>Mood Tracker</Text>
            <Text style={styles.cardSubText}>Track your mood</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={styles.card}>
          <TouchableOpacity onPress={handleNavigateToBreathing}>
            <Text style={styles.cardText}>Journal</Text>
            <Text style={styles.cardSubText}>Unwind by putting your thoughts into words</Text>
          </TouchableOpacity>
        </View> */}
      </View>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {randomQuote && (
            <ImageBackground source={randomQuote.image} style={styles.modalImage}>
              <TouchableOpacity onPress={closeQuoteModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalQuoteText}>{randomQuote.text}</Text>
            </ImageBackground>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 22,
    color: '#ab9e7f',
  },
  motivation: {
    fontSize: 28,
    color: '#ab9e7f',
    fontWeight: 'bold',
  },
  quoteCard: {
    marginBottom: 20,
  },
  quoteBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  quoteText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    backgroundColor: 'rgba(175, 207, 214, 0.7)',
    padding: 10,
  },
  moodContainer: {
    marginVertical: 10,
  },
  scaleContainer: {
    alignItems: 'center',
    width: '100%',
  },
  moodLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  moodLabel: {
    color: '#ab9e7f',
  },
  moodScale: {
    height: 40,
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    position: 'relative',
    marginVertical: 10,
    paddingHorizontal: 10, // Adjust for inner padding
  },
  dragIndicator: {
    position: 'absolute',
    top: '30%',
    width: 20,
    height: 20,
    backgroundColor: '#ab9e7f',

    borderRadius: 10,
  },
  selectedMoodText: {
    textAlign: 'center',
    color: '#ab9e7f',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: '#ab9e7f',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#ab9e7f',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    fontSize: 20,
    color: '#ab9e7f',
    fontWeight: 'bold',
  },
  cardSubText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalImage: {
    width: '90%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalQuoteText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    backgroundColor: '#ab9e7f',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
  },
});

export default HomeScreen;
