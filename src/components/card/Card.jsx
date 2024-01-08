import { Button } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useUser from "../../hooks/useUser";

export const Card = ({ data }) => {
  const {
    _id,
    publisher,
    category,
    image,
    title,
    article,
    publish_date,
    Aemail,
  } = data;
  const ar = article.slice(0, 80);
  const axiosP = useAxiosPublic();
  const { data: user } = useUser();
  const navigate = useNavigate();
  const pre = category === "premium";
  return (
    <div className="flex flex-col md:flex-row">
      <div className="relative overflow-hidden pt-[40%] w-full md:max-w-xs lg:w-1/2 h-full">
        <img
          className="w-full h-56 md:h-full hover:scale-110 delay-100 duration-150   ease-linear bg-fixed absolute top-0 start-0 object-cover"
          src={image}
          alt="Image Description"
        />
      </div>
      <div
        className={`flex flex-wrap hover:shadow-md md:w-2/3 ${
          pre
            ? "bg-[url('https://i.ibb.co/16Gbn4F/Animation-1701275148102.gif')]  bg-no-repeat bg-contain bg-center"
            : ""
        }`}
      >
        <div
          className={`p-4 flex flex-col h-full sm:p-7   ${
            pre ? "text-[#FFD700] bg-black/80" : "text-gray-700"
          }`}
        >
          <h3
            className={`text-lg font-bold ${
              pre ? "text-[#FFD700]" : "text-gray-800"
            }`}
          >
            {title}
          </h3>
          <p className="mt-1 text-sm">{ar}</p>
          <div className="mt-1 lg:mt-5 sm:mt-auto">
            <p className="text-xs font-bol mt-2">{publisher}</p>
            <p className="text-xs mb-2 ">{publish_date}</p>

            {pre ? (
              <Button
                disabled={
                  user?.Premium || user?.email === Aemail ? false : true
                }
                onClick={() => {
                  navigate(`/article/details/${_id}`);
                  axiosP.put(`/viewArticle/${_id}`);
                }}
                size="sm"
                className={`border-b-2 border-[#FFD700] hover:bg-gradient-to-tl from-[#b48811] to-[#FFD700] text-[#FFD700]  mx-auto rounded-none  hover:text-black delay-100 ease-linear duration-200`}
              >
                details
              </Button>
            ) : (
              <Button
                onClick={() => {
                  navigate(`/article/details/${_id}`);
                  axiosP.put(`/viewArticle/${_id}`);
                }}
                size="sm"
                className={`border-b-2 hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] border-[#58bfff]  text-[#58bfff]
               mx-auto rounded-none  hover:text-black delay-100 ease-linear duration-200`}
              >
                details
              </Button>
            )}
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
      <div className="flex flex-wrap  hover:shadow-md  ">
        <div className="p-4 flex flex-col h-full sm:p-7 bg-black/70">
          <h3 className="text-lg font-bold text-[#FFD700]">Card title</h3>
          <p className="mt-1 text-[#FFD700] ">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="mt-5 sm:mt-auto">
            <p className="text-xs  mb-2 ">Last updated 5 mins ago</p>
            <Link to={`/article/details`}>
              <Button
                size="sm"
                variant="filled"
                className=" border-b-2  mx-auto  hover:text-black   rounded-none   delay-100 ease-linear duration-200"
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
