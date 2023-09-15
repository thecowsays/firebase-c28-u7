// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqrM3B4-uASNArnvaPiTAPzhCyMdEZr8U",
  authDomain: "fir-c28-u7.firebaseapp.com",
  projectId: "fir-c28-u7",
  storageBucket: "fir-c28-u7.appspot.com",
  messagingSenderId: "119196825108",
  appId: "1:119196825108:web:1d59d19081786c12151901",
};

// Initialize Firestore
const app = initializeApp(firebaseConfig);

// setup db and export
export const db = getFirestore(app);

// setup auth and export
export const auth = getAuth(app);