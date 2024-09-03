import { PaymentElement, useElements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CheckoutForm({ title, priceTopay, ID }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [dataLoading, setdataLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (elements === null) {
        return;
      }
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }
      /*------------------------requête axios dans ma fonction----------------------- */
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment",
        { title: title, amount: priceTopay }
      );
      const clientSecret = response.data.client_secret;

      /* ----------------------- Vérification du côté de stripe -------------------------   */
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,
        confirmParams: { return_url: "http://localhost:5173/" },
        redirect: "if_required",
      });
      if (error) {
        setErrorMessage(error.message);
      }
      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  /*---------- ma fonction pour trouver l'offre et la modifier )------------ */

  useEffect(() => {
    const findOfferFunc = async () => {
      try {
        const response = await axios.put(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${ID}`
        );
        console.log(
          `https://lereacteur-vinted-api.herokuapp.com/v2/offers/${ID}`
        );
        setdataLoading(false);
        console.log("data de l'annonce achetée : ", response);
        setdata(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    findOfferFunc();
  }, [success]);

  return success ? (
    <p>
      Merci pour votre achat! Cliquez{" "}
      <Link to="/">
        <span>ici</span>{" "}
      </Link>
      pour revenir à la boutique.
    </p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || !elements || loading}>Payer</button>{" "}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
