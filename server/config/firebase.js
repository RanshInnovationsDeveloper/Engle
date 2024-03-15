const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, getDocs} = require('firebase/firestore/lite');
const { getAuth } = require('firebase/auth');
// Loading environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
//if app not initialised
if (!app) {
  console.error('Firebase initialization failed');
}

const db = getFirestore(app);
//if db is not initialised
if (!db) {
  console.error('Database initialization failed');
}
const auth = getAuth(app);
//creating notes collection
const notesCollection = collection(db, 'notes');

// Exporting using CommonJS syntax
module.exports = { db, auth, notesCollection, addDoc, getDocs};
