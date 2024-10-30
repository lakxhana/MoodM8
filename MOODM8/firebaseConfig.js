import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDH_LxsqViSTHkYyHgDlsla1TfdT3VNP1g",
    authDomain: "moodm8-9a2de.firebaseapp.com",
    projectId: "moodm8-9a2de",
    storageBucket: "moodm8-9a2de.appspot.com",
    messagingSenderId: "370456892561",
    appId: "1:370456892561:web:402e66a449635a44da9b30",
    measurementId: "G-BVFKPSXVZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage), // Use AsyncStorage for persistence
});

// Export the necessary functions and auth instance
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut };
