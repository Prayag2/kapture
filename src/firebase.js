import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmMAKiK81cnjRNaEX83ksEZnPVPB8_GOA",
  authDomain: "kapture-d92ee.firebaseapp.com",
  projectId: "kapture-d92ee",
  storageBucket: "kapture-d92ee.appspot.com",
  messagingSenderId: "1022022066979",
  appId: "1:1022022066979:web:194999783bc923cc37e296",
  measurementId: "G-YNL7QZ96CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
