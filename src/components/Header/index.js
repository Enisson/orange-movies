import './styles.css';

import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apikey } from '../../config/Key';


export default function Header() {

    const [inputValorList, setInputValorList] = useState('');
    const [inputValor, setInputValor] = useState('');    


    const inputHandle = () => {
        // e.preventDefault();
        setInputValor(inputValorList);
    }

    return (
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
                <form>
                    <input onChange={(e) => {setInputValorList(e.target.value)}}  placeholder='Pesquisar...'/>
                    <Link to={'/search'} onClick={inputHandle}></Link>
                </form>
                <nav className='userpanel'>
                    <ul>
                        <li>
                            <a href='/'>Entrar</a>
                        </li>
                    </ul>
                </nav>
            </div>
            
        </header>
    );
}