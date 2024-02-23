import React, { useEffect, useState, createContext } from "react";
import { auth, db } from "../services/firebase";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [fetchingUser, setFetchingUser] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const snapshot = await db.collection("users").doc(user.uid).get();
        setCurrentUser({ ...snapshot.data(), userId: user.uid });
      } else {
        setCurrentUser(null);
      }
      setFetchingUser(false);
    });
  }, []);

  const signup = async (email, password, userInfo) => {
    setIsLoading(true);
    let error = "";
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(userInfo);
        await db.collection("users").doc(response.user.uid).set({
          userId: response.user.uid,
          userName: userInfo,
        });
    } catch (err) {
      error = err.message;
    }
    setIsLoading(false);
    return {
      error,
    };
  };

  const login = async (email, password) => {
    setIsLoading(true);
    let error = "";
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      error = err.message;
    }
    setIsLoading(false);
    return {
      error,
    };
  };

  const updateCurrentUser = async () => {
    setIsLoading(true);
    let error = "";
    try {
      const res = await db.collection("users").doc(currentUser.userId).get();
      if (res.exists) {
        setCurrentUser(res.data());
      } else {
        error = "No such document!";
      }
    } catch (err) {
      error = err.message;
    }
    setIsLoading(false);
    return {
      error,
    };
  };

  const logout = () => {
    auth.signOut();
  };

  const updateUserProfile = async (data) => {
    setIsLoading(true);
    let error = "";
    try {
      await db.collection("users").doc(currentUser.userId).update(data);
    } catch (err) {
      error = err.message;
    }
    setIsLoading(false);
    return {
      error,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateUserProfile,
        signup,
        login,
        isLoading,
        setIsLoading,
        updateCurrentUser,
        logout,
      }}
    >
      {!fetchingUser && children}
    </AuthContext.Provider>
  );
};
