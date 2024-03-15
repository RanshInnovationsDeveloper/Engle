const { initializeApp } = require('firebase/app');
<<<<<<< HEAD
const { getFirestore, collection, addDoc, getDocs,query, where } = require('firebase/firestore/lite');
=======
const { getFirestore, collection, addDoc, getDocs } = require('firebase/firestore/lite');
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
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
<<<<<<< HEAD
module.exports = { db, auth, notesCollection, addDoc, getDocs,query,where };
=======
module.exports = { db, auth, notesCollection, addDoc, getDocs };
>>>>>>> 4022697af3eafab744c3e908079a7a6867b83123
