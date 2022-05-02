import './styles.css';

import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Search from '../../pages/Search';
import SearchInput from '../SearchInput/SearchInput';
import { SearchBtnProvider } from '../../contexts/SearchBtn';





export default function Header() {

    const [test, setTest] = useState();

    return (
        <SearchBtnProvider>
        <header>
            <div className="header-content">
                <a href='/'>
                    <img src={Logo} alt="Orange movies"/>
                </a>
                <nav className='menubar'>
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
                <nav className='userpanel'>
                    <ul>
                        <li>
                            <a href='/'>Entrar</a>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </header>
        </SearchBtnProvider>
    );
}