// ../controllers/notes.js
const { db, notesCollection } = require('../config/firebase');
const { validationResult } = require('express-validator');
const { collection, query,orderBy,limit, getDocs, where, serverTimestamp,getDoc,doc,addDoc } = require('firebase/firestore');

exports.createNote = async (req, res) => {
  try {
    const jsonData = {
      ...req.body,
      timestamp: serverTimestamp(),
    };
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", success: false, errors: errors.array() });
    }
    const docRef = await addDoc(notesCollection, jsonData);
    res.status(200).json({ success: true, message: 'Note created successfully', noteId: docRef.id });
  } catch (error) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: error.message });
  }
};

exports.getNotesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const notesRef = collection(db, 'notes');
    const q = query(notesRef, where('UserId', '==', userId));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : null,
    }));
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getNoteById = async (req, res) => {
  try {
    const noteId = req.params.id;
    const noteRef = doc(notesCollection, noteId);
    const noteDoc = await getDoc(noteRef);
    if (!noteDoc.exists()) {
      res.status(404).json({ status: "error", success: false, message: 'Note not found' });
      return;
    }
    const noteData = {
      id: noteDoc.id,
      ...noteDoc.data(),
    };
    res.status(200).json({ success: true, data: noteData });
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: err.message });
  }
};

exports.getRecentNotes = async (req, res) => {
  try {
    const querySnapshot = await getDocs(query(notesCollection, orderBy("timestamp", "desc"), limit(5)));
    
    const recentNotes = [];
    querySnapshot.forEach((doc) => {
      recentNotes.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({ success: true, data: recentNotes });
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: err.message });
  }
};
