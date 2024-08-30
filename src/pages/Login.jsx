import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [empty, setEmpty] = useState(false);
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [errorServLog, setErrorServLog] = useState("");
  const data = { email: mail, password: password };
  let response = {};
  const navigate = useNavigate();

  return (
    <>
      <section className="wide-login">
        <section className="widthlim-login">
          <div className="title-login">Se connecter</div>
          <section className="form-login">
            <form onSubmit={(event) => event.preventDefault()}>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Adresse email"
                onChange={(event) => setMail(event.target.value)}
              />
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mot de passe"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                className="button-login"
                type="submit"
                onClick={async (event) => {
                  event.preventDefault;
                  setEmpty(false);
                  setErrorServLog(false);
                  {
                    !mail || !password
                      ? setEmpty(true)
                      : (response = await axios.post(
                          " https://lereacteur-vinted-api.herokuapp.com/user/login",
                          data
                        ));
                    console.log(response.data);
                    if (response.data.token) {
                      Cookies.set("token", response.data.token, {
                        expires: 30,
                      });
                      navigate("/");
                    } else {
                      setErrorServLog(true);
                    }
                  }
                }}
              >
                Se connecter
              </button>
              {empty === true && <p>Veuillez compléter tous les champs</p>}{" "}
              {/* -------OK----- */}
              {errorServLog === true && (
                <p>
                  Un problème est survenu. Veuillez réessayer ultérieurement.
                </p>
              )}
              <Link to="/signup">
                <p>Pas encore de compte? Inscris-toi!</p>
              </Link>
              <Link to="/">
                <button onClick={(event) => event.preventDefault}>
                  Retourner à la page d'accueil
                </button>
              </Link>
            </form>
          </section>
        </section>
      </section>
    </>
  );
};

export default Login;
