import './styles.css';

import Logo from '../../assets/Logo.png';

export default function Header() {
    return (
        <header>
            <div className="header-content">
                <a href='/'><img src={Logo} alt="Orange movies"/></a>
                <nav className='menubar'>
                    <ul>
                        <li>
                            <a href="/">Filmes</a>
                        </li>
                        <li>
                            <a href="/">Séries</a>
                        </li>
                        <li>
                            <a href="/">Sobre</a>
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