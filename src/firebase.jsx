import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmMAKiK81cnjRNaEX83ksEZnPVPB8_GOA",
  authDomain: "kapture-d92ee.firebaseapp.com",
  projectId: "kapture-d92ee",
  storageBucket: "kapture-d92ee.appspot.com",
  messagingSenderId: "1022022066979",
  appId: "1:1022022066979:web:194999783bc923cc37e296",
  measurementId: "G-YNL7QZ96CP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();

// Emulator Settings
//connectFirestoreEmulator(db, "127.0.0.1", 8080);
//connectAuthEmulator(auth, "http://127.0.0.1:9099");
