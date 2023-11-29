import CountUp from "react-countup";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
const StayConnected = () => {
  return (
    <section className="p-6 my-20 w-4/5 lg:w-3/5 mx-auto bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] rounded-lg text-white font-black">
      <h1 className="text-center text-3xl">Stay Connected</h1>
      <div className="container mx-auto grid justify-center  text-center sm:grid-cols-3">
        <div className="flex flex-col justify-start m-2 lg:m-6">
          <a className="cursor-pointer">
            <FacebookIcon
              sx={{
                fontSize: "40px",
                "&:hover": {
                  color: "#075275",
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
          <p className="cursor-pointer  mb-2 mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              width="30"
              height="30"
              x="0"
              y="0"
              viewBox="0 0 1226.37 1226.37"
            >
              <path
                d="M727.348 519.284 1174.075 0h-105.86L680.322 450.887 370.513 0H13.185l468.492 681.821L13.185 1226.37h105.866l409.625-476.152 327.181 476.152h357.328L727.322 519.284zM582.35 687.828l-47.468-67.894-377.686-540.24H319.8l304.797 435.991 47.468 67.894 396.2 566.721H905.661L582.35 687.854z"
                fill="#fff"
                opacity="1"
                data-original="#000000"
                className="hover:fill-black"
              ></path>
            </svg>
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
                  color: "red",
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
