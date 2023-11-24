import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Card = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <div className=" sm:flex">
        <div className="relative w-full  overflow-hidden pt-[40%] md:max-w-xs">
          <img
            className="w-full h-full hover:scale-110 delay-100 duration-150   ease-linear bg-fixed absolute top-0 start-0 object-cover"
            src="https://www.unocha.org/sites/default/files/styles/full_width_2_1_123/public/2023-11/opt.jpg.webp"
            alt="Image Description"
          />
        </div>
        <div className="flex flex-wrap hover:shadow-md">
          <div className="p-4 flex flex-col h-full sm:p-7">
            <h3 className="text-lg font-bold text-gray-800">Card title</h3>
            <p className="mt-1 text-gray-500 ">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <div className="mt-5 sm:mt-auto">
              <p className="text-xs text-gray-500 mb-2 ">
                Last updated 5 mins ago
              </p>
              <Link to={`/article/details`}>
                <Button
                  size="sm"
                  variant="text"
                  color="white"
                  className=" border-b-2 hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] mx-auto border-[#58bfff]  text-[#58bfff] rounded-none  hover:text-white delay-100 ease-linear duration-200"
                >
                  details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
