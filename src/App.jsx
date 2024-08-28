import { useState, useEffect } from "react";
import { BrowseRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
  });
  return (
    <>
      <Router>
        <header>
          <p>Insérer header ici 🐣</p>
        </header>
        <Routes>
          <Route path="./pages/Home.jsx" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
