import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button } from "@material-tailwind/react";

const Carousels = () => {
  return (
    <>
      <p className="bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] py-2 text-sm md:text-base lg:text-xl text-black text-center">
        Trending Articles🔥
      </p>
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
        <div className="h-[70vh] relative">
          <div className="h-full w-full inset-0 bg-black/40 absolute"></div>
          <img
            className="object-cover h-full object-bottom"
            src="https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <div className="space-y-3 absolute p-16 lg:pb-36 lg:pl-20 z-50 text-white bottom-0 text-left from-transparent bg-gradient-to-b to-black left-1/2 -translate-x-1/2 w-full">
            <h1 className="text-3xl font-bold">Title</h1>
            <p className="w-2/3 opacity-80 text-xs md:text-sm lg:text-base">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Explicabo vel blanditiis nihil nobis atque repellendus suscipit
              velit dolor repellat ex.
            </p>
            <Button
              size="sm"
              variant="text"
              color="white"
              className=" border-b-2 hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] mx-auto border-[#58bfff]  text-[#58bfff] rounded-none  hover:text-white delay-100 ease-linear duration-200"
            >
              see more
            </Button>
          </div>
        </div>
        <div className="h-[70vh] relative">
          <div className="h-full w-full inset-0 bg-black/40 absolute"></div>
          <img
            className="object-cover h-full object-bottom"
            src="https://www.aljazeera.com/wp-content/uploads/2023/11/AP23323576681891-1700417500.jpg?fit=1170%2C780&quality=80"
          />
          <div className="space-y-3 absolute p-16 lg:pb-36 lg:pl-20  z-50 text-white bottom-0 text-left   from-transparent  bg-gradient-to-b to-black left-1/2 -translate-x-1/2 w-full">
            <h1 className="text-3xl font-bold">Title</h1>
            <p className="w-2/3 opacity-80 text-xs md:text-sm lg:text-base">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Explicabo vel blanditiis nihil nobis atque repellendus suscipit
              velit dolor repellat ex.
            </p>
            <Button
              size="sm"
              variant="text"
              color="white"
              className=" border-b-2 rounded-none hover:bg-white hover:text-black delay-100 ease-linear duration-300"
            >
              see more
            </Button>
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Carousels;
