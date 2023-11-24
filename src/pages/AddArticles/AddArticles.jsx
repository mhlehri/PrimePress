import { Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import Select from "react-select";
import Btn from "../../components/Btn/Btn";

const options1 = [
  { value: "Politics", label: "Politics" },
  { value: "Business", label: "Business" },
  { value: "Technology", label: "Technology" },
  { value: "Sports", label: "Sports" },
  { value: "Science", label: "Science" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
];
const options2 = [
  { value: "Premium", label: "Premium" },
  { value: "Basic", label: "Basic" },
];

export function Selects({ optionObject }) {
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
    <div className="">
      <Select
        styles={customStyles}
        defaultValue={selectedOption}
        required
        onChange={setSelectedOption}
        options={optionObject}
      />
    </div>
  );
}
const AddArticles = () => {
  return (
    <div className="text-black w-2/4  mx-auto h-[80vh] flex items-center justify-center flex-col ">
      <h1 className="text-2xl font-bold my-6 text-center">Add New Articles</h1>
      <form className="">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="publisher"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Publisher Name
            </label>
            <input
              id="publisher"
              type="text"
              placeholder="your name here"
              className="py-2 outline-blue-400 px-4 block w-full border border-gray-400 rounded-lg text-sm "
              required
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block mb-2  text-sm font-medium text-gray-900"
            >
              Title
            </label>
            <input
              id="title"
              type="file"
              placeholder="article title here"
              className="py-2 file:hidden px-4 block outline-blue-400  w-full border border-gray-400 rounded-lg text-sm "
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Tags
            </label>
            <Selects optionObject={options1} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <Selects optionObject={options2} />
          </div>
        </div>
        <div>
          <label
            htmlFor="title"
            className="block mb-2  text-sm font-medium text-gray-900"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="article title here"
            className="py-2 px-4 block outline-blue-400 mb-6  w-full border border-gray-400 rounded-lg text-sm "
            required
          />
        </div>

        <label
          htmlFor="article"
          className="block mb-2  text-sm font-medium text-gray-900"
        >
          Article
        </label>
        <textarea
          className="py-3 outline-blue-400  px-4 block w-full border border-gray-400 mb-6 rounded-lg text-sm "
          rows="3"
          id="article"
          placeholder="write article here"
        ></textarea>
        <Btn text="Publish"></Btn>
      </form>
    </div>
  );
};

export default AddArticles;
