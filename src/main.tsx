// src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import Firebase modules
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCustomToken,
  signInAnonymously,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Global variables provided by the Canvas environment (kept for reference, but we'll bypass __firebase_config)
declare const __app_id: string | undefined;
declare const __firebase_config: string | undefined; // This will be ignored for now
declare const __initial_auth_token: string | undefined;

// --- IMPORTANT: DIRECT FIREBASE CONFIGURATION ---
// PASTE YOUR ENTIRE 'firebaseConfig' OBJECT HERE, copied directly from Firebase Console.
// This will ensure all necessary properties (apiKey, authDomain, projectId, etc.) are present.
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKNiOZI3UE2w6X-i6_lOnqs7v5lR4XCeA",
  authDomain: "tayari-spares.firebaseapp.com",
  databaseURL: "https://tayari-spares-default-rtdb.firebaseio.com",
  projectId: "tayari-spares",
  storageBucket: "tayari-spares.firebasestorage.app",
  messagingSenderId: "637836260682",
  appId: "1:637836260682:web:2cb0b0086ea84f86587db3",
  measurementId: "G-P461M7MHGK"
};
// --- END DIRECT FIREBASE CONFIGURATION ---

// Add a console.log to inspect the final config being used
console.log("Final Firebase Config being used:", firebaseConfig);

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // This is where the error occurs if config is bad
const db = getFirestore(app);

// Sign in with custom token or anonymously
const signInUser = async () => {
  try {
    if (typeof __initial_auth_token !== "undefined") {
      await signInWithCustomToken(auth, __initial_auth_token);
      console.log("Signed in with custom token");
    } else {
      await signInAnonymously(auth);
      console.log("Signed in anonymously");
    }
  } catch (error) {
    console.error("Firebase authentication error:", error);
  }
};

signInUser(); // Call sign-in on app start

createRoot(document.getElementById("root")!).render(<App />);
