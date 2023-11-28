import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const SideContent = () => {
  const axiosP = useAxiosPublic();
  const { data, refetch } = useQuery({
    queryKey: ["recent"],
    queryFn: async () => {
      const res = await axiosP.get("/recent");
      return res.data;
    },
  });
  return (
    <div>
      <h3 className="text-2xl font-bold mb-5">Recent news</h3>

      {data?.map((d, i) => (
        <Link
          key={i}
          to={`/article/details/${d._id}`}
          onClick={() => {
            axiosP.put(`/viewArticle/${d._id}`);
            refetch();
          }}
          className="flex flex-col items-center  rounded-lg md:max-w-xl "
        >
          <img
            className="object-cover w-full   md:h-auto "
            src={d?.image}
            alt={d?.title}
          />
          <div className="flex flex-col justify-between py-2 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {d?.title}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {d?.article.slice(0, 70)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SideContent;
