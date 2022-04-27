import './styles.css';

import Logo from '../../assets/Logo.png';
import { Link } from 'react-router-dom';


export default function Header() {
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
                    <input placeholder='Pesquisar...'/>
                    <button></button>
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