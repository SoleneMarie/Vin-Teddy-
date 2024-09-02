import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../pictures/vinted9809.jpg";
import { HiMagnifyingGlass } from "react-icons/hi2";

const Header = ({ token, setToken, logoutfunc }) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  return (
    <>
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
                <button
                  onClick={() => {
                    {
                      token ? navigate("/publish") : navigate("/");
                    }
                  }}
                >
                  Vends tes articles
                </button>
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
                <button
                  onClick={() => {
                    {
                      token ? navigate("/publish") : navigate("/");
                    }
                  }}
                >
                  Vends tes articles
                </button>
              </div>
            </section>
          </section>
        </header>
      )}
    </>
  );
};

export default Header;
