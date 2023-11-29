import { Card } from "../../components/card/Card";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "./../../components/Skeleton/Skeleton";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";

const PremiumArticles = () => {
  useEffect(() => {
    window.document.title = "PrimePress | Premium Articles";
  }, []);
  const axiosP = useAxiosPublic();
  const { data: userInfo } = useUser();
  const { isPending, data: premium } = useQuery({
    queryKey: ["premium", userInfo?.Premium],
    queryFn: async () => {
      const res = await axiosP.get(`/premium`);
      return res.data;
    },
  });

  return (
    <div>
      {isPending ? (
        <div className="grid grid-cols-2 gap-5 my-20">
          <Skeleton />
          <Skeleton />
        </div>
      ) : premium.length ? (
        <div className="grid grid-cols-2 gap-5 my-20">
          {premium?.map((data, inx) => {
            return <Card data={data} key={inx}></Card>;
          })}
        </div>
      ) : (
        <div className="h-[50vh] w-full flex flex-col justify-center items-center ]">
          <h1 className="text-9xl font-extrabold text-black tracking-widest">
            404
          </h1>
          <div className="bg-gradient-to-tr from-[#58bfff]  to-[#01bea5] text-white px-2 text-sm rounded rotate-12 absolute">
            Data Not Found
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumArticles;
