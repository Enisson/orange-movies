import "./styles.css";

import me from '../../assets/Enisson.png';

export default function About() {
  return (
    <div className="about-container">
        <h1>Sobre</h1>
        <p className="about-orange">
            A ORANGE MOVIES É UM PROJETO PESSOAL FEITO COM MUITO CARINHO NO INTUÍTO
            DE COMPARTILHAR INFORMAÇÕES DO MUNDO CINEMATOGRÁFICO PARA TODOS.
        </p>
        <h2>Quem sou eu?</h2>
        <img src={me} alt="Enisson Lemos Santos" />
        <h3>Enisson Lemos Santos</h3>
        <p className="about-me">
            Olá! Me chamo Enisson Lemos Santos. Tenho 28 anos. Sou de Santo André - São Paulo.
            E estou concluindo a minha graduação de design gráfico pela Anhembi Morumbi.
            Como muitos, sou apaixonado por tecnologia e cinema e decidindo juntar as minhas duas paixões, nasceu a orange movies.
        </p>
        <h2 className="contact">Contato</h2>
        <p className="email">
            Viu algo errado no site ou tem alguma dúvida? envie um email para: <a href="mailto:orangemoviesproject@gmail.com">orangemoviesproject@gmail.com</a>
        </p>
    </div>
  );
}
