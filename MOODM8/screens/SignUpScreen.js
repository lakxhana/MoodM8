import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, auth } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth'; // Import updateProfile

const SignUp = () => {
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = () => {
    if (name && email && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          // Update the user's profile with the name
          updateProfile(userCredential.user, { displayName: name })
            .then(() => {
              Alert.alert("Sign-Up Successful", `Welcome, ${name}! You can now log in.`);
              navigation.navigate('Login');
            })
            .catch(error => {
              Alert.alert("Profile Update Failed", error.message);
            });
        })
        .catch(error => {
          Alert.alert("Sign-Up Failed", error.message);
        });
    } else {
      Alert.alert("Sign-Up Failed", "Please fill out all fields.");
    }
  };

  return (
    <ImageBackground source={require('../assets/bg1.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up for MOODM8</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Name" 
          value={name}
          onChangeText={setName}
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#aaa"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#aaa"
          secureTextEntry
        />

        <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login', { animation: false })} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ab9e7f',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  signUpButton: {
    backgroundColor: '#afcfd6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    alignItems: 'center',
    padding: 10,
  },
  backButtonText: {
    color: '#ab9e7f',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});

export default SignUp;