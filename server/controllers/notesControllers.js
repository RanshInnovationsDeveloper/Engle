// ../controllers/notes.js
//This controller handles features related to notes
const { db, notesCollection } = require('../config/firebase');
const { validationResult } = require('express-validator');
const { collection, query,orderBy,limit, getDocs, where, serverTimestamp,getDoc,doc,addDoc } = require('firebase/firestore');

//This one is used to create a note
exports.createNote = async (req, res) => {
  try {
    //Creating a jsonObject
    const jsonData = {
      ...req.body,
      timestamp: serverTimestamp(),
    };
    //Checking for errors validation work
    const errors = validationResult(req);
    //If some validation fails then it will return the error
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", success: false, errors: errors.array() });
    }
    //The doc reference is created and the note is added to the database 
    //It is adding jsonData in notesCollection 
    const docRef = await addDoc(notesCollection, jsonData);
    //Sending the response
    res.status(200).json({ success: true, message: 'Note created successfully', noteId: docRef.id });
  } catch (error) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: error?.message });
  }
};

//This one is used to get Notes By User Id
exports.getNotesByUserId = async (req, res) => {
  try {
    //Taking userId from paramas
    const { userId } = req.params;
    const notesRef = collection(db, 'notes'); //Taking ref of notes collection
    const q = query(notesRef, where('UserId', '==', userId)); //Running a query to fetch  notes with a particular userId
    const querySnapshot = await getDocs(q); //Query SnapShot
    //Fetching out Data from querySanpshot 
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : null,
    }));
    //Sending the response
    res.status(200).json({ data });
  } catch (err) {
    //If some error occurs then this block will be executed
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: err?.message });
  }
};


//This is to get a single note from note ID 
exports.getNoteById = async (req, res) => {
  try {
    //Taking noteId from params
    const noteId = req.params.id;
    const noteRef = doc(notesCollection, noteId); //Taking refernce of note doc 
    const noteDoc = await getDoc(noteRef); //Getting the doc
    //If doc doesn;t exists sending error 
    if (!noteDoc.exists()) {
      res.status(404).json({ status: "error", success: false, message: 'Note not found' });
      return;
    }
    //If doc exists then sending the data
    const noteData = {
      id: noteDoc.id,
      ...noteDoc.data(),
    };
    res.status(200).json({ success: true, data: noteData });
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: err?.message });
  }
};

//This is to getRecentNotes
exports.getRecentNotes = async (req, res) => {
  try {
    //Getting a query SnapShot  from notesCollection where item is ordered by timestamp
    const querySnapshot = await getDocs(query(notesCollection, orderBy("timestamp", "desc"), limit(5)));
    //Empty recent notes array initialized
    const recentNotes = [];
    //Iterating over the querySnapShot and adding the data to recentNotes array
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
