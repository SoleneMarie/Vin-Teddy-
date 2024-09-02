import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Publish = ({ token }) => {
  const [pic, setPic] = useState(null);
  const [title, setTitle] = useState("");
  const [describe, setDescribe] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [destroyed, setDestroyed] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmitFunc = async (event) => {
    event.preventDefault();
    if (loading === false) {
      try {
        const formData = new FormData();
        formData.append("picture", pic);
        formData.append("title", title);
        formData.append("description", describe);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("condition", destroyed);
        formData.append("place", place);
        formData.append("price", price);
        formData.append("exchange", exchange);
        setLoading(true);
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setLoading(false);
        console.log(response.data._id);
        navigate(`/offer/${response.data._id}

      `);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return token ? (
    <main id="main-publish">
      <section class="width-lim-publish">
        <section className="title-publish">
          <h1>Vends ton article (cher)</h1>
        </section>
        <form onSubmit={handleSubmitFunc}>
          <section className="pic-form">
            <section className="lines">
              <label htmlFor="image">
                <div id="photoinput">
                  <div>
                    <FaPlus />
                  </div>
                  <p>Ajoute une photo</p>
                </div>
                <input
                  type="file"
                  id="image"
                  name="image"
                  placeholder=""
                  onChange={(event) => {
                    setPic(event.target.files[0]);
                  }}
                />
              </label>
            </section>
          </section>
          <section className="title-desc-form">
            <div className="one-line-form">
              <label>Titre</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="ex:Chemize Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="one-line-form">
              <label>Décris ton article</label>
              <textarea
                type="textarea"
                id="description"
                name="description"
                placeholder="ex:porté quelquefois, taille correctement"
                onChange={(event) => {
                  setDescribe(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="details-form">
            <div className="one-line-form">
              <label>Marque</label>
              <input
                type="text"
                id="brand"
                name="brand"
                placeholder="ex:Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="one-line-form">
              <label>Taille</label>
              <input
                type="text"
                id="size"
                name="size"
                placeholder="ex:38, M, 8A"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="one-line-form">
              <label>Couleur</label>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="ex:Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="one-line-form">
              <label>Etat</label>
              <input
                type="text"
                id="condition"
                name="condition"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  setDestroyed(event.target.value);
                }}
              />
            </div>
            <div className="one-line-form">
              <label>Lieu</label>
              <input
                type="text"
                id="place"
                name="place"
                placeholder="ex:Paris"
                onChange={(event) => {
                  setPlace(event.target.value);
                }}
              />
            </div>
          </section>
          <section className="price-exchange-form">
            <div className="one-line-form">
              <label>Prix</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="0.00€"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>

            <div className="one-line-form">
              <div></div>
              <div id="right">
                <input
                  type="checkbox"
                  id="exchange"
                  name="exchange"
                  onClick={() => {
                    exchange ? setExchange(false) : setExchange(true);
                  }}
                />
                <p> Je suis intéressé(e) par les échanges</p>
              </div>
            </div>
          </section>
          <section className="button-sec-publish">
            <button>Ajouter</button>
          </section>
        </form>
      </section>
    </main>
  ) : (
    <p>
      Vous n'êtes pas identifié. Cliquez <span>ici</span> pour vous identifier
    </p>
  );
};
export default Publish;
