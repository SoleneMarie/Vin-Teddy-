import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const Payment = ({ priceTopay, offerID, title }) => {
  console.log("prix props payment  " + priceTopay);
  const price = priceTopay;
  console.log("variable price  " + price);

  const ID = offerID;
  const options = {
    mode: "payment",
    amount: Number((price * 100).toFixed(0)),
    currency: "eur",
    description: ID,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm title={title} priceTopay={priceTopay} ID={ID} />
    </Elements>
  );
};

export default Payment;
