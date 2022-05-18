import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import avatar from "../../assets/avatar.png";
import "./styles.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../Firebase/Firebase";
import { doc, updateDoc } from "firebase/firestore";
import FavMovie from "../../components/FavMovie";

export default function Dashboard() {
  const { logoutUser, userData, loading, setUserData } = useContext(UserContext);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [isMovie, setIsMovie] = useState(true);
  const [idMovies, setIdMovies] = useState([]);
  
  useEffect( ()=> {
    const userDataStorage = localStorage.getItem('moviesList');
    const storage = JSON.parse(userDataStorage)
    setIdMovies(storage);       
}, [] )

  const handleFile = () => {
  
      const imageRef = ref(storage, `images/${userData.uid}/${imageAvatar.name}`);
      uploadBytes(imageRef, imageAvatar).then(()=>{
        alert("Imagem salva!")
      }).then(()=>{
        getDownloadURL(ref(storage, `images/${userData.uid}/${imageAvatar.name}`))
       .then( async (url)=> {
         let imageUrl = url;
  
         await updateDoc(doc(db, "users", userData.uid), {
           avatarUrl: imageUrl
         })
         .then( ()=>{
           let data = {
             ...userData,
             avatarUrl: imageUrl
           };
           setUserData(data);
           storageUser(data);
         } )
       } )
       const storageUser = (data) => {
        localStorage.setItem('userData', JSON.stringify(data));
    };

      })

  };



  if (loading) {
    return (
      <div>
        <h1>Carregando...</h1>
      </div>
    );
  } else {
    return (
      <div className="dashboard-container">
        <div className="header-container">
          <div className="profile-header-container">
            <div className="profile-container">
              <div>
              <label>
              {userData.avatarUrl === null ?
              <img src={avatar} alt="Profile" /> 
              :
              <img src={userData.avatarUrl} alt="profile" />
              }
              <input type='file' onChange={(e)=> setImageAvatar(e.target.files[0])}/>
              </label>
              </div>
              {imageAvatar !== null && <button onClick={handleFile}>Alterar foto</button>}
            </div>
            <div className="profile-content">
            <h1>{userData.name}</h1>
            
            <span>{userData.register}</span>
            <button onClick={logoutUser}>Sair</button>
            </div>
          </div>
        </div>
        <div className="title-container">
                <div className="title">
                    <h1>Meus favoritos</h1>
                </div>
                <div className="movie-link">
                    <span className={`gener ${isMovie ? "gener-active" : "gener"}`} onClick={()=> setIsMovie(true)}>Filmes</span>
                    <span className={`gener ${!isMovie ? "gener-active" : "gener"}`} onClick={()=> setIsMovie(false)}>Séries</span>
                </div>
        </div>
                  {idMovies.map( ids => {
                    return (
                      <div key={ids}>
                        <FavMovie id={ids}/>                
                      </div>
                    )
                  })}

      </div>
    );
  }
}
