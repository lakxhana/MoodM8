import { initializeApp, getApps } from "firebase/app";
import { 
    getAuth, 
    initializeAuth, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged 
} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDH_LxsqViSTHkYyHgDlsla1TfdT3VNP1g",
    authDomain: "moodm8-9a2de.firebaseapp.com",
    projectId: "moodm8-9a2de",
    storageBucket: "moodm8-9a2de.appspot.com",
    messagingSenderId: "370456892561",
    appId: "1:370456892561:web:402e66a449635a44da9b30",
    measurementId: "G-BVFKPSXVZR"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged };
