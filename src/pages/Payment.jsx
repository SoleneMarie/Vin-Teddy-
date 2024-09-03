import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51PuwocP7EWGvkP3C94fKlYJgPsKBh6deCHlhGWCpxNlYQQCBiye71vX1ocfBhHifKmoELR0kjHYLVgsdPN2pzCQv00QYzgpghj"
);

const Payment = ({ priceTopay, offerID }) => {
  console.log("prix props payment  " + priceTopay);
  const price = priceTopay;
  console.log("variable price  " + price);

  const ID = offerID;
  const options = {
    mode: "payment",

    currency: "eur",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
