import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className=" h-[100vh] flex flex-col items-center justify-center gap-5 w-screen text-black bg-teal-50 ">
      <h1 className="text-5xl">404</h1>

      <p className="text-3xl">Page Not Found</p>
      <Button
        className="bg-black rounded-none text-white"
        variant="outlined"
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back to Home
      </Button>
    </div>
  );
};

export default Error;
