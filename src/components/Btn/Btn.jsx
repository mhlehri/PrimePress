import { Button } from "@material-tailwind/react";

const Btn = ({ color, text }) => {
  return (
    <Button
      type="submit"
      className={`mx-auto flex items-center gap-3  justify-center p-2 lg:p-3  bg-transparent hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] text-black  hover:text-white  rounded-none  outline outline-2    hover:outline-none hover:scale-105  delay-75 ease-linear`}
    >
      {text}
    </Button>
  );
};

export default Btn;
