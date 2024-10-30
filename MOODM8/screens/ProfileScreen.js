import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig'; // Adjust the import based on your directory structure
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [storedPhoneNumber, setStoredPhoneNumber] = useState("Add phone number"); // Default value

  useEffect(() => {
    const fetchPhoneNumber = async () => {
      const storedPhone = await AsyncStorage.getItem('phoneNumber');
      setStoredPhoneNumber(storedPhone || "Add phone number");
    };
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          name: user.displayName,
          email: user.email,
          phone: storedPhoneNumber,
        });
      } else {
        setUserData(null);
      }
    });
  
    fetchPhoneNumber(); // Call the function to fetch phone number
  
    return () => unsubscribe();
  }, []);

  const handlePhoneUpdate = async () => {
    if (phoneNumber.trim()) {
      await AsyncStorage.setItem('phoneNumber', phoneNumber); // Store the phone number
      setStoredPhoneNumber(phoneNumber);
      setPhoneNumber("");
      setIsEditing(false);
    }
  };

  return (
    <View style={styles.container}>
      

      {userData ? (
        <View style={styles.cuteBox}>
          <Text style={styles.title}>My Profile</Text>
          <View style={styles.infoContainer}>
            <Text style={styles.label}>Name:</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{userData.name}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Email:</Text>
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>{userData.email}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <View style={styles.infoBox}>
              <View style={styles.phoneNumberContainer}>
                {isEditing ? (
                  <>
                    <TextInput
                      style={styles.input}
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      placeholder="Enter phone number"
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handlePhoneUpdate}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </>
                ) : storedPhoneNumber === "Add phone number" ? (
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => setIsEditing(true)}
                  >
                    <Text style={styles.actionButtonText}>Add Phone Number</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <Text style={styles.infoText}>{storedPhoneNumber}</Text>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => setIsEditing(true)}
                    >
                      <Text style={[styles.actionButtonText, { fontSize: 13 }]}>Change Phone Number</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  title: {
    color: '#706752',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent: 'center',
  },
  cuteBox: {
    //backgroundColor: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: '#c6e7e7',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 5,
    width: '90%', // Make the cute box wider
    alignItems: 'flex-start',
    marginBottom:60,
  },
  infoContainer: {
    width: '100%',
    marginVertical: 10,
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
  phoneNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: '70%', // Adjusted width to fit in the row
    marginBottom: 10,
  },
  actionButton: {
    width: '50%',
    alignItems: 'flex-end',
  },
  actionButtonText: {
    color: '#b7b7b5',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  saveButton: {
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#b7b7b5',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loadingText: {
    fontSize: 16,
    color: '#888',
  },
});

export default ProfileScreen;
