import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import useAllPublishers from "../../hooks/useAllPublishers";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import Loading from "../../components/Loading/Loading";
const options1 = [
  { value: "Politics", label: "Politics" },
  { value: "Business", label: "Business" },
  { value: "Technology", label: "Technology" },
  { value: "Sports", label: "Sports" },
  { value: "Science", label: "Science" },
  { value: "Health", label: "Health" },
  { value: "Entertainment", label: "Entertainment" },
];
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
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddArticles = () => {
  useEffect(() => {
    window.document.title = "PrimePress | Add Articles";
  }, []);
  const { user } = useAuth();
  const axiosP = useAxiosPublic();
  const { data: publishers } = useAllPublishers();
  console.log(publishers);
  const options2 = [];
  publishers?.map((p) => {
    options2.push({ value: p.publisher, label: p.publisher });
  });
  const { register, handleSubmit } = useForm();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);
  const [publishing, setPublishing] = useState(false);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setPublishing(true);
    const image = data.image[0];
    const title = data.title;
    const article = data.article;
    let publisher = e.target.publisher.value;
    let tags = e.target.tag.value;

    const res = await axios.post(
      image_hosting_api,
      { image },
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );

    const img = res.data.data.display_url;

    if (res.data.success) {
      const Info = {
        publisher,
        Aemail: user?.email,
        Aname: user?.displayName,
        Aimage: user?.photoURL,
        image: img,
        tags,
        title,
        article,
      };
      axiosP
        .post("/addArticle", Info)
        .then(() => {
          setPublishing(false);
          e.target.reset();
          toast.success("Successfully Inserted!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        })
        .catch((err) => {
          console.log(err);
          setPublishing(false);
        });
      console.log(Info);
    }
  };

  return (
    <div className="text-black w-2/4  mx-auto h-[80vh] flex items-center justify-center flex-col ">
      <h1
        style={{ textShadow: "2px 2px 1px black" }}
        className="mb-5 font-bold text-4xl text-white"
      >
        Add New Articles
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] p-8 rounded-lg drop-shadow-2xl"
      >
        <div className="grid gap-4 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="title"
              className="block mb-2  text-sm font-medium text-white"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              {...register("title")}
              placeholder="article title here"
              className="py-2 px-4 block outline-blue-400   w-full border border-gray-400 rounded-lg text-sm "
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2  text-sm font-medium text-white"
            >
              Image
            </label>
            <input
              id="image"
              type="file"
              {...register("image")}
              placeholder="article title here"
              className="py-2 file:hidden px-4 block outline-blue-400 bg-white text-gray-500  w-full border border-gray-400 rounded-lg text-sm "
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Tags
            </label>
            <Select
              required
              styles={customStyles}
              value={selectedTags}
              {...register("tags")}
              placeholder="Select tags"
              name="tag"
              onChange={setSelectedTags}
              options={options1}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-white">
              Publishers
            </label>
            <Select
              styles={customStyles}
              value={selectedOption}
              required
              placeholder="Select a publisher"
              {...register("publisher")}
              name="publisher"
              onChange={setSelectedOption}
              options={options2}
            />
          </div>
        </div>

        <label
          htmlFor="article"
          className="block mb-2  text-sm font-medium text-white"
        >
          Article
        </label>
        <textarea
          className="py-3 resize-none outline-blue-400  px-4 block w-full border border-gray-400 mb-6 rounded-lg text-sm "
          rows="3"
          id="article"
          {...register("article")}
          placeholder="write article here"
        ></textarea>
        {publishing ? (
          <Button
            className={`mx-auto flex items-center gap-3  justify-center   bg-transparent   rounded-none  outline outline-2 outline-white   hover:scale-105 py-0  delay-75 ease-linear`}
          >
            <Loading />
          </Button>
        ) : (
          <Button
            type="submit"
            className={`mt-6 w-1/2 mx-auto flex items-center gap-3 justify-center  bg-transparent text-white hover:text-black hover:bg-white border-white rounded-none border-2 hover:scale-105  delay-50 ease-linear`}
          >
            publish
          </Button>
        )}
      </form>
    </div>
  );
};

export default AddArticles;
