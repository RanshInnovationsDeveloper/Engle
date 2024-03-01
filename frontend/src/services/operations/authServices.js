import React, { useEffect, useState } from "react";
import { auth,db } from "../firebase";



export const signup = async (email, password, username) => {
  let error = "";

  try {
    // Create user with email and password
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);

    // Set user display name
    await userCredential.user.updateProfile({
      displayName: username
    });

    // Add user data to Firestore
    await db.collection("users").doc(userCredential.user.uid).collection("user_info").doc().set({
      userId: userCredential.user.uid,
      userName: username,
    });

  } catch (err) {
    // Handle sign-up errors
    let errorCode = err.code;
    if (errorCode === 'auth/email-already-in-use') {
      error = "This email is already in use!";
    } else {
      error = err.message;
    }
  }

  return { error };
};




export const signin=async(email,password)=>{

  let  error="";
  let userData="";
  let userName="";
  try{

    await auth.signInWithEmailAndPassword(email,password)
    .then(async(userCrendential)=>{

      // user signin successfully 
      userData=userCrendential.user;

      // get uername from database
     await db.collection("users").doc(userCrendential.user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          
          const docData = doc?.data();
          userName=docData.userName;
  
        } else {
          error="No such user exist!";
        }
      })
      .catch((error) => {
        error=error.message;
      });
    
    }) 
    .catch((err) => {

      // Handle sign-up errors
       let errorCode = err.code;
      if (errorCode === "auth/internal-error") {
        // The email address is already in use by another account
        error="Email or Password do not match!";
        
      } else {
        // Handle other sign-up errors
        error=err.message;
        // console.error(error);
      }
    });

  }catch(err){
    error=err.message;
  }

  return {userData,error,userName};
}



export const logout = () => {
    auth.signOut();
  };




