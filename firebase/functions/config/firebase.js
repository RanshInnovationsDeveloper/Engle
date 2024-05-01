const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');
var admin = require("firebase-admin");
var serviceAccount = require("../svc/serviceAccountKey.json");


// Loading environment variables from .env file
const dotenv = require('dotenv');
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

// Exporting using CommonJS syntax
module.exports = { db, auth};