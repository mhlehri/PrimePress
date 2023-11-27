import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import { Card } from "../../components/card/Card";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Selects from "../../shared/Selects/Selects";
import { useQuery } from "@tanstack/react-query";
import Select from "react-select";

const PremiumArticles = () => {
  const axiosP = useAxiosPublic();
  const { isPending, data: premium } = useQuery({
    queryKey: ["premium"],
    queryFn: async () => {
      const res = await axiosP.get(`/premium`);
      return res.data;
    },
  });

  return (
    <div>
      {isPending ? (
        ""
      ) : (
        <div className="grid grid-cols-2 gap-5 my-20">
          {premium?.map((data, inx) => {
            return <Card data={data} key={inx}></Card>;
          })}
        </div>
      )}
    </div>
  );
};

export default PremiumArticles;
