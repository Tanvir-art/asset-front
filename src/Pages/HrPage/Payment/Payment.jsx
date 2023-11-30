import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <div className="w-[700px] mx-auto mt-10">
        <CheckoutForm />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
