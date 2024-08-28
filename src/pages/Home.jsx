import { Link } from "react-router-dom";
import { useState } from "react";
const Home = () => {
  const [adverts, setAdverts] = [];
  return (
    <>
      <main>
        <section className="wide">
          <section className="widthLim">
            <block id="titleblock">
              <h1>Prêts à faire du tri dans vos placards?</h1>
              <button>Commencer à vendre</button>
            </block>
          </section>
        </section>
        {/* ------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
--------------------------------section   #all-articles :   tous les articles----------------------------
--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------- */}
        <section id="all-articles">
          <block className="one-article"></block>
        </section>
      </main>
      <Link to="/offer/id:"> Ceci est mon lien, enfin j'espère ! 🥹 </Link>
    </>
  );
};

export default Home;
