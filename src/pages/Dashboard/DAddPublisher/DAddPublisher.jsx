import { useForm } from "react-hook-form";
import axios from "axios";
import Btn from "../../../components/Btn/Btn";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { toast } from "react-toastify";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const DAddPublisher = () => {
  const { user } = useAuth();
  const axiosP = useAxiosPublic();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data, e) => {
    e.preventDefault();
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
        .then((res) => {
          console.log(res);
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
        .catch((err) => {
          console.log(err);
        });
      console.log(Data);
    }
  };

  return (
    <div className="text-black w-2/4  mx-auto h-[80vh] flex items-center justify-center flex-col ">
      <h1 className="text-2xl font-bold my-6 text-center">
        Add New Publishers
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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

        <Btn text="Add"></Btn>
      </form>
    </div>
  );
};

export default DAddPublisher;
