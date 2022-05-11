import { createContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection, getDoc } from "firebase/firestore";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState();
    const [gender, setGender] = useState();
    const [loading, setLoading] = useState(false);

    useEffect( ()=> {
        const userStorage = localStorage.getItem('user');
        userStorage && JSON.parse(userStorage) ? setUser(true) : setUser(false);
    }, [] )

    useEffect( ()=> {
        localStorage.setItem('user', user);
    }, [user] )
    
    const  signupWithEmailAndPass = (email, name, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then( async (value)=> {
            
            try {
                await addDoc(collection(db, "users"), {
                    name: name,
                    email: email,
                    gender: gender,
                    avatarUrl: null
                }).then( ()=> {

                    let data = {
                        name: name,
                        email: email,
                        gender: gender,
                        avatarUrl: null
                    }
                    setUserData(data);
                    storageUser(data);
                    setLoading(false);
                } )
            } catch (error) {
                console.log(error);
                setUser(null);
                return alert(error)
            }
        } );
    };

    const storageUser = (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const signinUser = (email, password) => {
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            try {
                await getDoc(collection(db, "users"))
            } catch (error) {
                console.log(error);
                setUser(null);
                return alert(error);
            }
        } )
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
            gender,
            userData,
            loading, 
            setGender,
            signupWithEmailAndPass,
            signinUser,
            forgotPassword,
            logoutUser,
        }}>
            { children }
        </UserContext.Provider>
    )
}