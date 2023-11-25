import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const Card = ({ data }) => {
  const { _id, category, publisher, tags, title, article, publish_date } = data;
  const ar = article.slice(0, 80);
  return (
    <div className=" sm:flex">
      <div className="relative overflow-hidden pt-[40%] md:max-w-xs w-1/2">
        <img
          className="w-full h-full hover:scale-110 delay-100 duration-150   ease-linear bg-fixed absolute top-0 start-0 object-cover"
          src="https://www.unocha.org/sites/default/files/styles/full_width_2_1_123/public/2023-11/opt.jpg.webp"
          alt="Image Description"
        />
      </div>
      <div className="flex flex-wrap hover:shadow-md  w-2/3">
        <div className="p-4 flex flex-col h-full sm:p-7">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <p className="mt-1 text-gray-500 text-sm">{ar}</p>
          <div className="mt-5 sm:mt-auto">
            <p className="text-xs text-gray-600 mt-2">{publisher}</p>
            <p className="text-xs text-gray-500 mb-2 ">{publish_date}</p>
            <Link to={`/article/details/${_id}`}>
              <Button
                size="sm"
                variant="text"
                color="white"
                className=" border-b-2 hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] mx-auto border-[#58bfff]  text-[#58bfff] rounded-none  hover:text-black delay-100 ease-linear duration-200"
              >
                details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export const CardP = () => {
  return (
    <div className=" sm:flex">
      <div className="relative w-full  overflow-hidden pt-[40%] md:max-w-xs">
        <img
          className="w-full h-full hover:scale-110   delay-100 duration-150   ease-linear absolute top-0 start-0 object-cover"
          src="https://www.unocha.org/sites/default/files/styles/full_width_2_1_123/public/2023-11/opt.jpg.webp"
          alt="Image Description"
        />
      </div>
      <div className="flex flex-wrap  hover:shadow-md bg-[url('https://i.ibb.co/rxS93Wt/405426625-765733015364905-7569901237009012825-n.gif')]  bg-no-repeat bg-contain bg-center ">
        <div className="p-4 flex flex-col h-full sm:p-7 bg-black/70">
          <h3 className="text-lg font-bold text-[#FFD700]">Card title</h3>
          <p className="mt-1 text-[#FFD700] ">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="mt-5 sm:mt-auto">
            <p className="text-xs text-[#FFD700] mb-2 ">
              Last updated 5 mins ago
            </p>
            <Link to={`/article/details`}>
              <Button
                size="sm"
                variant="filled"
                className=" border-b-2  mx-auto border-[#FFD700] hover:bg-gradient-to-tl from-[#b48811] to-[#FFD700] hover:text-black  text-[#FFD700] rounded-none   delay-100 ease-linear duration-200"
              >
                details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
