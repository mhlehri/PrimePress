import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "./common.css";
import Select from "react-select";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import UseAxiosSecure from "./../../hooks/UseAxiosSecure";
import useAuth from "../../hooks/useAuth";
import moment from "moment";
const Stripe_PK = import.meta.env.VITE_STRIPE_PK;
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "white", // Change the background color
    borderColor: state.isFocused ? "black" : provided.borderColor,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundImage: state.isSelected
      ? "linear-gradient(to top right, #58bfff , #01bea5)"
      : "white", // Change the option background color
    color: state.isSelected ? "white" : "black", // Change the option text color
  }),
};

const options1 = [
  { value: "1 min", label: "1 Minute" },
  { value: "5 days", label: "5 days" },
  { value: "10 days", label: "10 days" },
];

const CheckoutForm = () => {
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [exp, setExp] = useState(0);
  const [totalAmount, setTotalAmount] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const axiosS = UseAxiosSecure();

  useEffect(() => {
    if (selectedOption?.value == "1 min") {
      setExp(60000);
      setTotalAmount(5);
    } else if (selectedOption?.value == "5 days") {
      setExp(432000000);
      setTotalAmount(30);
    } else if (selectedOption?.value == "10 days") {
      setExp(864000000);
      setTotalAmount(50);
    }
  }, [selectedOption]);

  const price = 100;
  const { user } = useAuth();
  console.log(new Date().getTime() + exp);
  console.log(moment(new Date(1701289558990).getTime()).format());
  useEffect(() => {
    axiosS
      .post("/createPaymentIntent", { price })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.log(err));
  }, [axiosS, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }
    //? confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log("confirm error", confirmError);
    } else {
      console.log("payment Intent", paymentIntent);
      if (paymentIntent.status == "succeeded") {
        const expDate = new Date().getTime() + exp;
        console.log("ok");
        axiosS.put(`/updateUserPremium/${user?.email}`, {
          isPremium: true,
          _Exp: expDate,
        });
        setTransactionId(paymentIntent.id);
      }
    }
  };

  return (
    <div className="flex items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-tr text-white delay-200 shadow-2xl ease-linear duration-75 from-[#58bfff]  to-[#01bea5] w-[600px]  rounded-lg mx-auto p-20 space-y-6 "
      >
        <h1 className="text-xl font-bold text-center">Your Card Information</h1>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <Select
          styles={customStyles}
          value={selectedOption}
          required
          placeholder="Select Period"
          name="publisher"
          onChange={setSelectedOption}
          options={options1}
        />

        <div>
          {totalAmount && (
            <p className="">
              Your have to pay{" "}
              <span
                className="text-white font-bold"
                style={{ textShadow: "2px 2px 1px black" }}
              >
                ${totalAmount}
              </span>{" "}
              for {selectedOption?.value}
            </p>
          )}
        </div>
        <Button
          type="submit"
          className={`mt-6 w-1/2 mx-auto flex items-center gap-3 justify-center  bg-transparent text-white hover:text-black hover:bg-white border-white rounded-none border-2 hover:scale-105  delay-50 ease-linear`}
          disabled={!stripe || !clientSecret}
        >
          Pay{" "}
        </Button>
        <p className={`${error ? "text-red-800" : "hidden"}`}>{error}</p>
        <p className={`${transactionId ? "" : "hidden"}`}>
          {transactionId && `TransactionID: ${transactionId}`}
        </p>
      </form>
    </div>
  );
};

const stripePromise = loadStripe(Stripe_PK);

export default function PaymentForm() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
