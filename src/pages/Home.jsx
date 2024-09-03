import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ search, setSearch }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(search);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers?title=${search}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [search]);

  const offers = data.offers;

  return isLoading ? (
    <p className="loading">
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

              <Link to={"/publish"}>
                <button>Commencer à vendre</button>
              </Link>
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
            return (
              <>
                <Link
                  to={"/offer/" + item._id}
                  key={item._id}
                  style={{ textDecoration: "none", color: "#999" }}
                >
                  <section className="one-article">
                    <div className="user">
                      {item.owner.account.avatar && (
                        <img
                          src={item.owner.account.avatar.url}
                          alt="avatar de l'utilisateur"
                        />
                      )}

                      <p>{item.owner.account.username}</p>
                    </div>
                    <div className="main-pic">
                      <img src={item.product_image.url} />
                    </div>
                    <div className="details">
                      <p style={{ color: "black" }}>
                        {Number(item.product_price).toFixed(2)} €
                      </p>
                      {item.product_details[1].TAILLE && (
                        <p>{item.product_details[1].TAILLE}</p>
                      )}
                      <p>{item.product_details[0].MARQUE}</p>
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
