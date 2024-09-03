import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let arrKeys = [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/v2/offers/" + id
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p className="loading">
      🐣En cours de chargement. Je vois que la patience n'est toujours pas ton
      point fort!🐣
    </p>
  ) : (
    <>
      <main className="wide-offer">
        <section className="widthlim-offer">
          {/*--------------------------------------------------------------------------------
        ----------------------------------------------------------------------------------
        ---------------------section  .pic-offer  : affiche photo--------------------------
        -----------------------------------------------------------------------------------
        --------------------------------------------------------------------------------- */}

          <section className="pic-offer">
            <img src={data.product_image.url} alt={data.product_name} />
          </section>

          <section className="description">
            <section className="firsthalf">
              {/*------------------MA METHODE .MAP ----------------------*/}

              {data.product_details.map((item) => {
                {
                  arrKeys.push(...Object.keys(item));
                }
                return;
              })}

              {/*------------------MA METHODE .MAP ----------------------*/}

              {/*------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        --------------------------------------  .infos-offer : en abrégé   ---------------------------------
      `------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
              <section className="infos-offer">
                <p className="price">
                  {Number(data.product_price).toFixed(2)} €
                </p>
                <section className="summary">
                  {arrKeys.includes("MARQUE") && (
                    <div className="info">
                      <p>MARQUE</p>
                      <p>
                        {data.product_details[arrKeys.indexOf("MARQUE")].MARQUE}
                      </p>
                    </div>
                  )}

                  {arrKeys.includes("TAILLE") && (
                    <div className="info">
                      <p>TAILLE</p>
                      <p>
                        {data.product_details[arrKeys.indexOf("TAILLE")].TAILLE}
                      </p>
                    </div>
                  )}

                  {arrKeys.includes("ÉTAT") && (
                    <div className="info">
                      <p>ÉTAT</p>
                      <p>
                        {data.product_details[arrKeys.indexOf("ÉTAT")].ÉTAT}
                      </p>
                    </div>
                  )}

                  {arrKeys.includes("COULEUR") && (
                    <div className="info">
                      <p>COULEUR</p>
                      <p>
                        {
                          data.product_details[arrKeys.indexOf("COULEUR")]
                            .COULEUR
                        }
                      </p>
                    </div>
                  )}

                  {arrKeys.includes("EMPLACEMENT") && (
                    <div className="info">
                      <p>EMPLACEMENT</p>
                      <p>
                        {
                          data.product_details[arrKeys.indexOf("EMPLACEMENT")]
                            .EMPLACEMENT
                        }
                      </p>
                    </div>
                  )}

                  {arrKeys.includes("MODES_DE_PAIEMENT") && (
                    <div className="info">
                      <p>MODES DE PAIEMENT</p>
                      <p>
                        {
                          data.product_details[
                            arrKeys.indexOf("MODES_DE_PAIEMENT")
                          ].MODES_DE_PAIEMENT
                        }
                      </p>
                    </div>
                  )}
                </section>
              </section>
              <section className="border"></section>

              {/*--------------------------------------------------------------------------------
        ----------------------------------------------------------------------------------
        ----------------section  .infos-details  : affiche les infos qui vont avec--------------
        -----------------------------------------------------------------------------------
        --------------------------------------------------------------------------------- */}

              {console.log(data)}
              <section className="offer-infos-details">
                <h2 className="offer-description-title">{data.product_name}</h2>
                <p className="offer-description-summary">
                  {data.product_description}
                </p>
              </section>
              <div className="offer-seller">
                {data.owner.account.avatar && (
                  <img src={data.owner.account.avatar.url} />
                )}
                <p>{data.owner.account.username}</p>
              </div>
            </section>
            <section className="secondhalf">
              <Link to="/payment">
                <button>Acheter</button>
              </Link>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};
export default Offer;
