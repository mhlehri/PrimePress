import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Carousels = () => {
  return (
    <Carousel
      autoPlay={true}
      autoFocus={true}
      infiniteLoop={true}
      showIndicators={false}
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
            <ArrowBackIosNewIcon className="rounded-full bg-white p-1" />
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
            <ArrowForwardIosIcon className="rounded-full bg-white p-1" />
          </p>
        )
      }
      showStatus={false}
      className="text-center "
    >
      <div className="h-[70vh] relative">
        <img
          className="object-cover h-full object-bottom"
          src="https://images.unsplash.com/photo-1569124589354-615739ae007b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW1lcmljYW4lMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D"
        />
        <p className="absolute z-50 text-white top-2">lehri</p>
      </div>
      <div className="h-[70vh]">
        <img
          className="object-cover h-full object-bottom"
          src="https://images.unsplash.com/photo-1569124589354-615739ae007b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW1lcmljYW4lMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D"
        />
        <p className="">lehri</p>
      </div>
      <div className="h-[70vh]">
        <img
          className="object-cover h-full object-bottom"
          src="https://images.unsplash.com/photo-1569124589354-615739ae007b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW1lcmljYW4lMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D"
        />
        <p className="">lehri</p>
      </div>
    </Carousel>
  );
};

export default Carousels;
