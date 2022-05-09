import { useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./styles.css";


export default function SignUp({authentication}) {

  const emailRef = useRef();
  const nameRef = useRef();
  const passRef = useRef();
  const navigate = useNavigate();

  const { signupWithEmailAndPass } = useContext(UserContext);

  const register = () => {
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passRef.current.value;

    if(email && name && password) {
      signupWithEmailAndPass(email, name, password)
      authentication();
      navigate("/dashboard");
    };

  }

  return (
    <div className="signup-container">
        <div className="signup">
          <div>
            <p className="welcome">Olá, Seja bem vindo!</p>
            <p>Cadastre-se para poder salvar os seus filmes favoritos</p>
          </div>
          <form onSubmit={register}>
            <h1>Cadastre-se</h1>
            <input type="text" placeholder="Nome de usuário" ref={nameRef}/>
            <input type="email" placeholder="Email" ref={emailRef}/>
            <input type="password" placeholder="Senha" ref={passRef}/>
            <fieldset>
              <label>Feminino</label>
              <input type="radio" name="genre" value="Feminino" />
              <label>Masculino</label>
              <input type="radio" name="genre" value="Masculino" />
              <label>Outros</label>
              <input type="radio" name="genre" value="Outros" />
            </fieldset>
            <button type="submit">Criar conta</button>
          </form>
          <p>Já possui uma conta?<Link to={"/login"}> Faça login aqui</Link> </p>
        </div>
    </div>
  );
}
