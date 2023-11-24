import Lottie from "lottie-react";

import podcast from "../../assets/gIZf3pH7db.json";

export const Podcast = () => {
  return <Lottie style={{ height: 300 }} animationData={podcast} loop={true} />;
};
