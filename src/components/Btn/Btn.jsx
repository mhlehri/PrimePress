import { Button } from "@material-tailwind/react";

const Btn = ({ color, text }) => {
  return (
    <Button
      type="submit"
      className={`mx-auto flex items-center gap-3  justify-center   bg-transparent text-teal-600 hover:text-white hover:bg-teal-800 border-teal-800 border-2 hover:scale-105  delay-50 ease-linear`}
    >
      {text}
    </Button>
  );
};

export default Btn;
