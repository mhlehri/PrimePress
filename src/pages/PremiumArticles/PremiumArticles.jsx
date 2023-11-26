import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import { Card } from "../../components/card/Card";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Selects from "../../shared/Selects/Selects";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";
const options = [
  { value: "All", label: "All" },
  { value: "Politics", label: "Politics" },
  { value: "Business", label: "Business" },
  { value: "Technology", label: "Technology" },
  { value: "Sports", label: "Sports" },
  { value: "Science", label: "Science" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
];

const PremiumArticles = () => {
  const axiosP = useAxiosPublic();
  const [selectedOption, setSelectedOption] = useState(undefined);
  console.log(selectedOption);
  const { isPending, data: premium } = useQuery({
    queryKey: ["premium", selectedOption],
    queryFn: async () => {
      const res = await axiosP.get(
        `/premium?filter=${selectedOption ? selectedOption.value : "All"}`
      );
      return res.data;
    },
  });

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
    <div>
      <div className="my-12 grid grid-cols-3">
        <Select
          styles={customStyles}
          value={selectedOption}
          required
          onChange={setSelectedOption}
          options={options}
        />
        <br />
        <Search />
      </div>
      {isPending ? (
        ""
      ) : (
        <div className="grid grid-cols-2 gap-5 my-20">
          {premium?.map((data, inx) => {
            return <Card data={data} key={inx}></Card>;
          })}
        </div>
      )}
    </div>
  );
};

export default PremiumArticles;
