import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const handleSubmitFunc = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("picture", pic);
      formData.append("title", title);
      formData.append("describe", describe);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", destroyed);
      formData.append("place", place);
      formData.append("price", price);
      formData.append("exchange", exchange);

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

      console.log(response.data._id);
      navigate(`/offer/${response.data._id}
      `);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p>C'est la page publish</p>
      <form onSubmit={handleSubmitFunc}>
        <section className="pic-form">
          <input
            type="file"
            id="image"
            name="image"
            placeholder=""
            onChange={(event) => {
              setPic(event.target.files[0]);
            }}
          />
        </section>
        <section className="title-desc-form">
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
          <label>Décris ton article</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="ex:porté quelquefois, taille correctement"
            onChange={(event) => {
              setDescribe(event.target.value);
            }}
          />
        </section>
        <section className="details-form">
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
          <label>Etat</label>{" "}
          <input
            type="text"
            id="condition"
            name="condition"
            placeholder="ex: Neuf avec étiquette"
            onChange={(event) => {
              setDestroyed(event.target.value);
            }}
          />
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
        </section>
        <section className="price-exchange-form">
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
          <input
            type="checkbox"
            id="exchange"
            name="exchange"
            onClick={() => {
              exchange ? setExchange(false) : setExchange(true);
            }}
          />
          <p> Je suis intéressé(e) par les échanges</p>
        </section>
        <button>Ajouter</button>
      </form>
    </>
  );
};
export default Publish;
