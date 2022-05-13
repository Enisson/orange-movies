import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import avatar from "../../assets/avatar.png";
import "./styles.css";

export default function Dashboard() {
  const { logoutUser, userData, loading } = useContext(UserContext);

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
              <img
                src={avatar}
                //   src={userData.avatarUrl === null ? avatar : userData.avatarUrl}
                alt="profile"
              />
            </div>
            <div className="profile-content">
            <h1>Nome de usuário</h1>
            <span>Membro desde março de 2022</span>
            <button onClick={logoutUser}>Sair</button>
            </div>
          </div>
        </div>
        <h1>This is a dashboard</h1>

      </div>
    );
  }
}
