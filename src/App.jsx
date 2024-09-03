import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { useState } from "react";

/*-------------------------Mes pages importées------------------------ */
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Publish from "./pages/Publish";
import Header from "./components/Header";
import Payment from "./pages/Payment";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [search, setSearch] = useState("");
  const [priceTopay, setPriceTopay] = useState(0);
  const [offerID, setOfferID] = useState("");

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
        <Header
          token={token}
          setToken={setToken}
          logoutfunc={logoutfunc}
          setSearch={setSearch}
        />
        <Routes>
          <Route
            path="/"
            element={<Home search={search} setSearch={setSearch} />}
          />
          <Route
            path="/offer/:id"
            element={
              <Offer setOfferID={setOfferID} setPriceTopay={setPriceTopay} />
            }
          />
          {console.log("prix page app" + priceTopay)}
          <Route path="/signup" element={<Signup tokenfunc={tokenfunc} />} />
          <Route path="/login" element={<Login tokenfunc={tokenfunc} />} />
          <Route path="/publish" element={<Publish token={token} />} />
          <Route
            path="/payment"
            element={<Payment priceTopay={priceTopay} offerID={offerID} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
