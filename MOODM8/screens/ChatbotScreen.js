import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const ChatbotScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
        const res = await axios.post('http://192.168.1.109/chat', {
            data: { input: userInput },
        });
        setResponse(res.data.reply);
        setUserInput('');
        setError('');
    } catch (error) {
        console.error(error);
        setError('Something went wrong. Please try again.');
    }
};


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Type your message..."
      />
      <Button title="Send" onPress={handleSubmit} />
      {response && <Text style={styles.response}>{response}</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});

export default ChatbotScreen;
