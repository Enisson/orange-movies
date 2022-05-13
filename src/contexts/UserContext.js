import { createContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";

import heart from '../assets/icons/heart.svg'
import heartFull from '../assets/icons/heart-full.svg';


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState();
    const [gender, setGender] = useState();
    const [loading, setLoading] = useState(false);
    const [favIcon, setFavIcon] = useState(heart);
    const [movieList, setMovieList] = useState([{}]);

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
            
            const uid = value.user.uid;
            console.log(uid)
            
            await setDoc(doc(db, "users", uid), {
                name: name,
                email: email,
                gender: gender,
                avatarUrl: null,
              }).then( ()=> {

                        let data = {
                            name: name,
                            email: email,
                            gender: gender,
                            avatarUrl: null,
                            uid: uid
                        }
                       
                        setUserData(data);
                        storageUser(data);
                        setLoading(false);
                    } )
            // try {
            //     await addDoc(collection(db, "users"), {
            //         name: name,
            //         email: email,
            //         gender: gender,
            //         avatarUrl: null,
            //         moviesList: {movieList}
                    
            //     })
            // } catch (error) {
            //     console.log(error);
            //     setUser(null);
            //     return alert(error)
            // }
        } );
    };

    const storageUser = (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
    };

    const signinUser = async (email, password) => {
        setLoading(true)
        await signInWithEmailAndPassword(auth, email, password)
        .then( ()=> alert('Bem vindo de volta!') )
        .catch((error) => {
            console.log(error);
            setUser(null);
        })
        .finally(()=> {
            setLoading(false);

        })
        
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

    const storageContent = async (movie) => {
            // const querySnap = await getDocs(collection(db, "users"));
            // querySnap.forEach((doc) => {
            //     console.log(`${doc.id} => ${doc.data()}`);
            // })
            const name = "enisson"
            await setDoc(doc(db, "users", name), {
                name: "Los Angeles",
                state: "CA",
                country: "USA"
              });
        
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
            storageContent,
            favIcon
        }}>
            { children }
        </UserContext.Provider>
    )
}