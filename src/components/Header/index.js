import "./styles.css";

import Logo from "../../assets/Logo.png";
import { Link } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import { SearchBtnProvider } from "../../contexts/SearchBtn";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

import avatar from "../../assets/avatar.png";

export default function Header() {
  const { user, userData } = useContext(UserContext);

  return (
    <SearchBtnProvider>
      <header>
        <div className="header-content">
          <a href="/">
            <img src={Logo} alt="Orange movies" />
          </a>
          <nav className="menubar">
            <ul>
              <li>
                <Link to={"/movies"}>Filmes</Link>
              </li>
              <li>
                <Link to={"/tv"}>Séries</Link>
              </li>
              <li>
                <Link to={"/about"}>Sobre</Link>
              </li>
            </ul>
          </nav>
          <SearchInput />
          <nav className="userpanel">
            <ul>
              <li>
                {user === true ? (
                  <Link to={"/login"}>
                    <div className="profile-container">
                      {userData.avatarUrl === null ? (
                        <img src={avatar} alt="Profile" />
                      ) : (
                        <img src={userData.avatarUrl} alt="profile" />
                      )}
                    </div>
                  </Link>
                ) : (
                  <Link to={"/login"}>Entrar</Link>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </SearchBtnProvider>
  );
}
