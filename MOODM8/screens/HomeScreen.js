import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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

const HomeScreen = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [comment, setComment] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [randomQuote, setRandomQuote] = useState(null);
  const [journalEntry, setJournalEntry] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setRandomQuote(motivationalQuotes[randomIndex]);
  }, []);

  const openQuoteModal = () => {
    setSelectedQuote(randomQuote);
    setIsModalVisible(true);
  };

  const closeQuoteModal = () => {
    setIsModalVisible(false);
  };

  const saveMood = () => {
    console.log('Mood:', selectedMood, 'Comment:', comment);
    setSelectedMood(null);
    setComment('');
  };

  const handleNavigateToBreathing = () => {
    navigation.navigate('Breathing'); 
  };

  const handleNavigateToGrounding = () => {
    navigation.navigate('Grounding'); 
  };

  const handleSaveJournalEntry = () => {
    console.log('Journal Entry:', journalEntry);
    setJournalEntry(''); // Clear the input after saving
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>MOODM8</Text>
        <Text style={styles.motivation}>Welcome Back</Text>
      </View>

      {/* Motivational Quote Section */}
      <View style={styles.quoteCard}>
        {randomQuote && (
          <TouchableOpacity onPress={openQuoteModal}>
            <ImageBackground source={randomQuote.image} style={styles.quoteBackground}>
              <Text style={styles.quoteText}>{randomQuote.text}</Text>
            </ImageBackground>
          </TouchableOpacity>
        )}
      </View>

          {/* Mood Tracker Section */}
    <View style={styles.moodContainer}>
      <Text style={styles.sectionTitle}>How are you feeling today?</Text>
      <View style={styles.moodButtonsContainer}>
        <TouchableOpacity onPress={() => setSelectedMood('Happy')} style={styles.moodButton}>
          <Text style={styles.mood}>😊</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedMood('Sad')} style={styles.moodButton}>
          <Text style={styles.mood}>😢</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedMood('Angry')} style={styles.moodButton}>
          <Text style={styles.mood}>😠</Text>
        </TouchableOpacity>
      </View>
    </View>

      <View style={styles.journalSection}>
        <Text style={styles.sectionTitle}>Journal Entry</Text>
        <TextInput
          style={styles.commentInput}
          placeholder="Write your thoughts here..."
          multiline
          value={journalEntry}
          onChangeText={setJournalEntry}
        />
        <TouchableOpacity onPress={handleSaveJournalEntry} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Entry</Text>
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
      </View>

      {/* Motivational Quote Modal */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedQuote && (
            <ImageBackground source={selectedQuote.image} style={styles.modalImage}>
              <TouchableOpacity onPress={closeQuoteModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <Text style={styles.modalQuoteText}>{selectedQuote.text}</Text>
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
  moodButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Center buttons horizontally
    marginVertical: 10, // Space between title and buttons
  },
  
  moodButton: {
    padding: 10,
  },
  mood: {
    fontSize: 50,
  },
  commentInput: {
    width: '100%',
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  saveButton: {
    backgroundColor: '#afcfd6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  journalSection: {
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#afcfd6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardSubText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalQuoteText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: 'rgba(175, 207, 214, 0.7)',
    padding: 15,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#afcfd6',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#ab9e7f',
    fontSize: 18,
    marginBottom: 6,
  },
});

export default HomeScreen;
