import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
{
  /*-----------------------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------
  ---------------------------------------mon component Signup -------------------------------------
  ----------------------------------------------------------------------------------------------------
  ------------------------------------------------------------------------------------------------------- */
}
const Signup = ({ tokenfunc }) => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [errorserv, setErrorserv] = useState(false);
  const [errorconflict, setErrorconflict] = useState(false);
  const navigate = useNavigate();

  const user = {
    email: mail,
    username: username,
    password: password,
    newsletter: newsletter,
  };

  {
    /*-----------------------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------
  ---------------------------------------ma fonction pour signupFunc, -------------------------------------
  ----------------------------------------se déclenche on submit-----------------------------------------
  ------------------------------------------------------------------------------------------------------- */
  }

  const signupFunc = async () => {
    setEmpty(false);
    setErrorPassword(false);
    setErrorserv(false);
    setErrorconflict(false);
    {
      /*-----------------------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------
  -----------------------------Si tous les champs remplissent les condition, ------------------------------
  ----------------------------------requête au back grâce à axios----------------------------------------
  ------------------------------------------------------------------------------------------------------- */
    }

    if (!password || !mail || !username) {
      setEmpty(true);
    } else if (password.length < 8) {
      setErrorPassword(true);
    } else {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          user
        );
        const token = response.data.token;
        tokenfunc(token);
        navigate("/");
        /*-----------------------------------------------------------------------------------------------------
    -------------------------------------Je set le cookie----------------------------------------------------
    ------------------------------------------------------------------------------------------------------- */
      } catch (error) {
        if (error.message === "Request failed with status code 409") {
          setErrorconflict(true);
          console.log(error);
        } else {
          setErrorserv(true);
          console.log(error);
        }
      }
    }
  };

  {
    /* ------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
----------------------------------------      Le formulaire     -------------------------------------------
------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------- */
  }
  return (
    <>
      <section className="wide-signup">
        <section className="widthlim-signup">
          {/*------------------------------------------------------------------------------------------------
  --------------------------------------Si je catch une erreur, OU -------------------------------------
  ----------------------------------------si mon compte n'est pas encore créé------------------------------
  ------------------------------------------------------------------------------------------------------- */}
          <>
            <div className="title-signup">
              <h3>S'inscrire</h3>
            </div>
            <section className="form-signup">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  signupFunc(); /* on submit, j'appelle la fonction pour tenter de faire partir la requête */
                }}
              >
                <section className="emptyfields-signup">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                  />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={(event) => {
                      setMail(event.target.value);
                    }}
                  />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </section>
                <section className="newsletter-signup">
                  <div className="input">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      onClick={() => {
                        newsletter === false
                          ? setNewsletter(true)
                          : setNewsletter(false);
                      }}
                    />
                    <p>S'incrire à votre newsletter</p>
                  </div>
                  <p>
                    En m'inscrivant, je confirme avoir lu et accepté les Termes
                    & Conditions et Politique de confidentialité de Vin'Teddy.
                    Je confirme avoir au moins 18 ans.{" "}
                  </p>
                </section>

                <section className="suscribe-signup">
                  <button>S'inscrire</button>
                  <p>Tu as déjà un compte? Connecte-toi!</p>
                  <Link to="/">
                    <button>Retourner à la page d'accueil</button>
                  </Link>
                </section>

                {/*-------------------------------------------------------------------------------------------
  --------------------------------------------------------------------------------------------------------
  --------------------------------------------Mes messages d'erreur---------------------------------------
  --------------------------------------------------------------------------------------------------------
  ------------------------------------------------------------------------------------------------------- */}

                {empty === true && (
                  <p className="red-signup">
                    Veuillez compléter tous les champs
                  </p>
                )}
                {/* -------OK----- */}
                {errorPassword === true && (
                  <p className="red-signup">
                    Votre mot de passe doit comporter au moins 8 caractères
                  </p>
                )}
                {/* -------OK----- */}
                {errorserv === true && (
                  <p className="red-signup">
                    Un problème est survenu. Veuillez réessayer ultérieurement.
                  </p>
                )}
                {errorconflict && (
                  <p className="red-signup">
                    Il semble que vous ayez déjà un compte : cliquez sur le
                    bouton "Se connecter".
                  </p>
                )}
              </form>
            </section>
          </>
        </section>
      </section>
    </>
  );
};

export default Signup;
