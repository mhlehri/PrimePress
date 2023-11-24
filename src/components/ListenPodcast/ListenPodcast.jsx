import { Podcast } from "../../shared/Lottie/Lottie";
import { Button } from "@material-tailwind/react";
const ListenPodcast = () => {
  return (
    <div className="my-20 grid grid-cols-2 items-center">
      <Podcast></Podcast>
      <div className="p-6  text-black space-y-5">
        <h1 className="text-3xl font-black opacity-80">
          Listen to our podcast
        </h1>
        <p>
          Tune In to Engaging Conversations: Explore Our Podcast Series for
          Insightful Discussions, Stories, and Expert Interviews
        </p>
        <Button
          size="sm"
          variant="text"
          color="white"
          className=" border-b-2 hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] mx-auto border-[#58bfff]  text-[#58bfff] rounded-none  hover:text-white delay-100 ease-linear duration-200"
        >
          Listen Now
        </Button>
      </div>
    </div>
  );
};

export default ListenPodcast;
