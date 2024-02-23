// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCONAHFG5i0JCxDOpGGQEoBTm6bP0CkL8k",
  authDomain: "engle-cfbf5.firebaseapp.com",
  projectId: "engle-cfbf5",
  storageBucket: "engle-cfbf5.appspot.com",
  messagingSenderId: "480780228852",
  appId: "1:480780228852:web:00cb053e925ac643f126a1",
  measurementId: "G-0274C9P4SH"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export const FieldValue = firebase.firestore.FieldValue;