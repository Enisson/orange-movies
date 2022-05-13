
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDnQQKQwUSUbJ6cQ8NaVGaeKzSvYH3P2Wk",
  authDomain: "orange-movies.firebaseapp.com",
  projectId: "orange-movies",
  storageBucket: "orange-movies.appspot.com",
  messagingSenderId: "684214067735",
  appId: "1:684214067735:web:6ffade3330a84beb39f252"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const storage = getStorage(app);
