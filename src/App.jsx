import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Link } from "react-router-dom";

function App() {
  const [log, setLog] = useState(false);

  return (
    <>
      <Router>
        {log ? (
          <p>Vous êtes connecté</p>
        ) : (
          <>
            <Link to="/signup">
              <button> S'inscrire</button>
            </Link>
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </>
        )}
        <header>
          <p>Insérer header ici 🐣</p>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:id" element={<Offer />} />
          <Route
            path="/signup"
            element={<Signup log={log} setLog={setLog} />}
          />
          <Route path="/login" element={<Login log={log} setLog={setLog} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
