import { useParams } from "react-router-dom";
import SideContent from "../../components/SideContent/SideContent";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";

const Details = () => {
  const { id } = useParams();
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
            <h5 className="text-3xl font-semibold mb-5">{data?.title}</h5>
            <img src={data?.image} alt="" />
            <div>
              <h3 className="text-base mt-4">
                <span className="font-bold">Author: </span>
                {data?.publisher}{" "}
                <span className="opacity-60 text-sm">
                  ({data?.view_count} views)
                </span>
              </h3>
              <p className="text-sm mb-4">
                <span className="font-bold">Publish: </span>
                {data?.publish_date}
              </p>

              <pre
                className="text-justify pr-3 mb-12 wrapper"
                style={{ whiteSpace: "pre-wrap" }}
              >
                {data?.article}
              </pre>
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
