import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => auth.createUserWithEmailAndPassword(email, password);
    const signin = (email, password) => auth.signInWithEmailAndPassword(email, password);
    const resetPassword = email => auth.sendPasswordResetEmail(email);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });
    });

    const value = {
        currentUser,
        signup,
        signin,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}