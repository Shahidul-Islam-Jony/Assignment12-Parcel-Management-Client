import { createContext, useEffect, useState } from "react";
import Proptypes from 'prop-types';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth"
import auth from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";



export const AuthContext = createContext();
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login =(email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const loginByGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }

    const updateUser = (name,photoURL)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,{
            displayName:name, photoURL:photoURL
        })
    }



    const logout =()=>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser);
            setLoading(false);
        })

        return ()=>{
            return unSubscribe();
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        login,
        loginByGoogle,
        updateUser,
        logout,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: Proptypes.node,
}

export default AuthProvider;

