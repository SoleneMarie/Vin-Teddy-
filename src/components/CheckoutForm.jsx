import { PaymentElement, useElements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

export default function CheckoutForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
        "https://lereacteur-vinted-api.herokuapp.com/v2/payment"
      );
      console.log(response.data.client_secret);
    } catch (error) {
      console.log(error);
    }
  };

  return success ? (
    <p>
      Merci pour votre achat! Cliquez <span>ici</span> pour revenir à la
      boutique.
    </p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || !elements || loading}>Payer</button>{" "}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
