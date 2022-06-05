import whiteLogo from '../../assets/icons/white-logo.svg';
import './styles.css';

export default function Footer() {
    return(
        <div className="footer">
            <a href='/'>
                <img src={whiteLogo} alt="Logo" />
            </a>
            <p>© Copyright Orange Movies 2022 - Todos os direitos reservados.</p>
            <p>Desenvolvido por <a href='https://www.linkedin.com/in/enisson-lemos/' target={'_blank'} rel='noreferrer'>Enisson Lemos</a></p>
        </div>
    );
}