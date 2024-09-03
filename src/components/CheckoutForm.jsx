import { PaymentElement, useElements } from "@stripe/react-stripe-js";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

export default function CheckoutForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  const stripe = useStripe();
  const elements = useElements();

  return success ? (
    <p>
      Merci pour votre achat! Cliquez <span>ici</span> pour revenir à la
      boutique.
    </p>
  ) : (
    <form>
      <PaymentElement />
      <button>Payer</button>
    </form>
  );
}
