//This controller handles features related to notes
const { db } = require('../config/firebase');
const { validationResult } = require('express-validator');
const { collection, query, orderBy, limit, getDocs,serverTimestamp, getDoc, doc, setDoc,addDoc,deleteDoc,updateDoc } = require('firebase/firestore');
const { get } = require('http');

//This one is used to create a note
exports.createNote = async (req, res) => {
  try {

    const { userId } = req.body;
    
    //Creating a jsonObject
    const jsonData = {
      ...req.body,
      timestamp: serverTimestamp(),
    };

    //Checking for errors validation work
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "error", success: false, errors: errors.array() });
    }

    const docRef = doc(db, "notes", userId);

    //Fetching the doc and subdoc from the db
    const docSnap = await getDoc(docRef);
    let noteDocRef;

    //If docSnap does not exist this block will be executed and will create doc
    if (!docSnap.exists()) {
      await setDoc(docRef, { userId });
      //Taking the reference to the subcollection in the document
      const subCollectionRef = collection(docRef, 'words');
      noteDocRef=addDoc(subCollectionRef, jsonData);
    }
    else {
      //Taking the reference to the subcollection in the document
      const subCollectionRef = collection(docRef, 'words');
      noteDocRef=addDoc(subCollectionRef, jsonData);
      
    }

    //Sending the response
    res.status(200).json({ success: true, message: 'Note created successfully',noteId:noteDocRef.id });
    return;
  } catch (error) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: error?.message });
    return ;
  }
};



//This is used to get ALL Notes By User Id
exports.getAllNotes = async (req, res) => {
  try {

    const { userId } = req.body;
    let querySnapshot = [];
   
    const docRef = doc(db, "notes", userId);
    const docSnap = await getDoc(docRef);

    //If docSnap doesexist this block will be executed
    if (docSnap.exists()) {

      //Taking the reference to the subcollection in the document
      const subCollectionRef = collection(docRef, 'words');
      querySnapshot = await getDocs(query(subCollectionRef, orderBy("timestamp", "desc")));
    }
    //Empty recent notes array initialized
    const recentNotes = [];
    //Iterating over the querySnapShot and adding the data to recentNotes array
    querySnapshot.forEach((doc) => {
      recentNotes.push({
        ...doc.data(),
        id: doc.id
      });
    });

    res.status(200).json({ success: true, data: recentNotes });
    return ;
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error to fetch Last Notes', error: err.message });
  }
};




//This is to get the recent 5 notes
exports.getSomeRecentNotes = async (req, res) => {
  try {

    const { userId } = req.body;
    let querySnapshot = [];
   
    const docRef = doc(db, "notes", userId);
    const docSnap = await getDoc(docRef);

    //If docSnap doesexist this block will be executed
    if (docSnap.exists()) {

      //Taking the reference to the subcollection in the document
      const subCollectionRef = collection(docRef, 'words');
      querySnapshot = await getDocs(query(subCollectionRef, orderBy("timestamp", "desc"), limit(5)));
    }
    //Empty recent notes array initialized
    const recentNotes = [];
    //Iterating over the querySnapShot and adding the data to recentNotes array
    querySnapshot.forEach((doc) => {
      recentNotes.push({
        ...doc.data(),
        id: doc.id,
      });
    });

    res.status(200).json({ success: true, data: recentNotes });
    return ;
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error to fetch Last Notes', error: err.message });
  }
};




// this is used to get a single note from note ID
exports.getNoteById = async (req, res) => {
  try {
    //Taking noteId from params
    const noteId = req.params.id;
    const noteRef = doc(db, "notes", noteId); //Taking reference of note doc 
    const noteDoc = await getDoc(noteRef); //Getting the note doc

    //If note doc doesn't exist, send error 
    if (!noteDoc.exists()) {
      res.status(404).json({ status: "error", success: false, message: 'Note not found',data:[] });
      return;
    }

    //If note doc exists, get the 'Words' subcollection
    const wordsCollectionRef = collection(noteRef, 'words');
    const wordsSnapshot = await getDocs(wordsCollectionRef);
    const wordsData = wordsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    //Prepare the note data
    const noteData = {
      id: noteDoc.id,
      ...noteDoc.data(),
      words: wordsData, //Include the 'Words' data in the response
    };

    res.status(200).json({ success: true, data: noteData });
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error', error: err?.message });
  }
};



// this is used to delete a note
exports.deleteNote = async (req, res) => {
  try {
    const { userId, noteId } = req.body;

    const docRef = doc(db, "notes", userId, "words", noteId);
    await deleteDoc(docRef);

    res.status(200).json({ success: true, message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error to delete note', error: err.message });
  }
};



// this is used to update a note
exports.updateNote = async (req, res) => {
  try {
    const { userId, noteId } = req.body;

    const docRef = doc(db, "notes", userId, "words", noteId);

    await updateDoc(docRef, {
      ...req.body,
      timestamp: serverTimestamp(),
    });

    res.status(200).json({ success: true, message: 'Note updated successfully' });
  } catch (err) {
    res.status(500).json({ status: "error", success: false, message: 'Internal server error to update note', error: err.message });
  }
};
