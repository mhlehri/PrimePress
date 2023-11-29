import Lottie from "lottie-react";
import podcast from "../../assets/gIZf3pH7db.json";
import checkout from "../../assets/checkout.json";

export const Podcast = () => {
  return <Lottie style={{ height: 300 }} animationData={podcast} loop={true} />;
};

export const Checkout = () => {
  return (
    <Lottie style={{ height: 400 }} animationData={checkout} loop={true} />
  );
};
