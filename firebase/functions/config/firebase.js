const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
var admin = require("firebase-admin");
// var serviceAccount = require("../svc/serviceAccountKey.json");    // for production
var serviceAccount = require("../svc/serviceAccountKeyDev.json");    // for development  (Sumit personal Credentials)
const dotenv = require('dotenv');


// Loading environment variables from .env file
dotenv.config();



const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
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
//if auth is not initialised
if (!auth) {
  console.error('Auth initialization failed');
}

// Exporting using CommonJS syntax
module.exports = { db, auth,admin };