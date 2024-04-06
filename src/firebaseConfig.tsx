// src/firebaseConfig.tsx

// Required SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBhM6IgtJrFBUQA4HMNeODPBgSoD3c71iU",
  authDomain: "tatra-bank-hk.firebaseapp.com",
  projectId: "tatra-bank-hk",
  storageBucket: "tatra-bank-hk.appspot.com",
  messagingSenderId: "865522407849",
  appId: "1:865522407849:web:a8fdecb8ee824c05908cb8",
  measurementId: "G-RYYQ1RJGYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app);

// Initialize analytics if needed, not exporting since it's not used elsewhere
getAnalytics(app);

// Export the app and auth
export { app, auth, db };