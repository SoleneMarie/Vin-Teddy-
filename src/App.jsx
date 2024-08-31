import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);

  /*--------------------------ma fonction pour voir s'il y a un 🍪--------------------------- */
  /*--Je lui donne en argument le state de token: soit rien, soit cookie enregistré sous ce nom-- */
  const tokenfunc = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 30 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };
  /*--------------------------ma fonction pour se déconnecter-------------------------- */
  /*--------------Quand je clique dessus, elle supprime le cookie---------------- */
  const logoutfunc = () => {
    Cookies.remove("token");
    setToken("null");
  };

  return (
    <>
      <Router>
        {token ? (
          <header className="connected">
            <p>Insérer header ici 🐣</p>
            <button>Se déconnecter</button>
          </header>
        ) : (
          <header>
            <Link to="/signup">
              <button> S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </header>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route path="/signup" element={<Signup tokenfunc={tokenfunc} />} />
          <Route path="/login" element={<Login tokenfunc={tokenfunc} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
