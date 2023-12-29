import { Typewriter } from "react-simple-typewriter";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
// import { Checkout } from "../../shared/Lottie/Lottie";
import { useEffect } from "react";

const Subscription = () => {
  useEffect(() => {
    window.document.title = "PrimePress | Subscription";
  }, []);
  return (
    <div className="drop-shadow-lg">
      <div className="flex items-center justify-center gap-6 shadow-xl rounded-lg py-3">
        <div className="w-1/2 space-y-4">
          <h1 className="text-2xl font-black opacity-80 text-center">
            <Typewriter
              loop
              typeSpeed={150}
              // cursorBlinking={false}
              cursor
              words={[
                "Unlock a World of Exclusive Insights!",
                "Subscribe for Premium Articles",
                "Elevate Your News Experience!",
                "Discover Deeper Stories",
              ]}
            />
          </h1>
          <p className="w-4/5 opacity-70 mx-auto text-center">
            Subscribe to Premium Articles for Deeper Analysis, In Depth Stories,
            and Unfiltered Perspectives. Elevate Your News Experience Today
          </p>
        </div>
      </div>
      <PaymentForm />
    </div>
  );
};

export default Subscription;
