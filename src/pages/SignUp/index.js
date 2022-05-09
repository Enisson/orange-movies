import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import "./styles.css";


export default function SignUp({authentication}) {

  const emailRef = useRef();
  const nameRef = useRef();
  const passRef = useRef();
  
  

  const { signupWithEmailAndPass, gender, setGender } = useContext(UserContext);

  const register = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passRef.current.value;

    if(email && name && password && gender) {
      signupWithEmailAndPass(email, name, password, gender)
      authentication();
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
              <input type="radio" name="gender" onChange={e=>setGender(e.target.value)} value="Feminino" />
              <label>Masculino</label>
              <input type="radio" name="gender" onChange={e=>setGender(e.target.value)} value="Masculino" />
              <label>Outros</label>
              <input type="radio" name="gender" onChange={e=>setGender(e.target.value)} value="Outros" />
            </fieldset>
            <button>Criar conta</button>
          </form>
          <p>Já possui uma conta?<Link to={"/login"}> Faça login aqui</Link> </p>
        </div>
    </div>
  );
}
