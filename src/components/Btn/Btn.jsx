import { Button } from "@material-tailwind/react";

const Btn = ({ color, text }) => {
  return (
    <Button
      type="submit"
      className={`mx-auto flex items-center gap-3  justify-center   bg-transparent text-black  hover:text-white hover:bg-black rounded-none border-b-2 border-black  border-2 hover:scale-105  delay-50 ease-linear`}
    >
      {text}
    </Button>
  );
};

export default Btn;
