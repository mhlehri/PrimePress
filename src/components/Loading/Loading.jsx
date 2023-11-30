import { ProgressBar } from "react-loader-spinner";

const Loading = () => {
  return (
    <ProgressBar
      height="50"
      width="50"
      ariaLabel="progress-bar-loading"
      wrapperStyle={{ margin: "auto" }}
      wrapperClass="progress-bar-wrapper"
      borderColor="black"
      barColor="orange"
    />
  );
};

export default Loading;
