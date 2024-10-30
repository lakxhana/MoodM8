import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState(""); 
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async (user) => {
      const storedPhone = await AsyncStorage.getItem('phoneNumber');
      const storedName = await AsyncStorage.getItem('name');
      setPhoneNumber(storedPhone || ""); 
      setName(storedName || ""); 
      setUserData({
        name: user.displayName || storedName,
        email: user.email,
        phone: storedPhone || "",
      });
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user);
      } else {
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    const userId = auth.currentUser.uid;
    const updatedData = {
      name,
      phoneNumber,
    };

    await setDoc(doc(db, 'users', userId), updatedData, { merge: true });
    
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('phoneNumber', phoneNumber);

    alert('Profile updated successfully!');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {userData ? (
        <View style={styles.profileContainer}>
          <Text style={styles.heading}>My Profile</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter name"
            />
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{userData.email}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Entry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  profileContainer: {
    backgroundColor: 'transparent', 
    borderRadius: 15,
    padding: 30, 
    width: '90%',
    elevation: 3, 
    alignItems: 'flex-start',

  },
  title: {
    color: '#706752',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
  },
  infoContainer: {
    width: '100%',
    marginVertical: 20, // Increase vertical margin for spacing
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ab9e7f',
    marginBottom: 30, 
    marginTop: 5,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#ab9e7f',
    marginBottom: 5,
    marginLeft: 5,
  },
  infoBox: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'flex-start',
    elevation: 3,
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'left',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '100%',
    marginBottom: 0,
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#afcfd6', 
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20, 
    width: '100%', 
  },
  saveButtonText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
