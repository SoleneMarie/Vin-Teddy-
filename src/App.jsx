import { useState } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";
import Logo from "./pictures/vinted9809.jpg";
import { HiMagnifyingGlass } from "react-icons/hi2";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");

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
    setToken(null);
  };

  return (
    <>
      <Router>
        {token ? (
          <header className="connected">
            <section id="headersec">
              <Link to="/">
                <button id="mainlogo">
                  <img src={Logo} />
                </button>
              </Link>
              <section id="header-search">
                <form>
                  <input
                    type="text"
                    placeholder={"🔍   Recherche des articles"}
                    id="search"
                    name="search"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </form>
              </section>
              <section id="disconnect-sec">
                <button
                  id="deconnect"
                  style={{ backgroundColor: "white" }}
                  onClick={() => {
                    logoutfunc();
                  }}
                >
                  Se déconnecter
                </button>
                <div id="sell">
                  <button>Vends tes articles</button>
                </div>
              </section>
            </section>
          </header>
        ) : (
          <header>
            <section id="headersec">
              <Link to="/">
                <button id="mainlogo">
                  <img src={Logo} />
                </button>
              </Link>
              <section id="header-search">
                <form>
                  <input
                    type="text"
                    placeholder={"Recherche des articles"}
                    id="search"
                    name="search"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </form>
                <div className="absolute">
                  <HiMagnifyingGlass />
                </div>
              </section>
              <section id="buttons">
                <div id="sign">
                  <Link to="/signup">
                    <button style={{ backgroundColor: "white" }}>
                      S'inscrire
                    </button>
                  </Link>
                  <Link to="/login">
                    <button style={{ backgroundColor: "white" }}>
                      Se connecter
                    </button>
                  </Link>
                </div>
                <div id="sell">
                  <button>Vends tes articles</button>
                </div>
              </section>
            </section>
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
