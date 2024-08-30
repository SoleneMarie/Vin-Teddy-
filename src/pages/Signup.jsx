import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [created, setCreated] = useState(false);
  const [errorserv, setErrorserv] = useState(false);
  const user = {
    email: mail,
    username: username,
    password: password,
    newsletter: newsletter,
  };

  {
    /* ------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
--------------------------------------------Formulaire----------------------------------------------
---------------------------------------et création de user---------------------------------------
--------------------------------------------------------------------------------------------------------- */
  }
  return (
    <>
      <section className="wide-signup">
        <section className="widthlim-signup">
          {created === false || errorserv === true ? (
            <>
              <div className="title-signup">
                <h1>S'inscrire</h1>
              </div>
              <section className="form-signup">
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
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
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      onClick={() => setNewsletter(true)}
                    />
                    <label>S'incrire à votre newsletter</label>
                    <p>
                      En m'inscrivant, je confirme avoir lu et accepté les
                      Termes & Conditions et Politique de confidentialité de
                      Vin'Teddy. Je confirme avoir au moins 18 ans.{" "}
                    </p>
                  </section>
                </form>
                {empty === true && (
                  <p className="red-signup">
                    Veuillez compléter tous les champs
                  </p>
                )}{" "}
                {/* -------OK----- */}
                {errorPassword === true && (
                  <p className="red-signup">
                    Votre mot de passe doit comporter au moins 8 caractères
                  </p>
                )}
                {/* -------OK----- */}
                {errorserv === true && (
                  <p classeName="red-signup">
                    Un problème est survenu. Veuillez réessayer ultérieurement.
                  </p>
                )}
                <section></section>
                <section className="suscribe-signup">
                  <button
                    type="submit"
                    onClick={async (event) => {
                      event.preventDefault();
                      setEmpty(false);
                      setErrorPassword(false);
                      setErrorserv(false);
                      if (!password || !mail || !username) {
                        setEmpty(true);
                      } else if (password.length < 8) {
                        setErrorPassword(true);
                      } else {
                        setCreated(true);
                        setIsLoading(true);
                        const response = await axios.post(
                          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                          user
                        );

                        console.log(response.data);
                        if (response.data.token) {
                          const token = response.data.token;
                          Cookies.set("token", token, { expires: 30 });
                        } else {
                          setErrorserv(true);
                        }
                      }
                    }}
                  >
                    S'inscrire
                  </button>
                  <p>Tu as déjà un compte? Connecte-toi!</p>
                  <Link to="/">
                    <button onClick={(event) => event.preventDefault}>
                      Retourner à la page d'accueil
                    </button>
                  </Link>
                </section>
              </section>
            </>
          ) : (
            <section className="created-signup">
              <p>Félicitations, votre compte a été créé!</p>

              <Link to="/">
                <button onClick={(event) => event.preventDefault}>
                  Retourner à la page d'accueil
                </button>
              </Link>
            </section>
          )}
        </section>
      </section>
    </>
  );
};

export default Signup;
