import { Navigate, useParams } from "react-router-dom";
import SideContent from "../../components/SideContent/SideContent";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import useUser from "../../hooks/useUser";

const Details = () => {
  const { data: userInfo } = useUser();
  const { id } = useParams();
  const axiosP = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["singleArticle", id, userInfo?.Premium],
    queryFn: async () => {
      const res = await axiosP.get(`/singleArticle/${id}`);
      return res.data;
    },
  });
  return (
    <div>
      {data?.category === "basic" ? (
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
                  className="text-justify text-sm pr-3 mb-12 wrapper"
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
      ) : userInfo?.Premium ? (
        <div className="grid grid-cols-12">
          <div className="col-span-8">
            <div>
              <h5 className="text-3xl font-semibold mb-5">{data?.title}</h5>
              <img
                src={data?.image}
                className="p-6 bg-orange-300 rounded-lg"
                alt=""
              />
              <div>
                <h3 className="text-base mt-4 text-orange-800">
                  <span className="font-bold">Author: </span>
                  {data?.publisher}{" "}
                  <span className="opacity-60 text-sm">
                    ({data?.view_count} views)
                  </span>
                </h3>
                <p className="text-sm mb-4 text-orange-800">
                  <span className="font-bold">Publish: </span>
                  {data?.publish_date}
                </p>

                <pre
                  className="text-justify text-sm pr-3 mb-12 wrapper"
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
      ) : (
        <Navigate to="/subscriptions" />
      )}
    </div>
  );
};

export default Details;
