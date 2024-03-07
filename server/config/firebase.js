const firebase = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { FieldValue } = require("@firebase/firestore");
const dotenv = require("dotenv");

dotenv.config();

// Loading environment variables from .env file
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

const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app);
// const FieldValue = firebase.firestore.FieldValue;

module.exports = { db, FieldValue };
