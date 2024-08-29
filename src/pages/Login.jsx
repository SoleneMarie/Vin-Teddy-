import axios from "axios";
import { useEffect, useState } from "react";

const Login = () => {
  const [data, setData] = [{}];
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [created, setCreated] = useState(false);

  console.log("data à récupérer : " + username + password + mail);
  {
    /* ------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
-------------------------------Fonction pour envoyer le data au back----------------------------
--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------- */
  }

  useEffect(() => {
    const sendData = async () => {
      await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup"
      );
    };
  });

  {
    /* ------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
----------------------------------------------------------Formulaire-------------------------------------
--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------- */
  }
  return (
    <>
      {created === false ? (
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
                    setPassword(event.target.password);
                  }}
                />
              </section>
              <section className="newsletter-signup">
                <input type="checkbox" id="newsletter" name="newsletter" />{" "}
                <label>S'incrire à votre newsletter</label>
                <p>
                  En m'inscrivant, je confirme avoir lu et accepté les Termes &
                  Conditions et Politique de confidentialité de Vin'Teddy. Je
                  confirme avoir au moins 18 ans.{" "}
                </p>
              </section>
            </form>
            {empty === true && (
              <p className="red-login">Veuillez compléter tous les champs</p>
            )}
            {errorPassword === true && (
              <p className="red-login">
                Votre mot de passe doit comporter au moins 8 caractères{" "}
              </p>
            )}
            <section></section>
            <section className="suscribe-signup">
              <button
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  setEmpty(false);
                  setErrorPassword(false);
                  if (!password || !mail || !username) {
                    setEmpty(true);
                  } else if (password.length < 8) {
                    setErrorPassword(true);
                  } else {
                    setCreated(true);
                  }
                }}
              >
                S'inscrire
              </button>
              <p>Tu as déjà un compte? Connecte-toi!</p>
            </section>
          </section>
        </>
      ) : (
        <p>Félicitations, votre compte a été créé!</p>
      )}
    </>
  );
};

export default Login;
