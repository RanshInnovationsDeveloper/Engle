// ../controllers/notes.js
const { addDoc, notesCollection, getDocs } = require('../config/firebase');
const { body, validationResult } = require('express-validator');
const { getDoc, doc, serverTimestamp } = require('firebase/firestore/lite');

// Function to create a new note
exports.createNote = async (req, res) => {
  try {
    // Prepare data to be added to the database
    const jsonData = {
      ...req.body,
      timestamp: serverTimestamp(),
    };

    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // No validation errors, proceed to add data
    const docRef = await addDoc(notesCollection, jsonData);

    // Respond with a success message or other appropriate response
    res.status(200).json({ success: true, message: 'Note created successfully', noteId: docRef.id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
};

// Function to get all notes
exports.getNotes = async (req, res) => {
  try {
    // Retrieve all documents from the collection
    const querySnapshot = await getDocs(notesCollection);

    // Check if there are no documents
    if (!querySnapshot || querySnapshot.empty) {
      res.status(200).json({ data: [] }); // Respond with an empty array or appropriate response
      return;
    }

    // Sort the data based on the timestamp in descending order (recent first)
    const data = querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));

    // Format the timestamp to be displayed (assuming timestamp is a Firebase Timestamp)
    data.forEach((note) => {
      if (note.timestamp) {
        note.timestamp = note.timestamp.toDate(); // Convert to JavaScript Date object
      }
    });

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};

// Function to get a note by ID
exports.getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id; // Assuming the ID is provided in the request parameters

    // Construct a reference to the document using the provided ID
    const noteRef = doc(notesCollection, noteId);

    // Check if the provided ID is valid
    if (!noteRef) {
      res.status(401).json({ success: false, message: "Id is invalid" });
      return;
    }

    // Retrieve the document
    const noteDoc = await getDoc(noteRef);

    // Check if the document exists
    if (!noteDoc.exists()) {
      res.status(404).json({ success: false, message: 'Note not found' });
      return;
    }

    // Respond with the document data and ID
    const noteData = {
      id: noteDoc.id,
      ...noteDoc.data(),
    };
    res.status(200).json({ success: true, data: noteData });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
};
