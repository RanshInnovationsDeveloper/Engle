const { db } = require("../config/firebase");
const {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
} = require("firebase/firestore");

jest.mock("firebase/firestore", () => ({
  ...jest.requireActual("firebase/firestore"), // Preserve other functions
  doc: jest.fn(),
  getDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  setDoc: jest.fn(),
}));
// Now you can proceed with your tests, ensuring that the mocked functions are configured properly.
module.exports = {
  db,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  setDoc,
};
