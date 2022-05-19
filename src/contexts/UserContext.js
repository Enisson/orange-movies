import { createContext, useState, useEffect } from "react";
import { auth, db, storage } from "../Firebase/Firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { addDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import heart from '../assets/icons/heart.svg'
import heartFull from '../assets/icons/heart-full.svg';


export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState([]);
    const [gender, setGender] = useState();
    const [loading, setLoading] = useState(false);
    const [favIcon, setFavIcon] = useState(heart);
    const [movieList, setMovieList] = useState(userData);

    const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    useEffect( ()=> {
        const userStorage = localStorage.getItem('user');
        userStorage && JSON.parse(userStorage) ? setUser(true) : setUser(false);
    }, [] )

    useEffect( ()=> {
        localStorage.setItem('user', user);
    }, [user] )
    
    useEffect( ()=> {
        const userDataStorage = localStorage.getItem('userData');
        const storage = JSON.parse(userDataStorage)
        setUserData(storage)        
    }, [] )

    
    const  signupWithEmailAndPass = (email, name, password) => {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then( async (value)=> {
            
            
            const uid = value.user.uid;

            const date = new Date();
            const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
            const year = `Mebro desde ${date.getDay()} de ${month[date.getMonth()]} de ${date.getFullYear()}`;
            
            await setDoc(doc(db, "users", uid), {
                name: name,
                email: email,
                gender: gender,
                avatarUrl: null,
                moviesList: [{}],
                register: year
                
              }).then( ()=> { 

                    let data = {
                        name: name,
                        email: email,
                        gender: gender,
                        avatarUrl: null,
                        moviesList: [{}],
                        uid: uid,
                        register: year
                    }
                    
                    setUserData(data);
                    storageUser(data);
                    setLoading(false);
                } )
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
        localStorage.removeItem('user');
        // localStorage.removeItem('moviesList');
        // localStorage.removeItem('userData');
        setUser(null);
    }

    const storageContent = async (movie) => {

        const myList = localStorage.getItem("moviesList");
        let saveMovies = JSON.parse(myList) || [];

        const hasMovie = saveMovies.some( (saveMovies) => saveMovies === movie )

        if(hasMovie){
            return alert("Filme já está salvo");
        }

        saveMovies.push(movie);
        localStorage.setItem("moviesList", JSON.stringify(saveMovies));
        alert("Filme salvo!")
        
            const uid = userData.uid;
            await updateDoc(doc(db, "users", uid), {
                moviesList: saveMovies
              });
        
    }

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            month,
            gender,
            userData,
            setUserData,
            loading,
            setLoading, 
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