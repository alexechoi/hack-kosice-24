// src/firebaseConfig.tsx

// Required SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
// firebase config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app);

// Initialize analytics if needed, not exporting since it's not used elsewhere
getAnalytics(app);

// Export the app and auth
export { app, auth, db };