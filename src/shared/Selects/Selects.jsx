import { useState } from "react";
import Select from "react-select";

export default function Selects({ options }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "white", // Change the background color
      borderColor: state.isFocused ? "black" : provided.borderColor,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundImage: state.isSelected
        ? "linear-gradient(to top right, #58bfff , #01bea5)"
        : "white", // Change the option background color
      color: state.isSelected ? "white" : "black", // Change the option text color
    }),
  };

  return (
    <Select
      styles={customStyles}
      value={selectedOption}
      required
      onChange={setSelectedOption}
      options={options}
    />
  );
}
