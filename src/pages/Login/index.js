import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./styles.css";



export default function Login({authentication}) {

  const { signinUser } = useContext(UserContext);

  const emailRef = useRef();
  const passRef = useRef();

  const signInFunction = () => {
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if(email && password){
      signinUser(email, password)
      authentication();
    }

  };


  return (
    <div className="login-container">
        <div className="login">
          <div>
            <p className="welcome">Olá, Seja bem vindo!</p>
            <p>Entre com a sua conta google para poder salvar os seus filmes favoritos</p>
          </div>
          <form onSubmit={signInFunction}>
            <h1>Login</h1>
            <input type="email" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Senha" ref={passRef}/>
            <button type="submit">Entrar</button>
          </form>
          <p>Não tem uma conta?<Link to={"/signup"}> Cadastre-se</Link> </p>
        </div>
    </div>
  );
}
