import React, { createContext, useEffect, useState } from 'react'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile  } from "firebase/auth";
import { app } from '../firebase/firebase.congif';

export const  AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const googgleProvider = new GoogleAuthProvider();
    const createuser = (email, password)=> {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth)
    }
    const googleSignIn = ()=>{
      setLoading(true);
      return signInWithPopup(auth, googgleProvider)
    }
    const updateUserProfile = (name, photo)=>{
      return updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
    }
    useEffect(()=>{
      const unsubscribe = onAuthStateChanged(auth, currentuser =>{
            setUser(currentuser);
            console.log('current user',currentuser)
            setLoading(false)
        });
        return ()=> {
            return unsubscribe();
        }
    }, [])
    const authInfo = {user, loading, createuser, signIn, logOut, updateUserProfile, googleSignIn}
  return (
    <div>
      <AuthContext.Provider value={authInfo}>
        {children}
      </AuthContext.Provider>
    </div>
  )
}

export default AuthProvider
