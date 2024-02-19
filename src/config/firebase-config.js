// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBd3qu-NGBxA0qnQhVC2bs0rjmdP7sYi1w",
  authDomain: "udemy-practice-e0102.firebaseapp.com",
  projectId: "udemy-practice-e0102",
  storageBucket: "udemy-practice-e0102.appspot.com",
  messagingSenderId: "145692816151",
  appId: "1:145692816151:web:304487b55ca2468c21fd52",
  measurementId: "G-3GSX093M4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);