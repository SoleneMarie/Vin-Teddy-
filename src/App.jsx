import { useState, useEffect } from "react";
import Home from "./pages/Home";

import Offer from "./pages/Offer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [log, setLog] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          {log ? (
            <p>Vous êtes connecté</p>
          ) : (
            <Link to="/signup">
              <button> Se connecter</button>
            </Link>
          )}
          <header>
            <p>Insérer header ici 🐣</p>
          </header>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
