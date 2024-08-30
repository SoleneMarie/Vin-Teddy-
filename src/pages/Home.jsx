import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  const offers = data.offers;
  return isLoading ? (
    <p>
      🐣En cours de chargement. Je vois que la patience n'est pas ton point
      fort, prends sur toi.🐣
    </p>
  ) : (
    <>
      <main>
        <section className="wide">
          <section className="widthLim">
            <section id="titleblock">
              <h1>Prêts à faire du tri dans vos placards?</h1>
              <button>Commencer à vendre</button>
            </section>
          </section>
        </section>
        {/* ------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
--------------------------------section   #all-articles :   tous les articles----------------------------
--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------- */}
        <section id="all-articles">
          {offers.map((item) => {
            console.log(item._id);
            return (
              <>
                <Link to={"/offer/" + item._id} key={item._id}>
                  <section className="one-article">
                    <div className="user">
                      <img
                        src={item.owner.account.avatar.url}
                        alt="avatar de l'utilisateur"
                      />
                      <p>{item.owner.account.username}</p>
                    </div>
                    <div className="main-pic">
                      <img src={item.product_image.url} />
                    </div>
                    <div className="details">
                      <span>{item.product_price} €</span>
                      {item.product_details[1].TAILLE && (
                        <span>{item.product_details[1].TAILLE}</span>
                      )}
                      <span>{item.product_details[0].MARQUE}</span>
                    </div>
                  </section>
                </Link>
              </>
            );
          })}

          {/* ------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
--------------------------------block   .one-article : pour récupérer chaque article----------------------------
--------------------------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------- */}
        </section>
      </main>
    </>
  );
};

export default Home;
