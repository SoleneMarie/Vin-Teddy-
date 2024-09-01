import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

{
  /*-----------------------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------
  --------------------------------------mon component pour login ----------------------------------------
  -------------------------------------------------------------------------------------------------------
  ------------------------------------------------------------------------------------------------------- */
}

const Login = ({ tokenfunc }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [empty, setEmpty] = useState(false);
  const [errorServLog, setErrorServLog] = useState(false);
  const [errorMdp, setErrorMdp] = useState(false);

  const data = { email: mail, password: password };
  const navigate = useNavigate();
  {
    /*-----------------------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------
  ---------------------------------------ma fonction pour login, -------------------------------------
  ----------------------------------------se déclenche on submit-----------------------------------------
  ------------------------------------------------------------------------------------------------------- */
  }

  const loginFunc = async () => {
    setEmpty(false);
    setErrorServLog(false);
    setErrorMdp(false);
    {
      /*-----------------------------------------------------------------------------------------------------
    ---------------------------------------Si mail ou password falsy,---------------------------------------
    ---------------------------------------------state empty true-------------------------------------------
    ------------------------------------------------------------------------------------------------------- */
    }
    console.log(!mail, !password);
    if (!mail || !password) {
      console.log(empty);
      setEmpty(true);
    } else {
      /*-----------------------------------------------------------------------------------------------------
      ------------------------------------Sinon, requête au back par Axios, ---------------------------------------
      ----------------------------------------pour récupérer le token-----------------------------------------
      ------------------------------------------------------------------------------------------------------- */
      try {
        const response = await axios.post(
          " https://lereacteur-vinted-api.herokuapp.com/user/login",
          data
        );
        /*-----------------------------------------------------------------------------------------------------
    -------------------------------------Je set le cookie----------------------------------------------------
    ------------------------------------------------------------------------------------------------------- */
        tokenfunc(response.data.token);
        navigate("/");
        /*-----------------------------------------------------------------------------------------------------
    -------------------------Si catch error, je set un message d'erreur ---------------------------------------
    ------------------------------------------------------------------------------------------------------- */
      } catch (error) {
        if ((error.message = "Request failed with status code 401")) {
          setErrorMdp(true);
        } else {
          setErrorServLog(true);
        }
        console.log(error.code);
      }
    }
  };

  return (
    <>
      {/*-----------------------------------------------------------------------------------------------------
    --------------------------------------Mon formulaire de connexion--------------------------------------
    ------------------------------------on submit : enclenche loginFunc------------------------------------
    ------------------------------------------------------------------------------------------------------- */}
      <section className="wide-login">
        <section className="widthlim-login">
          <section className="form-login">
            <h3 className="title-signup">Se connecter</h3>
            <section className="emptyfields-signup">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  loginFunc();
                }}
              >
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

                <section className="suscribe-signup">
                  <p id="ForgottenPassword">
                    Mot de passe oublié? Eh bien il fallait le noter.
                  </p>
                  <button className="button-login">Se connecter</button>
                  {/*-----------------------------------------------------------------------------------------------------------
    --------------------------------------Lien vers la page signup, ------------------------------------------
    ----------------------------------------si pas encore de compte------------------------------------------
    ---------------------------------------------------------------------------------------------------------- */}
                  <Link to="/signup">
                    <p id="pasdecompte">Pas encore de compte? Inscris-toi!</p>
                  </Link>{" "}
                  <Link to="/">
                    <button>Retourner à la page d'accueil</button>
                  </Link>
                  {/*-----------------------------------------------------------------------------------------------------
    ---------------------------------------------Mes messages d'erreur--------------------------------------------
    -----------------------------------------------------------------------------------------------------------
    ---------------------------------------------------------------------------------------------------------- */}
                  <section className="errorMessages">
                    {empty === true && (
                      <p>Veuillez compléter tous les champs</p>
                    )}
                    {errorServLog === true && (
                      <p>
                        Un problème est survenu. Veuillez réessayer
                        ultérieurement.
                      </p>
                    )}
                    {errorMdp === true && (
                      <p>Email ou mot de passe incorrect</p>
                    )}
                  </section>
                </section>
              </form>
            </section>
          </section>
        </section>
      </section>
    </>
  );
};

export default Login;
