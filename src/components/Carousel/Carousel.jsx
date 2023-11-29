import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Carousels = () => {
  const navigate = useNavigate();
  const axiosP = useAxiosPublic();
  const { data: user } = useUser();
  const { data, isPending } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const res = await axiosP.get("/trending");
      return res.data;
    },
  });
  return (
    <div>
      <p className="bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] py-2 text-sm md:text-base lg:text-xl text-white text-center">
        Trending Articles🔥
      </p>
      {isPending ? (
        <div className="h-[70vh] bg-gray-200 animate-pulse">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <Carousel
          autoPlay={true}
          autoFocus={true}
          infiniteLoop={true}
          showIndicators={false}
          showThumbs={false}
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <p
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: "absolute",
                  left: "10px",
                  color: "inherit",
                  cursor: "pointer",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1000,
                }}
              >
                <ArrowBackIosNewIcon className="rounded-full bg-white/50 p-1" />
              </p>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <p
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  position: "absolute",
                  right: "10px",
                  color: "inherit",
                  cursor: "pointer",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1000,
                }}
              >
                <ArrowForwardIosIcon className="rounded-full bg-white/50 p-1" />
              </p>
            )
          }
          showStatus={false}
          className="text-center"
        >
          {data?.map((d) => {
            const des = d?.article.slice(0, 140);
            const pre = d?.category === "premium";
            return (
              <div key={d} className="h-[50vh] lg:h-[70vh] relative">
                <div className="h-full w-full inset-0 bg-black/40 absolute"></div>
                <img
                  className="object-cover h-full object-bottom"
                  src={d?.image}
                />
                <div
                  className={`space-y-3 absolute p-10 lg:pb-36 lg:pl-20 z-50 ${
                    pre ? "text-[#FFD700]" : "text-white"
                  } bottom-0 text-left from-transparent bg-gradient-to-b to-black left-1/2 -translate-x-1/2 w-full`}
                >
                  <h1 className="text-lg lg:text-3xl font-bold">{d.title}</h1>
                  <p className="lg:w-2/3 opacity-80 text-xs md:text-sm lg:text-base">
                    {des}
                  </p>
                  {pre ? (
                    <Button
                      disabled={user?.Premium ? false : true}
                      onClick={() => {
                        navigate(`/article/details/${d._id}`);
                        axiosP.put(`/viewArticle/${d._id}`);
                      }}
                      size="sm"
                      className={`border-b-2 border-[#FFD700] hover:bg-gradient-to-tl from-[#b48811] to-[#FFD700] text-[#FFD700]  mx-auto rounded-none  hover:text-black delay-100 ease-linear duration-200`}
                    >
                      details
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        navigate(`/article/details/${d._id}`);
                        axiosP.put(`/viewArticle/${d._id}`);
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
            );
          })}
        </Carousel>
      )}
    </div>
  );
};

export default Carousels;
