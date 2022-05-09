import { createContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, collection } from "firebase/firestore";


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [gender, setGender] = useState();

    useEffect( ()=> {
        const userStorage = localStorage.getItem('user');
        userStorage && JSON.parse(userStorage) ? setUser(true) : setUser(false);
    }, [] )

    useEffect( ()=> {
        localStorage.setItem('user', user);
    }, [user] )
    
    const signupWithEmailAndPass = (email, name, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then( async ()=> {
            try {
                await addDoc(collection(db, "users"), {
                    name: name,
                    email: email,
                    gender: gender
                })
            } catch (error) {
                console.log(error);
                setUser(null);
                return alert(error)
            }
        } )
        .then(()=> alert("Cadastrado com sucesso!"))
        
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
            gender, 
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