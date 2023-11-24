import Btn from "../../components/Btn/Btn";
import Selects from "../../shared/Selects/Selects";
import { useForm } from "react-hook-form";

const options1 = [
  { value: "Politics", label: "Politics" },
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

const AddArticles = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    // const form = e.target;
    const email = data.email;
    const password = data.password;
    const user = { email, password };
  };

  return (
    <div className="text-black w-2/4  mx-auto h-[80vh] flex items-center justify-center flex-col ">
      <h1 className="text-2xl font-bold my-6 text-center">Add New Articles</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              {...register("publisher")}
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
              {...register("title")}
              placeholder="article title here"
              className="py-2 file:hidden px-4 block outline-blue-400  w-full border border-gray-400 rounded-lg text-sm "
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Tags
            </label>
            <Selects options={options1} />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <Selects options={options2} />
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
