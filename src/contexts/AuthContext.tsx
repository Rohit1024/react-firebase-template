import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  UserCredential,
  updateProfile
} from "firebase/auth";
import React, { useContext, useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase";

type AuthProviderProps = {
  user: User | null;
  register(email: string, password: string): Promise<UserCredential>;
  login(email: string, password: string): Promise<UserCredential>;
  logOut(): Promise<void>;
  resetPassword(email: string): Promise<void>;
  verifyEmail(user: User): Promise<void>;
  googleSignIn(): Promise<UserCredential>;
  gitHubSignIn(): Promise<UserCredential>;
  anonymousSignIn(): Promise<UserCredential>;
  updateUserProfile(data: {
    displayName: string;
}): Promise<void>
}

const AuthContext = createContext({} as AuthProviderProps);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthContextProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function verifyEmail(user: User) {
    return sendEmailVerification(user);
  }

  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  }

  function gitHubSignIn() {
    const provider = new GithubAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, provider);
  }

  function anonymousSignIn() {
    return signInAnonymously(auth);
  }

  function updateUserProfile(data: {
    displayName: string
  }) {
    return updateProfile(user!, { 
      displayName: data.displayName,
    })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    user,
    register,
    login,
    logOut,
    verifyEmail,
    resetPassword,
    googleSignIn,
    gitHubSignIn,
    anonymousSignIn,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
