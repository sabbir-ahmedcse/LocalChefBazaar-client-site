import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/Firebase";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // -----------------------
  // REGISTER USER
  // -----------------------
  const registerUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // -----------------------
  // LOGIN USER
  // -----------------------
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // -----------------------
  // LOGOUT
  // -----------------------
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // -----------------------
  // UPDATE PROFILE
  // -----------------------
  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  // -----------------------
  // OBSERVE USER AUTH STATE
  // -----------------------
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log("Auth Changed:", currentUser);
    });

    return () => unSubscribe();
  }, []);

  // AUTH CONTEXT DATA
  const authInfo = {
    user,
    loading,
    registerUser,
    signInUser,
    logOut,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
