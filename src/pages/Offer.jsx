import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Offer = () => {
  const { id } = useParams();
  console.log("mon id " + id);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
    <p>
      🐣En cours de chargement. Je vois que la patience n'est toujours pas ton
      point fort!🐣
    </p>
  ) : (
    <>
      {console.log(data)}
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
        </section>

        {/*--------------------------------------------------------------------------------
        ----------------------------------------------------------------------------------
        ---------------------section  .pic-offer  : affiche photo--------------------------
        -----------------------------------------------------------------------------------
        --------------------------------------------------------------------------------- */}
        <section className="infos-offer">
          <section></section>
        </section>
      </main>
    </>
  );
};
export default Offer;
