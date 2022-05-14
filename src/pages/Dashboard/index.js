import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import avatar from "../../assets/avatar.png";
import "./styles.css";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../Firebase/Firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Dashboard() {
  const { logoutUser, userData, loading, setUserData } = useContext(UserContext);
  const [imageAvatar, setImageAvatar] = useState(null);

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
        <h1>This is a dashboard</h1>

      </div>
    );
  }
}
