import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut, auth } from '../firebaseConfig'; // Import signOut and auth from your firebase config
import backgroundImage from '../assets/bg1.jpg'; // Use the same background image

const SignOutScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to sign out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Log out cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            signOut(auth)
              .then(() => {
                Alert.alert("Signed Out", "You have been signed out successfully.");
                navigation.navigate('Login'); // Navigate back to login page
              })
              .catch((error) => {
                console.error("Sign out error:", error);
                Alert.alert("Sign Out Failed", error.message);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Out of MOODM8</Text>
        <Text style={styles.message}>Are you sure you want to sign out?</Text>
        <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Yes, Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.cancelLink}>Cancel</Text>
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
  message: {
    fontSize: 16,
    color: '#ab9e7f',
    textAlign: 'center',
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#afcfd6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  signOutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelLink: {
    color: '#ab9e7f',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignOutScreen;
