import { useParams } from "react-router-dom";
import SideContent from "../../components/SideContent/SideContent";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";

const Details = () => {
  const { id } = useParams();
  console.log(id);
  const asioxP = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["singleArticle", id],
    queryFn: async () => {
      const res = await asioxP.get(`/singleArticle/${id}`);
      return res.data;
    },
  });
  return (
    <div>
      <div className="grid grid-cols-12">
        <div className="col-span-8">
          <div>
            <img src={data?.image} alt="" />
            <div>
              <h5 className="text-3xl font-semibold">{data?.title}</h5>
              <h3 className="text-lg">{data?.publisher}</h3>
              <p>{data?.publish_date}</p>
              <p className="text-justify">{data?.article}</p>
            </div>
          </div>
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-3 ">
          <SideContent />
        </div>
      </div>
    </div>
  );
};

export default Details;
