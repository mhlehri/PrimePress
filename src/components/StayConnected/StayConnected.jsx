import CountUp from "react-countup";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
const StayConnected = () => {
  return (
    <section className="p-6 my-20 w-1/2 mx-auto bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] rounded-lg text-black font-black">
      <h1 className="text-center text-3xl">Stay Connected</h1>
      <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <a className="cursor-pointer">
            <FacebookIcon
              sx={{
                fontSize: "40px",
                "&:hover": {
                  color: "white",
                },
              }}
            />
          </a>
          <p className="text-xl font-bold  lg:text-2xl">
            <CountUp end={10000} duration={10} />
          </p>
          <p className="text-sm sm:text-base ">Followers</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <p className="cursor-pointer">
            <TwitterIcon
              sx={{
                fontSize: "40px",
                "&:hover": {
                  color: "white",
                },
              }}
            />
          </p>
          <p className="text-xl font-bold  lg:text-2xl">
            <CountUp end={10000 - 3} duration={10} />
          </p>
          <p className="text-sm sm:text-base ">Followers</p>
        </div>
        <div className="flex flex-col justify-start m-2 lg:m-6 ">
          <p className="cursor-pointer">
            <YouTubeIcon
              sx={{
                fontSize: "40px",
                "&:hover": {
                  color: "white",
                },
              }}
            />
          </p>
          <p className="text-xl font-bold  lg:text-2xl ">
            <CountUp end={299000} duration={10} />
          </p>
          <p className="text-sm sm:text-base ">Subscribes</p>
        </div>
      </div>
    </section>
  );
};

export default StayConnected;
