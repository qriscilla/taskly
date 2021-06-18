import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signUp = (email, password) => auth.createUserWithEmailAndPassword(email, password);
    const signIn = (email, password) => auth.signInWithEmailAndPassword(email, password);
    const signOut = () => auth.signOut();
    const resetPassword = email => auth.sendPasswordResetEmail(email);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
    });

    const value = { currentUser, signUp, signIn, signOut, resetPassword };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { useAuth, AuthProvider };