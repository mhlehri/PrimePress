import { useForm } from "react-hook-form";
import axios from "axios";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";
import Loading from "../../../components/Loading/Loading";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const DAddPublisher = () => {
  useEffect(() => {
    window.document.title = "PP Dashboard | Add Publishers";
  }, []);

  const axiosP = useAxiosPublic();
  const [adding, setAdding] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setAdding(true);
    const publisher = data.publisher;
    const image = data.image[0];
    const res = await axios.post(
      image_hosting_api,
      { image },
      {
        headers: { "content-type": "multipart/form-data" },
      }
    );
    const img = res.data.data.display_url;
    console.log(img);
    if (res.data.success) {
      const Data = {
        publisher,
        image: img,
      };
      axiosP
        .post("/addPublishers", Data)
        .then(() => {
          setAdding(false);
          toast.success("Successfully added!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          e.target.publisher.value = "";
          e.target.image.value = "";
        })
        .catch(() => {
          setAdding(false);
        });
    }
  };

  return (
    <div className="text-black w-2/4  mx-auto h-[80vh] flex items-center justify-center flex-col ">
      <h1
        style={{ textShadow: "2px 2px 1px black" }}
        className="mb-5 font-bold text-4xl text-white"
      >
        Add New publishers
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] p-8 rounded-lg"
      >
        <div className="mb-5">
          <label
            htmlFor="publisher"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Publisher Name
          </label>
          <input
            id="publisher"
            type="text"
            {...register("publisher")}
            placeholder="your name here"
            className="py-2 outline-blue-400 px-4 block w-full border border-gray-400 rounded-lg text-sm "
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="image"
            className="block mb-2  text-sm font-medium text-gray-900"
          >
            Publisher Image
          </label>
          <input
            id="image"
            type="file"
            {...register("image")}
            placeholder="article title here"
            className="py-2 file:hidden px-4 block outline-blue-400  w-full border border-gray-400 rounded-lg text-sm "
            required
          />
        </div>

        {adding ? (
          <Button
            className={`mx-auto flex items-center gap-3  justify-center   bg-transparent   rounded-none  outline outline-2 outline-black   hover:scale-105 py-0  delay-75 ease-linear`}
          >
            <Loading />
          </Button>
        ) : (
          <Button
            type="submit"
            className={`mx-auto flex items-center gap-3  justify-center   bg-transparent hover:bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] text-black  hover:text-white  rounded-none  outline outline-2    hover:outline-none hover:scale-105  delay-75 ease-linear`}
          >
            add
          </Button>
        )}
      </form>
    </div>
  );
};

export default DAddPublisher;
