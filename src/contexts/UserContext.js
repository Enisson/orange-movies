import { createContext, useState, useEffect } from "react";
import { auth } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    useEffect( ()=> {
        const userStorage = localStorage.getItem('user');
        userStorage && JSON.parse(userStorage) ? setUser(true) : setUser(false);
    }, [] )

    useEffect( ()=> {
        localStorage.setItem('user', user);
    }, [user] )
    
    const signupWithEmailAndPass = (email, name, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then( ()=> {
            return updateProfile(auth.currentUser, {
                displayName: name
            })
        } )
        .then( (res) => alert("Logado com sucesso!"))
        .catch(()=> setUser(null))
        .finally( (err)=> console.log(err) );
    };

    const signinUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then( (res) => console.log(res) )
        .catch( (err)=> console.log(err) )
        .finally( ()=> setUser(null) )
    };

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const logoutUser = () => {
        signOut(auth)
        .then( ()=> alert("Deslogado com sucesso!") )
        localStorage.removeItem('user')
        setUser(null);
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            signupWithEmailAndPass,
            signinUser,
            forgotPassword,
            logoutUser,
        }}>
            { children }
        </UserContext.Provider>
    )
}